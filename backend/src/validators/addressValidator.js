import { z } from 'zod';

export const createAddressSchema = z.object({
  title: z.string().trim().default('Shipping Address'),
  fullName: z.string().trim().min(2, 'Recipient full name is required'),
  phone: z.string().trim().default(''),
  street: z.string().trim().min(3, 'Street address is required'),
  city: z.string().trim().min(2, 'City is required'),
  state: z.string().trim().default(''),
  postalCode: z.string().trim().min(2, 'Postal code is required'),
  country: z.string().trim().min(2).default('United States'),
  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();
