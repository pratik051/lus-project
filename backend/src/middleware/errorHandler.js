import logger from '../utils/logger.js';
import env from '../config/env.js';

export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details = err.details || null;

  // Handle Mongoose Bad ObjectId (CastError) - prevent reflection of raw input
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found with the requested identifier';
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. Please use another value.`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 422;
    message = 'Validation failed';
    details = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Handle JSON Syntax Error in request body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Malformed JSON payload';
  }

  // In production, sanitize unexpected 500 errors to prevent leaking internal traces or DB schemas
  if (statusCode >= 500 && env.NODE_ENV === 'production') {
    message = 'An unexpected server error occurred. Please try again later.';
    details = null;
  }

  // Log 500 errors
  if (statusCode >= 500) {
    logger.error({
      err: {
        message: err.message,
        stack: err.stack,
      },
      req: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
    }, 'Unhandled Server Error');
  } else {
    logger.warn({
      statusCode,
      message,
      url: req.originalUrl,
      method: req.method,
    }, 'Operational API warning');
  }

  const response = {
    success: false,
    message,
  };

  if (details) {
    response.details = details;
  }

  if (env.NODE_ENV === 'development' && statusCode >= 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

export default errorHandler;
