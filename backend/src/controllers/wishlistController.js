import wishlistService from '../services/wishlistService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getWishlist = async (req, res, next) => {
  try {
    const result = await wishlistService.getWishlist(req.user._id);
    return sendSuccess(res, result.products, 'User wishlist', 200, { count: result.count });
  } catch (err) {
    next(err);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const result = await wishlistService.toggleProduct(req.user._id, req.params.productId);
    const msg = result.added ? 'Added to wishlist' : 'Removed from wishlist';
    return sendSuccess(res, result, msg);
  } catch (err) {
    next(err);
  }
};

export const removeWishlist = async (req, res, next) => {
  try {
    const result = await wishlistService.removeProduct(req.user._id, req.params.productId);
    return sendSuccess(res, result, 'Removed from wishlist');
  } catch (err) {
    next(err);
  }
};

export default {
  getWishlist,
  toggleWishlist,
  removeWishlist,
};
