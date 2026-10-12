import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import env from '../config/env.js';
import { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } from '../utils/errors.js';

export class AuthService {
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }

  async register({ firstName, lastName, email, password }) {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new ConflictError('An account with this email address already exists');
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'customer',
      status: 'active',
      memberTier: 'New Member',
      rewardPoints: 100,
    });

    const token = this.generateToken(user);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        memberTier: user.memberTier,
        rewardPoints: user.rewardPoints,
        initials: user.initials,
      },
      token,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select('+password +role +status');
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedError('Your account is inactive or suspended');
    }

    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });

    const token = this.generateToken(user);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        memberTier: user.memberTier,
        rewardPoints: user.rewardPoints,
        initials: user.initials,
      },
      token,
    };
  }

  async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateProfile(userId, updates) {
    const allowed = ['firstName', 'lastName', 'phone'];
    const safeUpdates = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) {
        safeUpdates[key] = updates[key];
      }
    }

    const user = await User.findByIdAndUpdate(userId, safeUpdates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      // Return success to avoid email enumeration
      return { success: true, message: 'If an account exists, a recovery code has been dispatched.' };
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // In production, dispatch email with resetToken. For review/testing, log safely.
    return {
      success: true,
      message: 'Password reset instructions have been generated.',
      resetToken: env.NODE_ENV === 'development' ? resetToken : undefined,
    };
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+password');

    if (!user) {
      throw new BadRequestError('Reset token is invalid or has expired');
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const authToken = this.generateToken(user);
    return {
      user,
      token: authToken,
      message: 'Password reset successfully',
    };
  }
}

export const authService = new AuthService();
export default authService;
