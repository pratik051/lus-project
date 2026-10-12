import { z } from 'zod';

export const listProductsQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(['featured', 'price-asc', 'price-desc', 'rating', 'newest']).default('featured'),
  minPrice: z.coerce.number().min(0).default(0),
  maxPrice: z.coerce.number().min(0).default(10000),
  rating: z.coerce.number().min(0).max(5).default(0),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(150),
  sku: z.string().trim().toUpperCase().min(3),
  category: z.string().trim().min(2),
  subCategory: z.string().trim().optional(),
  description: z.string().trim().min(10),
  price: z.number().min(0),
  originalPrice: z.number().min(0).nullable().optional(),
  discount: z.string().nullable().optional(),
  inventory: z.number().int().min(0).default(10),
  badge: z.string().nullable().optional(),
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  image: z.string().url(),
  images: z.array(z.string().url()).default([]),
  colors: z.array(z.object({
    name: z.string(),
    hex: z.string(),
    ringColor: z.string().optional(),
  })).default([]),
  sizes: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  materials: z.string().optional(),
  care: z.string().optional(),
  shipping: z.string().optional(),
});
