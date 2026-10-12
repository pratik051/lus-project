import { z } from 'zod';

export const addCartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID or slug is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').default(1),
  variantColor: z.string().default('Standard'),
  variantSize: z.string().default('Standard'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
});

export const promoCodeSchema = z.object({
  code: z.string().trim().min(1, 'Promo code is required').toUpperCase(),
});
