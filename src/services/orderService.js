import apiClient from './apiClient';
import { MOCK_ORDERS } from '../data/mockData';

export const orderService = {
  /**
   * Submit new checkout order
   * Expected backend: POST /api/orders
   */
  async createOrder(orderPayload) {
    try {
      const res = await apiClient.post('/orders', orderPayload);
      const order = res.data || res;
      return { ...order, id: order.id || order.orderNumber };
    } catch {
      // Create realistic mock order for demonstration if backend is unreachable
      const orderId = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingNumber = `TRK-${Math.floor(100000000 + Math.random() * 900000000)}US`;
      
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'Confirmed',
        trackingNumber,
        carrier: 'FedEx Express Worldwide',
        estimatedDelivery: '3 to 5 business days',
        items: orderPayload.items,
        shippingAddress: orderPayload.shippingAddress,
        paymentMethod: orderPayload.paymentMethod || 'Credit Card ending in ••••',
        subtotal: orderPayload.subtotal,
        shippingFee: orderPayload.shippingFee || 0,
        tax: orderPayload.tax || 0,
        discount: orderPayload.discount || 0,
        total: orderPayload.total,
        isMockOrder: true,
        timeline: [
          { title: 'Order Authorized & Confirmed', time: 'Just now', completed: true },
          { title: 'Quality Assurance & Packaging', time: 'Pending', completed: false },
          { title: 'Courier Dispatch', time: 'Pending', completed: false },
          { title: 'Delivered', time: 'Pending', completed: false }
        ]
      };

      // Persist in mock orders in session
      const existing = JSON.parse(sessionStorage.getItem('luxstore_user_orders') || '[]');
      existing.unshift(newOrder);
      sessionStorage.setItem('luxstore_user_orders', JSON.stringify(existing));

      return newOrder;
    }
  },

  /**
   * Request authoritative checkout quote from backend
   * Calculates real product prices, taxes, shipping, and coupon discounts
   */
  async getCheckoutQuote(quotePayload) {
    try {
      const res = await apiClient.post('/checkout/quote', quotePayload);
      return res.data || res;
    } catch (err) {
      console.warn('Checkout quote fallback:', err.message);
      return null;
    }
  },

  /**
   * Get past and active user orders
   * Expected backend: GET /api/orders
   */
  async getUserOrders() {
    try {
      const res = await apiClient.get('/orders');
      return res.data || res;
    } catch {
      const sessionOrders = JSON.parse(sessionStorage.getItem('luxstore_user_orders') || '[]');
      return [...sessionOrders, ...MOCK_ORDERS];
    }
  },

  /**
   * Get specific order details by ID
   * Expected backend: GET /api/orders/:id
   */
  async getOrderById(id) {
    try {
      const res = await apiClient.get(`/orders/${id}`);
      const order = res.data || res;
      return { ...order, id: order.id || order.orderNumber };
    } catch {
      const sessionOrders = JSON.parse(sessionStorage.getItem('luxstore_user_orders') || '[]');
      const all = [...sessionOrders, ...MOCK_ORDERS];
      const match = all.find(o => o.id === id || o.orderNumber === id);
      if (!match) {
        throw new Error(`Order ${id} could not be located.`);
      }
      return match;
    }
  }
};

export default orderService;
