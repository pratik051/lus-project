import apiClient from './apiClient';

export const cartService = {
  /**
   * Sync cart items with server
   * Expected backend: POST /api/cart/sync
   */
  async syncCart(items) {
    try {
      return await apiClient.post('/cart/sync', { items });
    } catch {
      // In guest or offline mode, frontend handles cart locally
      return { success: true, count: items.length };
    }
  },

  /**
   * Validate a promotional code
   * Expected backend: POST /api/cart/promo-code
   */
  async applyPromoCode(code) {
    try {
      const res = await apiClient.post('/cart/promo-code', { code });
      return res.data || res;
    } catch {
      // Client-side mock coupon validator
      const trimmed = code.trim().toUpperCase();
      if (trimmed === 'ATELIER10' || trimmed === 'LUX10') {
        return { valid: true, discountPercentage: 10, code: trimmed, message: '10% Atelier member discount applied' };
      }
      if (trimmed === 'WELCOME20') {
        return { valid: true, discountPercentage: 20, code: trimmed, message: '20% Welcome seasonal discount applied' };
      }
      throw new Error('Invalid or expired promotional code. Try code "ATELIER10".');
    }
  }
};

export default cartService;
