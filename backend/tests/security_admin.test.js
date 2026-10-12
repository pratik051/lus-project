import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { connectDatabase, disconnectDatabase } from '../src/config/database.js';
import AuditLog from '../src/models/AuditLog.js';

describe('Security, Role-Based Access & Admin Tests', () => {
  let app;
  let adminToken = '';
  let customerToken = '';

  before(async () => {
    await connectDatabase();
    app = createApp();

    // Login Admin
    const adminLogin = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@luxstore.internal',
        password: 'Admin@LuxStore2026!',
      });
    adminToken = adminLogin.body.data.token;

    // Login Customer
    const customerLogin = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jane.doe@example.com',
        password: 'JaneDoe@2026!',
      });
    customerToken = customerLogin.body.data.token;
  });

  after(async () => {
    await disconnectDatabase();
  });

  it('GET /api/v1/admin/stats - should forbid access to customer with 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/v1/admin/stats')
      .set('Authorization', `Bearer ${customerToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
  });

  it('GET /api/v1/admin/stats - should grant access to admin with 200 OK', async () => {
    const res = await request(app)
      .get('/api/v1/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.totalOrders >= 0);
    assert.ok(res.body.data.totalRevenue >= 0);
  });

  it('PATCH /api/v1/admin/orders/:id/status - should update status and write an AuditLog', async () => {
    const initialLogs = await AuditLog.countDocuments();

    const res = await request(app)
      .patch('/api/v1/admin/orders/LX-94821/status')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        orderStatus: 'in_transit',
        trackingNumber: 'TRK-984210984US',
        carrier: 'FedEx Express Worldwide',
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.orderStatus, 'in_transit');

    // Verify AuditLog was persisted
    const updatedLogs = await AuditLog.countDocuments();
    assert.equal(updatedLogs, initialLogs + 1);
  });

  it('Customer Isolation - customer cannot cancel an order that does not belong to them', async () => {
    // Register another customer
    const otherEmail = `intruder.${Date.now()}@example.com`;
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Intruder',
        lastName: 'User',
        email: otherEmail,
        password: 'Password123!',
      });

    const otherToken = regRes.body.data.token;

    // Try to cancel Jane Doe's order (LX-94821)
    const res = await request(app)
      .post('/api/v1/orders/LX-94821/cancel')
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ reason: 'Malicious attempt' });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
  });
});
