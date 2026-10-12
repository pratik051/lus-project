import { z } from 'zod';

const orderItemInputSchema = z.object({
  productId: z.string().min(1, 'Product ID or slug is required'),
  quantity: z.number().int().min(1),
  variantColor: z.string().optional().default('Standard'),
  variantSize: z.string().optional().default('Standard'),
});

const shippingAddressInputSchema = z.object({
  fullName: z.string().trim().optional(),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  street: z.string().trim().min(1, 'Street address is required'),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().optional().default(''),
  postalCode: z.string().trim().min(1, 'Postal code is required'),
  country: z.string().trim().optional().default('United States'),
  phone: z.string().trim().optional().default(''),
  email: z.string().trim().optional().default(''),
}).transform((val) => ({
  ...val,
  fullName: val.fullName || `${val.firstName || ''} ${val.lastName || ''}`.trim() || 'Valued Customer',
}));

export const checkoutQuoteSchema = z.object({
  items: z.array(orderItemInputSchema).min(1, 'At least one item is required'),
  shippingAddress: shippingAddressInputSchema.optional(),
  couponCode: z.string().trim().toUpperCase().optional(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemInputSchema).min(1, 'At least one item is required'),
  shippingAddress: shippingAddressInputSchema,
  paymentMethod: z.string().trim().min(2).default('Credit Card'),
  couponCode: z.string().trim().toUpperCase().optional(),
  idempotencyKey: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});
