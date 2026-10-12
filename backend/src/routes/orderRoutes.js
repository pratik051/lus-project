import { Router } from 'express';
import orderController from '../controllers/orderController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { checkoutLimiter, orderCreationLimiter, orderLookupLimiter } from '../middleware/rateLimiter.js';
import { checkoutQuoteSchema, createOrderSchema } from '../validators/orderValidator.js';

const router = Router();

// Quote calculation endpoint (public or authenticated)
router.post('/checkout/quote', checkoutLimiter, optionalAuth, validate(checkoutQuoteSchema), orderController.quoteCheckout);

// Order creation & customer history
router.post('/', orderCreationLimiter, optionalAuth, validate(createOrderSchema), orderController.createOrder);
router.get('/', authenticate, orderController.getUserOrders);
router.get('/:id', orderLookupLimiter, optionalAuth, orderController.getOrderById);
router.post('/:id/cancel', authenticate, orderController.cancelOrder);

export default router;
