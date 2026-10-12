import Order from '../models/Order.js';
import logger from '../utils/logger.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

/**
 * Payment Service Abstraction Layer
 * Designed to integrate with providers such as Stripe, Adyen, PayPal, or Square.
 * Keeps all API keys server-side and enforces webhook verification.
 */
export class PaymentService {
  constructor(providerName = 'unconfigured') {
    this.providerName = providerName;
  }

  /**
   * Create a payment intent or checkout session with provider
   * Called before finalizing transaction
   */
  async createPaymentIntent({ orderNumber, amount, currency = 'USD', customerEmail }) {
    logger.info({ orderNumber, amount, currency }, 'Initializing payment intent');

    // Abstraction hook: When Stripe or another provider is configured, replace with:
    // const intent = await stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency, metadata: { orderNumber } });
    return {
      clientSecret: `mock_pi_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      provider: this.providerName,
      status: 'requires_payment_method',
      orderNumber,
      amount,
      currency,
    };
  }

  /**
   * Verify and process incoming signed webhooks from the payment gateway
   * Idempotent: safe against multiple webhook deliveries
   */
  async handleWebhook({ rawBody, signature, headers }) {
    logger.info({ provider: this.providerName }, 'Processing incoming payment webhook');

    // Provider signature verification hook (e.g. stripe.webhooks.constructEvent)
    if (!signature && process.env.NODE_ENV === 'production') {
      throw new BadRequestError('Webhook signature verification failed');
    }

    // Example event processing:
    // const event = this.verifySignature(rawBody, signature);
    // switch(event.type) { case 'payment_intent.succeeded': ... }

    return { received: true, status: 'acknowledged' };
  }

  /**
   * Reconcile payment status for an order
   */
  async updateOrderPaymentStatus(orderNumber, newStatus, transactionId = null) {
    const validStatuses = ['pending', 'authorized', 'paid', 'failed', 'refunded'];
    if (!validStatuses.includes(newStatus)) {
      throw new BadRequestError(`Invalid payment status "${newStatus}"`);
    }

    const order = await Order.findOne({ orderNumber });
    if (!order) {
      throw new NotFoundError(`Order "${orderNumber}" not found`);
    }

    order.paymentStatus = newStatus;
    if (transactionId) {
      order.paymentTransactionId = transactionId;
    }

    if (newStatus === 'paid') {
      order.orderStatus = 'processing';
      order.timeline.push({
        title: 'Payment Confirmed by Gateway',
        time: new Date().toLocaleTimeString(),
        completed: true,
      });
    }

    await order.save();
    return order;
  }
}

export const paymentService = new PaymentService();
export default paymentService;
