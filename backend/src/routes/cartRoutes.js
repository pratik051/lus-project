import { Router } from 'express';
import cartController from '../controllers/cartController.js';
import { optionalAuth, authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { addCartItemSchema, updateCartItemSchema, promoCodeSchema } from '../validators/cartValidator.js';

const router = Router();

router.get('/', optionalAuth, cartController.getCart);
router.post('/items', optionalAuth, validate(addCartItemSchema), cartController.addItem);
router.patch('/items/:itemId', optionalAuth, validate(updateCartItemSchema), cartController.updateItem);
router.delete('/items/:itemId', optionalAuth, cartController.removeItem);
router.delete('/', optionalAuth, cartController.clearCart);
router.post('/promo-code', optionalAuth, validate(promoCodeSchema), cartController.applyPromoCode);
router.post('/sync', optionalAuth, cartController.syncCart);

export default router;
