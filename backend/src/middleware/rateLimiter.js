import rateLimit from 'express-rate-limit';
import env from '../config/env.js';

/**
 * Standard API rate limiter (protects general endpoints)
 */
export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again later.',
  },
});

/**
 * Sensitive authentication rate limiter (login, registration, password recovery)
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: env.AUTH_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. For security reasons, please try again in 15 minutes.',
  },
});

/**
 * Checkout & quote calculation rate limiter (protects database computation & card testing)
 */
export const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many checkout quote requests. Please wait a few moments before trying again.',
  },
});

/**
 * Order submission rate limiter (prevents duplicate spam and automated inventory lockup)
 */
export const orderCreationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many order submission attempts. Please review your active orders.',
  },
});

/**
 * Order lookup rate limiter (thwarts automated order number enumeration / scraping)
 */
export const orderLookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many order lookup attempts. Please wait before querying again.',
  },
});

/**
 * Search & autocomplete rate limiter (protects RegExp & index query resources)
 */
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Search query rate limit exceeded. Please slow down.',
  },
});

/**
 * Review submission rate limiter (prevents review spam and rating manipulation)
 */
export const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Review submission limit reached for this hour. Thank you for your feedback.',
  },
});

export default {
  apiLimiter,
  authLimiter,
  checkoutLimiter,
  orderCreationLimiter,
  orderLookupLimiter,
  searchLimiter,
  reviewLimiter,
};
