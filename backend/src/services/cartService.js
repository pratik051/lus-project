import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

export class CartService {
  async getOrCreateCart(userId, sessionId) {
    let query = {};
    if (userId) {
      query.user = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      throw new BadRequestError('User ID or Session ID required to retrieve cart');
    }

    let cart = await Cart.findOne(query).populate('items.product');
    if (!cart) {
      cart = await Cart.create({
        user: userId || undefined,
        sessionId: sessionId || undefined,
        items: [],
      });
    }

    return cart;
  }

  async addItem(userId, sessionId, { productId, quantity = 1, variantColor = 'Standard', variantSize = 'Standard' }) {
    // Resolve product by slug or ID
    const product = await Product.findOne({
      $or: [{ slug: productId }, { _id: productId.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
      isPublished: true,
    });

    if (!product) {
      throw new NotFoundError(`Product "${productId}" not found`);
    }

    if (product.inventory < quantity) {
      throw new BadRequestError(`Only ${product.inventory} units available in stock`);
    }

    const cart = await this.getOrCreateCart(userId, sessionId);

    // Check if variant already exists in cart
    const existingIndex = cart.items.findIndex(
      item => item.product.toString() === product._id.toString() &&
              item.variantColor === variantColor &&
              item.variantSize === variantSize
    );

    if (existingIndex > -1) {
      const newQty = cart.items[existingIndex].quantity + quantity;
      if (newQty > product.inventory) {
        throw new BadRequestError(`Cannot add more. Maximum available inventory is ${product.inventory}`);
      }
      cart.items[existingIndex].quantity = newQty;
      cart.items[existingIndex].priceSnapshot = product.price;
    } else {
      cart.items.push({
        product: product._id,
        variantColor,
        variantSize,
        quantity,
        priceSnapshot: product.price,
      });
    }

    await cart.save();
    return this.getFormattedCart(cart);
  }

  async updateItemQuantity(userId, sessionId, itemId, quantity) {
    const cart = await this.getOrCreateCart(userId, sessionId);
    const item = cart.items.id(itemId);
    if (!item) {
      throw new NotFoundError('Item not found in cart');
    }

    if (quantity <= 0) {
      cart.items.pull(itemId);
    } else {
      const product = await Product.findById(item.product);
      if (product && quantity > product.inventory) {
        throw new BadRequestError(`Cannot set quantity to ${quantity}. Only ${product.inventory} available in stock`);
      }
      item.quantity = quantity;
    }

    await cart.save();
    return this.getFormattedCart(cart);
  }

  async removeItem(userId, sessionId, itemId) {
    const cart = await this.getOrCreateCart(userId, sessionId);
    cart.items.pull(itemId);
    await cart.save();
    return this.getFormattedCart(cart);
  }

  async clearCart(userId, sessionId) {
    const cart = await this.getOrCreateCart(userId, sessionId);
    cart.items = [];
    cart.couponCode = null;
    await cart.save();
    return this.getFormattedCart(cart);
  }

  async applyCoupon(userId, sessionId, code) {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) {
      throw new BadRequestError(`Coupon code "${code}" is invalid or does not exist`);
    }

    const cart = await this.getOrCreateCart(userId, sessionId);
    
    // Calculate subtotal
    const subtotal = cart.items.reduce((acc, it) => acc + (it.priceSnapshot * it.quantity), 0);
    const validation = coupon.isValid(subtotal);
    if (!validation.valid) {
      throw new BadRequestError(validation.reason);
    }

    cart.couponCode = coupon.code;
    await cart.save();

    return {
      valid: true,
      code: coupon.code,
      discountPercentage: coupon.discountType === 'percentage' ? coupon.value : null,
      fixedDiscount: coupon.discountType === 'fixed' ? coupon.value : null,
      message: `${coupon.value}% promotional discount applied successfully`,
    };
  }

  async syncCart(userId, clientItems = []) {
    if (!clientItems || clientItems.length === 0) {
      return this.getOrCreateCart(userId, null);
    }

    const cart = await this.getOrCreateCart(userId, null);

    for (const item of clientItems) {
      const productId = item.productId || item.id;
      const product = await Product.findOne({
        $or: [{ slug: productId }, { _id: productId?.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
        isPublished: true,
      });

      if (product) {
        const qty = Math.min(item.quantity || 1, product.inventory);
        if (qty > 0) {
          const existing = cart.items.find(
            it => it.product.toString() === product._id.toString() &&
                  it.variantColor === (item.variantColor || 'Standard') &&
                  it.variantSize === (item.variantSize || 'Standard')
          );

          if (existing) {
            existing.quantity = Math.min(existing.quantity + qty, product.inventory);
          } else {
            cart.items.push({
              product: product._id,
              variantColor: item.variantColor || 'Standard',
              variantSize: item.variantSize || 'Standard',
              quantity: qty,
              priceSnapshot: product.price,
            });
          }
        }
      }
    }

    await cart.save();
    return this.getFormattedCart(cart);
  }

  async getFormattedCart(cart) {
    await cart.populate('items.product');
    const items = cart.items
      .filter(item => item.product) // filter out deleted products
      .map(item => ({
        itemId: item._id.toString(),
        productId: item.product.slug,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        variantColor: item.variantColor,
        variantSize: item.variantSize,
        image: item.product.image,
      }));

    const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

    return {
      items,
      count: items.reduce((acc, it) => acc + it.quantity, 0),
      subtotal,
      couponCode: cart.couponCode,
    };
  }
}

export const cartService = new CartService();
export default cartService;
