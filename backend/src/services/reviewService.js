import Review from '../models/Review.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { NotFoundError, ConflictError, BadRequestError } from '../utils/errors.js';

export class ReviewService {
  async getProductReviews(productId, { page = 1, limit = 20 } = {}) {
    const product = await Product.findOne({
      $or: [{ slug: productId }, { _id: productId.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const skip = (Math.max(1, page) - 1) * limit;

    const [reviews, totalCount] = await Promise.all([
      Review.find({ product: product._id, moderationStatus: 'approved' })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Review.countDocuments({ product: product._id, moderationStatus: 'approved' }),
    ]);

    return {
      reviews,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit) || 1,
    };
  }

  async addReview(userId, productId, { rating, title = '', comment }) {
    const product = await Product.findOne({
      $or: [{ slug: productId }, { _id: productId.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check if user already submitted a review for this product
    const existing = await Review.findOne({ product: product._id, user: userId });
    if (existing) {
      throw new ConflictError('You have already submitted a review for this product');
    }

    const review = await Review.create({
      product: product._id,
      user: userId,
      authorName: user.fullName || `${user.firstName} ${user.lastName[0]}.`,
      rating,
      title,
      comment,
      verifiedPurchase: true,
      moderationStatus: 'approved',
    });

    return review;
  }
}

export const reviewService = new ReviewService();
export default reviewService;
