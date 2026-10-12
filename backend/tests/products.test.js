import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { connectDatabase, disconnectDatabase } from '../src/config/database.js';

describe('Products & Categories API Tests', () => {
  let app;

  before(async () => {
    await connectDatabase();
    app = createApp();
  });

  after(async () => {
    await disconnectDatabase();
  });

  it('GET /api/v1/products - should return paginated list of products', async () => {
    const res = await request(app).get('/api/v1/products?limit=5');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length <= 5);
    assert.ok(res.body.meta.totalCount > 0);
  });

  it('GET /api/v1/products - should filter by category', async () => {
    const res = await request(app).get('/api/v1/products?category=apparel');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    for (const item of res.body.data) {
      assert.equal(item.category.toLowerCase(), 'apparel');
    }
  });

  it('GET /api/v1/products - should filter by price range', async () => {
    const res = await request(app).get('/api/v1/products?minPrice=100&maxPrice=300');
    assert.equal(res.status, 200);
    for (const item of res.body.data) {
      assert.ok(item.price >= 100);
      assert.ok(item.price <= 300);
    }
  });

  it('GET /api/v1/products - should sort ascending by price', async () => {
    const res = await request(app).get('/api/v1/products?sort=price-asc&limit=10');
    assert.equal(res.status, 200);
    const prices = res.body.data.map(p => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      assert.ok(prices[i] <= prices[i + 1]);
    }
  });

  it('GET /api/v1/products/:slug - should return single product details by slug', async () => {
    const res = await request(app).get('/api/v1/products/minimalist-precision-chronograph');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.slug, 'minimalist-precision-chronograph');
    assert.ok(res.body.data.price > 0);
    assert.ok(Array.isArray(res.body.data.colors));
  });

  it('GET /api/v1/products/:slug - should return 404 for nonexistent product', async () => {
    const res = await request(app).get('/api/v1/products/non-existent-luxury-item');
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
  });

  it('GET /api/v1/products/autocomplete - should return suggestions for query', async () => {
    const res = await request(app).get('/api/v1/products/autocomplete?q=coat');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
  });

  it('GET /api/v1/categories - should return all active categories', async () => {
    const res = await request(app).get('/api/v1/categories');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length >= 4);
  });
});
