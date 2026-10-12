import cartService from '../services/cartService.js';
import { sendSuccess } from '../utils/apiResponse.js';

function getIds(req) {
  const userId = req.user ? req.user._id : null;
  const sessionId = req.headers['x-session-id'] || req.cookies.luxstore_session_id || 'default_session';
  return { userId, sessionId };
}

export const getCart = async (req, res, next) => {
  try {
    const { userId, sessionId } = getIds(req);
    const cart = await cartService.getOrCreateCart(userId, sessionId);
    const formatted = await cartService.getFormattedCart(cart);
    return sendSuccess(res, formatted, 'Cart details');
  } catch (err) {
    next(err);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { userId, sessionId } = getIds(req);
    const result = await cartService.addItem(userId, sessionId, req.body);
    return sendSuccess(res, result, 'Item added to cart');
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { userId, sessionId } = getIds(req);
    const result = await cartService.updateItemQuantity(userId, sessionId, req.params.itemId, req.body.quantity);
    return sendSuccess(res, result, 'Cart item quantity updated');
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const { userId, sessionId } = getIds(req);
    const result = await cartService.removeItem(userId, sessionId, req.params.itemId);
    return sendSuccess(res, result, 'Item removed from cart');
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const { userId, sessionId } = getIds(req);
    const result = await cartService.clearCart(userId, sessionId);
    return sendSuccess(res, result, 'Cart cleared');
  } catch (err) {
    next(err);
  }
};

export const applyPromoCode = async (req, res, next) => {
  try {
    const { userId, sessionId } = getIds(req);
    const result = await cartService.applyCoupon(userId, sessionId, req.body.code);
    return sendSuccess(res, result, result.message);
  } catch (err) {
    next(err);
  }
};

export const syncCart = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const items = req.body.items || [];
    const result = await cartService.syncCart(userId, items);
    return sendSuccess(res, result, 'Cart synchronized');
  } catch (err) {
    next(err);
  }
};

export default {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  applyPromoCode,
  syncCart,
};
