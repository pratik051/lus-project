import mongoose from 'mongoose';

const orderItemSnapshotSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productId: {
      type: String, // String slug e.g. "minimalist-precision-chronograph"
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    variantColor: {
      type: String,
      default: 'Standard',
    },
    variantSize: {
      type: String,
      default: 'Standard',
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const timelineStepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    time: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const orderAddressSnapshotSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, default: '' },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: 'United States' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
      index: true,
    },
    items: {
      type: [orderItemSnapshotSchema],
      required: true,
      validate: [v => Array.isArray(v) && v.length > 0, 'Order must contain at least one item'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    couponCode: {
      type: String,
      default: null,
      uppercase: true,
    },
    shippingFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    shippingAddress: {
      type: orderAddressSnapshotSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Credit Card',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'authorized', 'paid', 'failed', 'refunded'],
      default: 'authorized',
      index: true,
    },
    paymentTransactionId: {
      type: String,
      default: null,
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'confirmed', 'processing', 'in_transit', 'delivered', 'cancelled'],
      default: 'confirmed',
      index: true,
    },
    trackingNumber: {
      type: String,
      default: null,
    },
    carrier: {
      type: String,
      default: 'FedEx Express Worldwide',
    },
    estimatedDelivery: {
      type: String,
      default: '3 to 5 business days',
    },
    timeline: {
      type: [timelineStepSchema],
      default: [],
    },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    lookupToken: {
      type: String,
      sparse: true,
      index: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret.orderNumber;
        ret._databaseId = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Order = mongoose.model('Order', orderSchema);
export default Order;
