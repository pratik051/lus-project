import mongoose from 'mongoose';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import env from '../config/env.js';
import { BadRequestError, NotFoundError, ForbiddenError, ConflictError } from '../utils/errors.js';

export class OrderService {
  /**
   * Calculate authoritative server-side quote
   * Never trusts client-submitted pricing, totals, taxes, or discounts!
   */
  async calculateQuote({ items, couponCode = null, shippingAddress = null }) {
    if (!items || items.length === 0) {
      throw new BadRequestError('Order items are required to calculate quote');
    }

    const verifiedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const productId = item.productId || item.id;
      const product = await Product.findOne({
        $or: [{ slug: productId }, { _id: productId?.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
        isPublished: true,
      });

      if (!product) {
        throw new NotFoundError(`Product "${productId}" is no longer available`);
      }

      if (product.inventory < item.quantity) {
        throw new BadRequestError(`Insufficient stock for "${product.name}". Only ${product.inventory} available.`);
      }

      const unitPrice = product.price;
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const totalPrice = Number((unitPrice * quantity).toFixed(2));

      subtotal += totalPrice;

      verifiedItems.push({
        product: product._id,
        productId: product.slug,
        name: product.name,
        sku: product.sku,
        image: product.image,
        variantColor: item.variantColor || 'Standard',
        variantSize: item.variantSize || 'Standard',
        unitPrice,
        quantity,
        totalPrice,
      });
    }

    subtotal = Number(subtotal.toFixed(2));

    // Calculate coupon discount
    let discount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
      if (coupon) {
        const validation = coupon.isValid(subtotal);
        if (validation.valid) {
          appliedCoupon = coupon.code;
          if (coupon.discountType === 'percentage') {
            discount = Number(((subtotal * coupon.value) / 100).toFixed(2));
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
              discount = coupon.maxDiscount;
            }
          } else {
            discount = Math.min(subtotal, coupon.value);
          }
        }
      }
    }

    // Shipping rules: Free above threshold, otherwise flat fee
    const shippingFee = subtotal >= env.FREE_SHIPPING_THRESHOLD ? 0.0 : 15.0;

    // Tax calculation
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Number((taxableAmount * env.DEFAULT_TAX_RATE).toFixed(2));

    // Final total
    const total = Number((taxableAmount + shippingFee + tax).toFixed(2));

    return {
      items: verifiedItems,
      subtotal,
      discount,
      couponCode: appliedCoupon,
      shippingFee,
      tax,
      total,
      currency: env.STORE_CURRENCY,
      freeShippingThreshold: env.FREE_SHIPPING_THRESHOLD,
    };
  }

  /**
   * Create order with inventory decrement, idempotency, and re-verified quote
   */
  async createOrder(userId, { items, shippingAddress, paymentMethod = 'Credit Card', couponCode = null, idempotencyKey = null, notes = '' }) {
    // 1. Idempotency Check to prevent duplicate submissions
    if (idempotencyKey) {
      const existingOrder = await Order.findOne({ idempotencyKey });
      if (existingOrder) {
        return existingOrder;
      }
    }

    // 2. Authoritative Server Quote recalculation
    const quote = await this.calculateQuote({ items, couponCode, shippingAddress });

    // 3. Atomically decrement inventory for each product
    for (const item of quote.items) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: item.product, inventory: { $gte: item.quantity } },
        { $inc: { inventory: -item.quantity } },
        { new: true }
      );

      if (!updatedProduct) {
        // Rollback already decremented items if one fails
        for (const rollbackItem of quote.items) {
          if (rollbackItem === item) break;
          await Product.findByIdAndUpdate(rollbackItem.product, { $inc: { inventory: rollbackItem.quantity } });
        }
        throw new ConflictError(`Inventory became unavailable for "${item.name}". Please review your cart.`);
      }

      // Update inStock flag if inventory hit 0
      if (updatedProduct.inventory <= 0) {
        updatedProduct.inStock = false;
        await updatedProduct.save();
      }
    }

    // 4. Generate unique readable order number e.g. LX-94821
    let orderNumber;
    let isUnique = false;
    while (!isUnique) {
      orderNumber = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
      const existing = await Order.findOne({ orderNumber });
      if (!existing) isUnique = true;
    }

    const trackingNumber = `TRK-${Math.floor(100000000 + Math.random() * 900000000)}US`;

    // 5. Build timeline
    const timeline = [
      { title: 'Order Authorized & Confirmed', time: 'Just now', completed: true },
      { title: 'Quality Assurance & Packaging', time: 'Pending', completed: false },
      { title: 'Courier Dispatch', time: 'Pending', completed: false },
      { title: 'Delivered', time: 'Pending', completed: false },
    ];

    // 6. Create Order record
    const order = await Order.create({
      orderNumber,
      user: userId,
      items: quote.items,
      subtotal: quote.subtotal,
      discount: quote.discount,
      couponCode: quote.couponCode,
      shippingFee: quote.shippingFee,
      tax: quote.tax,
      total: quote.total,
      currency: quote.currency,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'authorized', // Authorized for capture by payment processor
      orderStatus: 'confirmed',
      trackingNumber,
      carrier: 'FedEx Express Worldwide',
      estimatedDelivery: '3 to 5 business days',
      timeline,
      idempotencyKey: idempotencyKey || undefined,
      lookupToken: !userId ? crypto.randomBytes(24).toString('hex') : undefined,
      notes,
    });

    // 7. Increment coupon usage if used
    if (quote.couponCode) {
      await Coupon.findOneAndUpdate({ code: quote.couponCode }, { $inc: { usageCount: 1 } });
    }

    return order;
  }

  async getUserOrders(userId) {
    return Order.find({ user: userId }).sort({ createdAt: -1 });
  }

  async getOrderById(orderIdentifier, userId = null, userRole = null, guestToken = null) {
    let order = await Order.findOne({
      $or: [
        { orderNumber: orderIdentifier.toUpperCase() },
        { _id: orderIdentifier.match(/^[0-9a-fA-F]{24}$/) ? orderIdentifier : null },
      ],
    }).populate('user', 'firstName lastName email phone');

    if (!order) {
      throw new NotFoundError(`Order "${orderIdentifier}" was not found`);
    }

    // 1. Staff and Admin have legitimate authority to view any order
    if (userRole === 'admin' || userRole === 'staff') {
      return order;
    }

    // 2. If order belongs to a registered customer:
    if (order.user) {
      // Must be authenticated and must match customer ID
      if (!userId || order.user._id.toString() !== userId.toString()) {
        throw new ForbiddenError('You do not have permission to view this order');
      }
      return order;
    }

    // 3. If guest order: must provide matching lookup token
    if (order.lookupToken) {
      if (guestToken && guestToken === order.lookupToken) {
        return order;
      }
      throw new ForbiddenError('Valid order access token is required to view guest order details');
    }

    return order;
  }

  async cancelOrder(orderNumber, userId, userRole = 'customer') {
    const order = await this.getOrderById(orderNumber, userId, userRole);

    // Check cancellation eligibility
    if (!['placed', 'confirmed'].includes(order.orderStatus)) {
      throw new BadRequestError(`Cannot cancel order with status "${order.orderStatus}". Shipment is already in progress.`);
    }

    // Restore product inventory
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { inventory: item.quantity },
        $set: { inStock: true },
      });
    }

    order.orderStatus = 'cancelled';
    order.paymentStatus = 'refunded';
    order.timeline.push({
      title: 'Order Cancelled & Restocked',
      time: 'Just now',
      completed: true,
    });

    await order.save();
    return order;
  }
}

export const orderService = new OrderService();
export default orderService;
