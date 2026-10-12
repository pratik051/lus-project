import createApp from './app.js';
import env from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import logger from './utils/logger.js';

async function startServer() {
  try {
    // 1. Connect to MongoDB
    await connectDatabase();

    // 2. Initialize Express application
    const app = createApp();

    // 3. Start listening
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 LuxStore Backend Server is listening on port ${env.PORT} in [${env.NODE_ENV}] mode`);
      logger.info(`📡 API root available at http://localhost:${env.PORT}/api/v1 and http://localhost:${env.PORT}/api`);
    });

    // 4. Graceful Shutdown handlers
    const shutdown = async (signal) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        try {
          await disconnectDatabase();
          logger.info('Database connections closed.');
          process.exit(0);
        } catch (err) {
          logger.error('Error during database disconnect:', err);
          process.exit(1);
        }
      });

      // Force shutdown after 10s if hanging
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason, promise) => {
      logger.error({ reason, promise }, 'Unhandled Rejection at Promise');
    });

    process.on('uncaughtException', (error) => {
      logger.error({ error }, 'Uncaught Exception thrown');
      shutdown('UNCAUGHT_EXCEPTION');
    });

    return server;
  } catch (error) {
    logger.error('Failed to start LuxStore backend server:', error);
    process.exit(1);
  }
}

startServer();
