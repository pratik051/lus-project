import reviewService from '../services/reviewService.js';
import { sendSuccess, sendCreated } from '../utils/apiResponse.js';

export const getProductReviews = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await reviewService.getProductReviews(req.params.productId, { page, limit });
    return sendSuccess(res, result.reviews, 'Product reviews', 200, {
      totalCount: result.totalCount,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    });
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const review = await reviewService.addReview(req.user._id, req.params.productId, req.body);
    return sendCreated(res, review, 'Review submitted successfully');
  } catch (err) {
    next(err);
  }
};

export default {
  getProductReviews,
  addReview,
};
