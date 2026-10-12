import { z } from 'zod';

function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(100).optional().default('').transform(stripHtml),
  comment: z.string().trim().min(5, 'Review comment must be at least 5 characters').max(1000).transform(stripHtml),
});
