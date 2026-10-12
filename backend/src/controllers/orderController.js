import orderService from '../services/orderService.js';
import { sendSuccess, sendCreated } from '../utils/apiResponse.js';

export const quoteCheckout = async (req, res, next) => {
  try {
    const quote = await orderService.calculateQuote(req.body);
    return sendSuccess(res, quote, 'Authoritative checkout quote');
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const idempotencyKey = req.headers['idempotency-key'] || req.body.idempotencyKey;
    const order = await orderService.createOrder(userId, {
      ...req.body,
      idempotencyKey,
    });
    return sendCreated(res, order, 'Order confirmed successfully');
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user._id);
    return sendSuccess(res, orders, 'User orders');
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const userRole = req.user ? req.user.role : null;
    const guestToken = req.query.token || req.headers['x-order-token'] || req.query.orderToken || null;
    const order = await orderService.getOrderById(req.params.id, userId, userRole, guestToken);
    return sendSuccess(res, order, 'Order details');
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await orderService.cancelOrder(req.params.id, req.user._id, req.user.role);
    return sendSuccess(res, order, 'Order cancelled and stock restored');
  } catch (err) {
    next(err);
  }
};

export default {
  quoteCheckout,
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
};
