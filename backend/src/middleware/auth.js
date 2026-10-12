import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';

export async function authenticate(req, res, next) {
  try {
    let token = null;

    // 1. Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 2. Check HTTP-only cookie
    else if (req.cookies && req.cookies.luxstore_token) {
      token = req.cookies.luxstore_token;
    }

    if (!token) {
      return next(new UnauthorizedError('Please log in to access this resource'));
    }

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select('+role +status');
    if (!user) {
      return next(new UnauthorizedError('The account belonging to this session no longer exists'));
    }

    if (user.status !== 'active') {
      return next(new ForbiddenError('Your account has been suspended or is not active'));
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Session has expired or is invalid. Please sign in again.'));
    }
    next(err);
  }
}

export async function optionalAuth(req, res, next) {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.luxstore_token) {
      token = req.cookies.luxstore_token;
    }

    if (token) {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
    next();
  } catch {
    // Gracefully ignore token errors in optional auth
    next();
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this administrative action'));
    }
    next();
  };
}

export default { authenticate, optionalAuth, authorize };
