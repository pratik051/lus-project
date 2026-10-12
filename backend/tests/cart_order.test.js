import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { connectDatabase, disconnectDatabase } from '../src/config/database.js';
import User from '../src/models/User.js';
import Product from '../src/models/Product.js';
import Order from '../src/models/Order.js';

describe('Cart, Checkout Quotes & Orders Integration Tests', () => {
  let app;
  let customerToken = '';
  let customerUser;
  let testProduct;

  before(async () => {
    await connectDatabase();
    app = createApp();

    // Login as Jane Doe
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jane.doe@example.com',
        password: 'JaneDoe@2026!',
      });

    customerToken = loginRes.body.data.token;
    customerUser = loginRes.body.data.user;

    testProduct = await Product.findOne({ slug: 'minimalist-precision-chronograph' });
  });

  after(async () => {
    await disconnectDatabase();
  });

  it('POST /api/v1/checkout/quote - should calculate authoritative total, taxes, and complimentary shipping', async () => {
    const res = await request(app)
      .post('/api/v1/checkout/quote')
      .send({
        items: [
          {
            productId: testProduct.slug,
            quantity: 1,
            variantColor: 'Matte Black',
            variantSize: '40mm Standard',
          },
        ],
        couponCode: 'ATELIER10', // 10% off
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    
    const quote = res.body.data;
    assert.equal(quote.subtotal, testProduct.price);
    assert.equal(quote.couponCode, 'ATELIER10');
    assert.ok(quote.discount > 0);
    // Subtotal > $150 threshold unlocks complimentary shipping
    assert.equal(quote.shippingFee, 0);
    assert.ok(quote.tax > 0);
    assert.equal(quote.total, Number((quote.subtotal - quote.discount + quote.shippingFee + quote.tax).toFixed(2)));
  });

  it('POST /api/v1/checkout/quote - should charge $15 shipping fee when below $150 threshold', async () => {
    const cheapProduct = await Product.findOne({ slug: 'minimalist-ceramic-mug' }); // $28.00
    const res = await request(app)
      .post('/api/v1/checkout/quote')
      .send({
        items: [
          {
            productId: cheapProduct.slug,
            quantity: 1,
          },
        ],
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.shippingFee, 15.0);
  });

  it('POST /api/v1/orders - should create order, decrement inventory, and assign unique order number', async () => {
    const prevInventory = testProduct.inventory;
    const idempotencyKey = `idem_${Date.now()}`;

    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .set('Idempotency-Key', idempotencyKey)
      .send({
        items: [
          {
            productId: testProduct.slug,
            quantity: 1,
            variantColor: 'Matte Black',
            variantSize: '40mm Standard',
          },
        ],
        shippingAddress: {
          fullName: 'Jane Doe',
          street: '123 Luxury Lane, Apt 4B',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94107',
          country: 'United States',
          email: 'jane.doe@example.com',
        },
        paymentMethod: 'Credit Card',
        idempotencyKey,
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    
    const order = res.body.data;
    assert.ok(order.orderNumber.startsWith('LX-'));
    assert.equal(order.orderStatus, 'confirmed');
    assert.equal(order.paymentStatus, 'authorized');
    assert.equal(order.items.length, 1);

    // Verify product inventory was decremented in database
    const refreshedProduct = await Product.findById(testProduct._id);
    assert.equal(refreshedProduct.inventory, prevInventory - 1);

    // Test duplicate submission with identical idempotencyKey
    const duplicateRes = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .set('Idempotency-Key', idempotencyKey)
      .send({
        items: [{ productId: testProduct.slug, quantity: 1 }],
        shippingAddress: { fullName: 'Jane Doe', street: '123 Luxury Lane', city: 'SF', postalCode: '94107' },
        idempotencyKey,
      });

    assert.equal(duplicateRes.status, 201);
    assert.equal(duplicateRes.body.data.orderNumber, order.orderNumber); // Same order returned
  });

  it('GET /api/v1/orders - should return authenticated customer order history', async () => {
    const res = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${customerToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 1);
  });
});
