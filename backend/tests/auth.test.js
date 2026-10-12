import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { connectDatabase, disconnectDatabase } from '../src/config/database.js';
import User from '../src/models/User.js';

describe('Authentication & Access Control Integration Tests', () => {
  let app;

  before(async () => {
    await connectDatabase();
    app = createApp();
  });

  after(async () => {
    await disconnectDatabase();
  });

  const testEmail = `test.customer.${Date.now()}@example.com`;
  let authToken = '';

  it('POST /api/v1/auth/register - should register a new customer', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'Customer',
        email: testEmail,
        password: 'Password123!',
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.token);
    assert.equal(res.body.data.user.email, testEmail);
    assert.equal(res.body.data.user.role, 'customer');
    assert.equal(res.body.data.user.password, undefined); // never exposed
  });

  it('POST /api/v1/auth/register - should reject duplicate email with 409 Conflict', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Duplicate',
        lastName: 'User',
        email: testEmail,
        password: 'Password123!',
      });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
  });

  it('POST /api/v1/auth/login - should authenticate valid credentials and return JWT', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: 'Password123!',
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.token);
    authToken = res.body.data.token;
  });

  it('POST /api/v1/auth/login - should reject invalid password with 401 Unauthorized', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: 'WrongPassword!',
      });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  it('GET /api/v1/auth/me - should return authenticated user profile with Bearer token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${authToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.email, testEmail);
    assert.equal(res.body.data.password, undefined);
  });

  it('GET /api/v1/auth/me - should reject unauthenticated request with 401', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  it('POST /api/v1/auth/logout - should clear session cookie', async () => {
    const res = await request(app).post('/api/v1/auth/logout');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });
});
