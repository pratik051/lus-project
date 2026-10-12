import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(5000),
    API_PREFIX: z.string().default('/api/v1'),
    MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/luxstore_db'),
    JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters long'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    COOKIE_SECRET: z.string().min(16).default('luxstore_cookie_secret_dev_32_characters_long'),
    CORS_ORIGIN: z.string().default('http://localhost:5173,http://127.0.0.1:5173'),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000), // 15 mins
    RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
    AUTH_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(15),
    STORE_CURRENCY: z.string().default('USD'),
    FREE_SHIPPING_THRESHOLD: z.coerce.number().default(150),
    DEFAULT_TAX_RATE: z.coerce.number().default(0.08),
  })
  .superRefine((data, ctx) => {
    if (data.NODE_ENV === 'production') {
      const devJwt = 'luxstore_dev_super_secret_key_change_in_production_min_32_chars';
      const devCookie = 'luxstore_cookie_secret_dev_32_characters_long';

      if (data.JWT_SECRET.length < 32 || data.JWT_SECRET === devJwt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'In production, JWT_SECRET must be a high-entropy secret of at least 32 characters and cannot use default dev placeholders.',
          path: ['JWT_SECRET'],
        });
      }

      if (data.COOKIE_SECRET.length < 32 || data.COOKIE_SECRET === devCookie) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'In production, COOKIE_SECRET must be a dedicated high-entropy secret of at least 32 characters.',
          path: ['COOKIE_SECRET'],
        });
      }

      const origins = data.CORS_ORIGIN.split(',').map((s) => s.trim());
      if (origins.includes('*')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wildcard CORS_ORIGIN ("*") is prohibited in production when credentials (cookies/tokens) are supported.',
          path: ['CORS_ORIGIN'],
        });
      }
    }
  });

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid backend environment variables:');
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  process.exit(1);
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGIN.split(',').map(s => s.trim()),
};

export default env;
