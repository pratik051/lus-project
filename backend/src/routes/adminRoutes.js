import { Router } from 'express';
import adminController from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateOrderStatusSchema, updateInventorySchema } from '../validators/adminValidator.js';

const router = Router();

router.use(authenticate);

// Staff and Admin accessible
router.get('/stats', authorize('staff', 'admin'), adminController.getDashboardStats);
router.get('/orders', authorize('staff', 'admin'), adminController.getAllOrders);
router.patch('/orders/:id/status', authorize('staff', 'admin'), validate(updateOrderStatusSchema), adminController.updateOrderStatus);

// Admin-only operations
router.patch('/products/:id/inventory', authorize('admin'), validate(updateInventorySchema), adminController.updateInventory);
router.get('/audit-logs', authorize('admin'), adminController.getAuditLogs);

export default router;
