import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import cartRoutes from './cartRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';
import addressRoutes from './addressRoutes.js';
import orderRoutes from './orderRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import adminRoutes from './adminRoutes.js';

import { optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { checkoutQuoteSchema } from '../validators/orderValidator.js';
import orderController from '../controllers/orderController.js';
import productController from '../controllers/productController.js';

import mongoose from 'mongoose';
import { checkoutLimiter, searchLimiter } from '../middleware/rateLimiter.js';

const apiRouter = Router();

// Health Check Endpoints (Comprehensive, Liveness & Readiness)
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
  });
});

apiRouter.get('/health/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

apiRouter.get('/health/ready', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  if (isDbConnected) {
    return res.status(200).json({
      status: 'ready',
      database: 'connected',
      uptime: process.uptime(),
    });
  }
  return res.status(503).json({
    status: 'unhealthy',
    database: 'disconnected',
  });
});

// Checkout Quote Endpoint (POST /api/v1/checkout/quote)
apiRouter.post('/checkout/quote', checkoutLimiter, optionalAuth, validate(checkoutQuoteSchema), orderController.quoteCheckout);

// Search autocomplete alias for frontend compatibility
apiRouter.get('/search/autocomplete', searchLimiter, productController.getAutocompleteSuggestions);

// Mount Resource Routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/cart', cartRoutes);
apiRouter.use('/wishlist', wishlistRoutes);
apiRouter.use('/addresses', addressRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/reviews', reviewRoutes);
apiRouter.use('/admin', adminRoutes);

export default apiRouter;
