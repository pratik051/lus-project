import { z } from 'zod';

export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum(['placed', 'confirmed', 'processing', 'in_transit', 'delivered', 'cancelled'], {
    errorMap: () => ({ message: 'Invalid order status. Allowed: placed, confirmed, processing, in_transit, delivered, cancelled' }),
  }),
  trackingNumber: z.string().trim().max(100).optional(),
  carrier: z.string().trim().max(100).optional(),
});

export const updateInventorySchema = z.object({
  inventory: z.number().int({ message: 'Inventory must be an integer' }).min(0, 'Inventory cannot be negative').max(1000000, 'Inventory exceeds maximum allowable quantity'),
});

export default { updateOrderStatusSchema, updateInventorySchema };
