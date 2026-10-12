import { Router } from 'express';
import wishlistController from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', wishlistController.getWishlist);
router.post('/:productId', wishlistController.toggleWishlist);
router.delete('/:productId', wishlistController.removeWishlist);

export default router;
