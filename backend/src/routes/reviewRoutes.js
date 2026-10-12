import { Router } from 'express';
import reviewController from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { reviewLimiter } from '../middleware/rateLimiter.js';
import { createReviewSchema } from '../validators/reviewValidator.js';

const router = Router();

router.get('/products/:productId/reviews', reviewController.getProductReviews);
router.post('/products/:productId/reviews', reviewLimiter, authenticate, validate(createReviewSchema), reviewController.addReview);

export default router;
