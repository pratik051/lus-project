import { Router } from 'express';
import productController from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { searchLimiter } from '../middleware/rateLimiter.js';
import { listProductsQuerySchema, createProductSchema } from '../validators/productValidator.js';

const router = Router();

// Public routes
router.get('/', validate(listProductsQuerySchema, 'query'), productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/trending', productController.getTrendingProducts);
router.get('/autocomplete', searchLimiter, productController.getAutocompleteSuggestions);
router.get('/:slug', productController.getProductBySlug);

// Protected admin routes
router.post('/', authenticate, authorize('admin'), validate(createProductSchema), productController.createProduct);
router.put('/:id', authenticate, authorize('admin'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('admin'), productController.deleteProduct);

export default router;
