import adminService from '../services/adminService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    return sendSuccess(res, stats, 'Operational dashboard statistics');
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status || null;
    const result = await adminService.getAllOrders({ page, limit, status });
    return sendSuccess(res, result.orders, 'Administrative orders list', 200, {
      totalCount: result.totalCount,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const updated = await adminService.updateOrderStatus(req.params.id, req.body, req.user);
    return sendSuccess(res, updated, 'Order fulfillment status updated');
  } catch (err) {
    next(err);
  }
};

export const updateInventory = async (req, res, next) => {
  try {
    const updated = await adminService.updateProductInventory(req.params.id, req.body.inventory, req.user);
    return sendSuccess(res, updated, 'Product inventory updated');
  } catch (err) {
    next(err);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await adminService.getAuditLogs(Number(req.query.limit) || 50);
    return sendSuccess(res, logs, 'Administrative audit trail');
  } catch (err) {
    next(err);
  }
};

export default {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  updateInventory,
  getAuditLogs,
};
