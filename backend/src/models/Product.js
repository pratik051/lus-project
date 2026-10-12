import mongoose from 'mongoose';
import slugify from 'slugify';

const colorVariantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    hex: { type: String, required: true, trim: true },
    ringColor: { type: String, default: '#2457C5' },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: 150,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    subCategory: {
      type: String,
      default: '',
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
      index: true,
    },
    originalPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    discount: {
      type: String,
      default: null,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    inventory: {
      type: Number,
      required: true,
      min: [0, 'Inventory cannot be negative'],
      default: 10,
    },
    inStock: {
      type: Boolean,
      default: true,
      index: true,
    },
    badge: {
      type: String,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
      index: true,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Primary image URL is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    colors: [colorVariantSchema],
    sizes: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    materials: {
      type: String,
      default: '',
    },
    care: {
      type: String,
      default: '',
    },
    shipping: {
      type: String,
      default: 'Complimentary express shipping included.',
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Expose id as the slug for seamless frontend route matching (/product/:id)
        ret.id = ret.slug;
        ret._databaseId = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Compound text index for search
productSchema.index({
  name: 'text',
  description: 'text',
  subCategory: 'text',
  materials: 'text',
});

productSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  this.inStock = this.inventory > 0;
  next();
});

export const Product = mongoose.model('Product', productSchema);
export default Product;
