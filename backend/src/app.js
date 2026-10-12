import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import mongoose from 'mongoose';
import env from './config/env.js';
import logger from './utils/logger.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { mongoSanitize } from './middleware/mongoSanitize.js';
import errorHandler from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';
import { NotFoundError } from './utils/errors.js';

export const createApp = () => {
  const app = express();

  // 1. Trust proxy if in production
  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  // 2. HTTP Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false, // REST API JSON backend
      hsts:
        env.NODE_ENV === 'production'
          ? { maxAge: 31536000, includeSubDomains: true, preload: true }
          : false,
      frameguard: { action: 'deny' },
      noSniff: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    })
  );

  // 3. CORS with explicitly configured trusted origins
  const allowedDevOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) return callback(null, true);

        const isExplicitlyAllowed = env.corsOrigins.includes(origin);
        const isLocalDev = env.NODE_ENV === 'development' && allowedDevOrigins.includes(origin);

        if (isExplicitlyAllowed || isLocalDev) {
          return callback(null, true);
        }
        return callback(new Error(`CORS blocked request from untrusted origin: ${origin}`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id', 'X-Order-Token', 'Idempotency-Key'],
      exposedHeaders: ['Idempotency-Key'],
    })
  );

  // 4. Request Logging (sanitized with Pino)
  app.use(
    pinoHttp({
      logger,
      autoLogging: {
        ignore: (req) => req.url.startsWith('/health') || req.url.startsWith('/api/v1/health'),
      },
    })
  );

  // 5. Body Parsing with strict size limits & NoSQL Injection Protection
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(mongoSanitize);
  app.use(cookieParser(env.COOKIE_SECRET));

  // 6. Global API Rate Limiter
  app.use('/api', apiLimiter);

  // 7. Base Health Checks (Liveness and Readiness Probes)
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  app.get('/health/live', (req, res) => {
    res.status(200).json({ status: 'alive', uptime: process.uptime() });
  });

  app.get('/health/ready', (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      return res.status(200).json({
        status: 'ready',
        database: 'connected',
        uptime: process.uptime(),
      });
    }
    return res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
    });
  });

  // 8. Mount Primary REST APIs
  app.use('/api/v1', apiRouter);

  // Compatibility mount for /api/... matching Phase 1 frontend paths
  app.use('/api', apiRouter);

  // 9. 404 Route Handler
  app.use('*', (req, res, next) => {
    next(new NotFoundError(`The requested endpoint "${req.method} ${req.originalUrl}" does not exist on this server`));
  });

  // 10. Centralized Error Handler
  app.use(errorHandler);

  return app;
};

export default createApp;
