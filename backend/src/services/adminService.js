import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

export class AdminService {
  async getDashboardStats() {
    const [totalOrders, totalProducts, totalCustomers, revenueAgg, lowInventory] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments({ isPublished: true }),
      User.countDocuments({ role: 'customer' }),
      Order.aggregate([
        { $match: { orderStatus: { $ne: 'cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$total' } } },
      ]),
      Product.find({ inventory: { $lt: 5 } }).select('name sku inventory price').limit(5).lean(),
    ]);

    const totalRevenue = revenueAgg.length > 0 ? Number(revenueAgg[0].totalRevenue.toFixed(2)) : 0;

    return {
      totalOrders,
      totalProducts,
      totalCustomers,
      totalRevenue,
      lowInventoryAlerts: lowInventory,
    };
  }

  async getAllOrders({ page = 1, limit = 20, status = null }) {
    const query = {};
    if (status) query.orderStatus = status;

    const skip = (Math.max(1, page) - 1) * limit;
    const [orders, totalCount] = await Promise.all([
      Order.find(query)
        .populate('user', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean({ virtuals: true }),
      Order.countDocuments(query),
    ]);

    return {
      orders: orders.map(o => ({ ...o, id: o.orderNumber })),
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit) || 1,
    };
  }

  async updateOrderStatus(orderNumber, { orderStatus, trackingNumber = null, carrier = null }, adminUser) {
    const order = await Order.findOne({ orderNumber });
    if (!order) {
      throw new NotFoundError(`Order "${orderNumber}" not found`);
    }

    const previousStatus = order.orderStatus;
    order.orderStatus = orderStatus;

    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (carrier) order.carrier = carrier;

    // Append to timeline
    order.timeline.push({
      title: `Status changed to ${orderStatus.toUpperCase()}`,
      time: new Date().toLocaleTimeString(),
      completed: true,
    });

    await order.save();

    // Log admin action to AuditLog
    await AuditLog.create({
      user: adminUser._id,
      userEmail: adminUser.email,
      userRole: adminUser.role,
      action: 'UPDATE_ORDER_STATUS',
      entity: 'Order',
      entityId: order.orderNumber,
      details: { previousStatus, newStatus: orderStatus, trackingNumber },
    });

    return order;
  }

  async updateProductInventory(productId, newInventory, adminUser) {
    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError('Product not found');

    const prev = product.inventory;
    product.inventory = newInventory;
    product.inStock = newInventory > 0;
    await product.save();

    await AuditLog.create({
      user: adminUser._id,
      userEmail: adminUser.email,
      userRole: adminUser.role,
      action: 'UPDATE_INVENTORY',
      entity: 'Product',
      entityId: product.sku,
      details: { previousInventory: prev, newInventory },
    });

    return product;
  }

  async getAuditLogs(limit = 50) {
    return AuditLog.find().sort({ createdAt: -1 }).limit(limit).lean();
  }
}

export const adminService = new AdminService();
export default adminService;
