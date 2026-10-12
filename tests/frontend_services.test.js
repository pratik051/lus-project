import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock browser global sessionStorage if not in browser
if (typeof globalThis.sessionStorage === 'undefined') {
  const store = new Map();
  globalThis.sessionStorage = {
    getItem: (key) => store.get(key) || null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
}

describe('LuxStore Frontend Services & Business Logic Tests', () => {
  beforeEach(() => {
    globalThis.sessionStorage.clear();
  });

  describe('1. Cart Service Promo Code Verification', () => {
    it('should validate ATELIER10 discount with 10% rate', async () => {
      const { cartService } = await import('../src/services/cartService.js');
      const result = await cartService.applyPromoCode('ATELIER10');
      assert.equal(result.valid, true);
      assert.equal(result.discountPercentage, 10);
      assert.equal(result.code, 'ATELIER10');
    });

    it('should validate WELCOME20 discount with 20% rate', async () => {
      const { cartService } = await import('../src/services/cartService.js');
      const result = await cartService.applyPromoCode('welcome20');
      assert.equal(result.valid, true);
      assert.equal(result.discountPercentage, 20);
      assert.equal(result.code, 'WELCOME20');
    });

    it('should reject an unrecognized promo code', async () => {
      const { cartService } = await import('../src/services/cartService.js');
      await assert.rejects(
        () => cartService.applyPromoCode('INVALID_CODE_99'),
        /Invalid or expired promotional code/
      );
    });
  });

  describe('2. Product Service Catalog Logic', () => {
    it('should return mock products with pagination when backend is offline', async () => {
      const { productService } = await import('../src/services/productService.js');
      const result = await productService.getProducts({ page: 1, limit: 4 });
      assert.equal(Array.isArray(result.items), true);
      assert.equal(result.items.length <= 4, true);
      assert.equal(typeof result.totalCount, 'number');
    });

    it('should filter mock catalog by price bounds', async () => {
      const { productService } = await import('../src/services/productService.js');
      const result = await productService.getProducts({ minPrice: 100, maxPrice: 200 });
      for (const item of result.items) {
        assert.equal(item.price >= 100 && item.price <= 200, true);
      }
    });

    it('should return trending and featured items', async () => {
      const { productService } = await import('../src/services/productService.js');
      const trending = await productService.getTrendingProducts();
      assert.equal(Array.isArray(trending), true);
      assert.equal(trending.length > 0, true);
    });
  });

  describe('3. Auth Service Session & Token Handling', () => {
    it('should store and clear authentication token in sessionStorage', async () => {
      const { authService } = await import('../src/services/authService.js');
      
      // Simulate mock login
      const user = await authService.login('test@example.com', 'dummy_pass');
      assert.ok(user);
      assert.equal(sessionStorage.getItem('luxstore_auth_token') !== null, true);

      // Logout should clear token
      authService.logout();
      assert.equal(sessionStorage.getItem('luxstore_auth_token'), null);
    });
  });

  describe('4. Order Service Order Creation & Fallbacks', () => {
    it('should construct realistic order with tracking and timeline on order creation', async () => {
      const { orderService } = await import('../src/services/orderService.js');
      const order = await orderService.createOrder({
        items: [{ productId: 'minimalist-ceramic-mug', quantity: 1 }],
        shippingAddress: { fullName: 'Test Buyer' },
        subtotal: 28.0,
        shippingFee: 15.0,
        tax: 2.24,
        total: 45.24,
      });

      assert.ok(order.id);
      assert.match(order.id, /^LX-/);
      assert.ok(order.trackingNumber);
      assert.match(order.trackingNumber, /^TRK-/);
      assert.equal(order.status, 'Confirmed');
      assert.equal(Array.isArray(order.timeline), true);
    });
  });
});
