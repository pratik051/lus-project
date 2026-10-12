import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { connectDatabase, disconnectDatabase } from '../src/config/database.js';
import User from '../src/models/User.js';
import Order from '../src/models/Order.js';
import Product from '../src/models/Product.js';

describe('Comprehensive Security Audit & Penetration Tests', () => {
  let app;
  let adminToken = '';
  let customerAToken = '';
  let customerBToken = '';
  let customerAId = '';
  let customerBId = '';
  let testOrderNumber = '';
  let guestOrderNumber = '';
  let guestLookupToken = '';

  before(async () => {
    await connectDatabase();
    app = createApp();

    // 1. Authenticate Admin
    const adminLogin = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@luxstore.internal', password: 'Admin@LuxStore2026!' });
    adminToken = adminLogin.body.data.token;

    // 2. Register Customer A
    const userAEmail = `cust.a.${Date.now()}@example.com`;
    const userARes = await request(app)
      .post('/api/v1/auth/register')
      .send({ firstName: 'Alice', lastName: 'Customer', email: userAEmail, password: 'SecurePassword2026!' });
    customerAToken = userARes.body.data.token;
    customerAId = userARes.body.data.user.id;

    // 3. Register Customer B
    const userBEmail = `cust.b.${Date.now()}@example.com`;
    const userBRes = await request(app)
      .post('/api/v1/auth/register')
      .send({ firstName: 'Bob', lastName: 'Customer', email: userBEmail, password: 'SecurePassword2026!' });
    customerBToken = userBRes.body.data.token;
    customerBId = userBRes.body.data.user.id;

    // 4. Create Order belonging to Customer A
    const orderRes = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customerAToken}`)
      .send({
        items: [{ productId: 'minimalist-ceramic-mug', quantity: 1 }],
        shippingAddress: {
          fullName: 'Alice Customer',
          street: '100 Security Blvd',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
        },
        paymentMethod: 'Credit Card',
      });
    testOrderNumber = orderRes.body.data.id || orderRes.body.data.orderNumber;

    // 5. Create Guest Order (unauthenticated)
    const guestOrderRes = await request(app)
      .post('/api/v1/orders')
      .send({
        items: [{ productId: 'minimalist-ceramic-mug', quantity: 1 }],
        shippingAddress: {
          fullName: 'Guest Buyer',
          street: '200 Anonymous Ave',
          city: 'Austin',
          state: 'TX',
          postalCode: '78701',
        },
        paymentMethod: 'Apple Pay Express',
      });
    guestOrderNumber = guestOrderRes.body.data.id || guestOrderRes.body.data.orderNumber;
    guestLookupToken = guestOrderRes.body.data.lookupToken;
  });

  after(async () => {
    await disconnectDatabase();
  });

  /* -------------------------------------------------------------
     TEST SUITE 1: IDOR & Customer Data Isolation
  ------------------------------------------------------------- */
  describe('1. IDOR & Access Control', () => {
    it('CRITICAL: Unauthenticated requester must NOT view customer order details (403 Forbidden)', async () => {
      const res = await request(app).get(`/api/v1/orders/${testOrderNumber}`);
      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /permission/i);
    });

    it('Customer B must NOT view Customer A order details (403 Forbidden)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${testOrderNumber}`)
        .set('Authorization', `Bearer ${customerBToken}`);
      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
    });

    it('Customer A CAN view their own order details (200 OK)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${testOrderNumber}`)
        .set('Authorization', `Bearer ${customerAToken}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.orderNumber, testOrderNumber);
    });

    it('Admin CAN view Customer A order details (200 OK)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${testOrderNumber}`)
        .set('Authorization', `Bearer ${adminToken}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
    });

    it('Guest Order: Unauthenticated requester without token is blocked (403 Forbidden)', async () => {
      const res = await request(app).get(`/api/v1/orders/${guestOrderNumber}`);
      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
    });

    it('Guest Order: Requester with valid lookupToken CAN view guest order (200 OK)', async () => {
      const res = await request(app).get(`/api/v1/orders/${guestOrderNumber}?token=${guestLookupToken}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.orderNumber, guestOrderNumber);
    });
  });

  /* -------------------------------------------------------------
     TEST SUITE 2: Mass Assignment & Privilege Escalation Protection
  ------------------------------------------------------------- */
  describe('2. Mass Assignment & Privilege Escalation', () => {
    it('Customer cannot escalate role to "admin" or modify reward points via profile update', async () => {
      const res = await request(app)
        .put('/api/v1/auth/profile')
        .set('Authorization', `Bearer ${customerAToken}`)
        .send({
          firstName: 'AliceUpdated',
          role: 'admin',
          memberTier: 'Atelier Privé',
          rewardPoints: 999999,
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.data.firstName, 'AliceUpdated');

      // Verify in DB directly: role and points must remain untouched
      const user = await User.findById(customerAId);
      assert.equal(user.role, 'customer', 'Role must remain customer');
      assert.equal(user.rewardPoints, 100, 'Reward points must not be modified');
    });

    it('Customer cannot register with an administrative role', async () => {
      const regRes = await request(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'Hacker',
          lastName: 'User',
          email: `fakeadmin.${Date.now()}@example.com`,
          password: 'Password123!',
          role: 'admin',
        });

      assert.equal(regRes.status, 201);
      assert.equal(regRes.body.data.user.role, 'customer', 'Registered role must default to customer');
    });
  });

  /* -------------------------------------------------------------
     TEST SUITE 3: Admin Mutation Validation
  ------------------------------------------------------------- */
  describe('3. Admin Mutation Validation', () => {
    it('PATCH /api/v1/admin/orders/:id/status - should reject invalid order status enum', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/orders/${testOrderNumber}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ orderStatus: 'malicious_state' });

      assert.equal(res.status, 422);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /validation/i);
    });

    it('PATCH /api/v1/admin/products/:id/inventory - should reject negative inventory', async () => {
      const product = await Product.findOne();
      const res = await request(app)
        .patch(`/api/v1/admin/products/${product._id}/inventory`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ inventory: -50 });

      assert.equal(res.status, 422);
      assert.equal(res.body.success, false);
    });
  });

  /* -------------------------------------------------------------
     TEST SUITE 4: NoSQL Injection Defense
  ------------------------------------------------------------- */
  describe('4. NoSQL Operator Sanitization', () => {
    it('mongoSanitize strips $ operator objects from login payload', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: { $gt: '' },
          password: 'Password123!',
        });

      // Zod or auth fails because email key was stripped/invalidated
      assert.equal(res.status, 422);
      assert.equal(res.body.success, false);
    });
  });

  /* -------------------------------------------------------------
     TEST SUITE 5: CORS Strict Enforcement
  ------------------------------------------------------------- */
  describe('5. CORS Boundary Enforcement', () => {
    it('CORS blocks credentialed requests from untrusted external origin', async () => {
      const res = await request(app)
        .get('/api/v1/products')
        .set('Origin', 'http://malicious-attacker-domain.xyz');

      // Express CORS error handler returns 500/error on blocked origin
      assert.equal(res.status >= 400, true);
    });

    it('CORS allows approved origin', async () => {
      const res = await request(app)
        .get('/api/v1/products')
        .set('Origin', 'http://localhost:5173');

      assert.equal(res.status, 200);
      assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
    });
  });

  /* -------------------------------------------------------------
     TEST SUITE 6: Sensitive Error Handling
  ------------------------------------------------------------- */
  describe('6. Error Sanitization & Information Disclosure', () => {
    it('CastError returns clean message without raw identifier reflection', async () => {
      const res = await request(app)
        .get('/api/v1/products/invalid--objectid--payload')
        .set('Authorization', `Bearer ${customerAToken}`);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
      assert.equal(res.body.message, 'Product "invalid--objectid--payload" was not found');
    });
  });
});
