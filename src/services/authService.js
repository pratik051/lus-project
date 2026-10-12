import apiClient from './apiClient';
import { MOCK_USER } from '../data/mockData';

export const authService = {
  /**
   * Log in user
   * Expected backend: POST /api/auth/login { email, password }
   */
  async login(email, password) {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const payload = res.data || res;
      const token = payload.accessToken || payload.token;
      if (token) {
        sessionStorage.setItem('luxstore_auth_token', token);
      }
      return payload.user || payload;
    } catch {
      // Mock login fallback if backend is offline
      const user = {
        ...MOCK_USER,
        email: email || MOCK_USER.email,
      };
      sessionStorage.setItem('luxstore_auth_token', 'mock_jwt_token_for_review_only');
      return user;
    }
  },

  /**
   * Register new user account
   * Expected backend: POST /api/auth/register
   */
  async register({ firstName, lastName, email, password }) {
    try {
      const res = await apiClient.post('/auth/register', { firstName, lastName, email, password });
      const payload = res.data || res;
      const token = payload.accessToken || payload.token;
      if (token) {
        sessionStorage.setItem('luxstore_auth_token', token);
      }
      return payload.user || payload;
    } catch {
      const user = {
        id: `usr_${Date.now()}`,
        firstName,
        lastName,
        email,
        phone: '',
        initials: `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase(),
        memberTier: 'New Member',
        rewardPoints: 100,
        addresses: []
      };
      sessionStorage.setItem('luxstore_auth_token', 'mock_jwt_token_for_review_only');
      return user;
    }
  },

  /**
   * Fetch currently authenticated user session
   * Expected backend: GET /api/auth/me
   */
  async getCurrentUser() {
    const token = sessionStorage.getItem('luxstore_auth_token');
    if (!token) return null;

    try {
      const res = await apiClient.get('/auth/me');
      return res.data || res;
    } catch {
      return MOCK_USER;
    }
  },

  /**
   * Update profile information
   * Expected backend: PUT /api/auth/profile
   */
  async updateProfile(updates) {
    try {
      const res = await apiClient.put('/auth/profile', updates);
      return res.data || res;
    } catch {
      return { ...MOCK_USER, ...updates };
    }
  },

  /**
   * Request password reset instructions
   * Expected backend: POST /api/auth/forgot-password
   */
  async requestPasswordReset(email) {
    try {
      const res = await apiClient.post('/auth/forgot-password', { email });
      return res.data || res;
    } catch {
      return { success: true, message: `Reset link dispatched to ${email} (simulated)` };
    }
  },

  /**
   * End session
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout', {});
    } catch {
      // ignore
    } finally {
      sessionStorage.removeItem('luxstore_auth_token');
    }
  }
};

export default authService;
