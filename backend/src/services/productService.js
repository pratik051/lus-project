import Product from '../models/Product.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

export class ProductService {
  async getProducts({
    category = 'all',
    search = '',
    q = '',
    sort = 'featured',
    minPrice = 0,
    maxPrice = 10000,
    rating = 0,
    page = 1,
    limit = 12,
  }) {
    const query = { isPublished: true };

    // 1. Category Filter
    if (category && category !== 'all') {
      const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { category: new RegExp(`^${escapedCategory}$`, 'i') },
        { subCategory: new RegExp(`^${escapedCategory}$`, 'i') },
      ];
    }

    // 2. Search query (search or q)
    const searchTerm = (search || q).trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(sanitized, 'i');
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { subCategory: searchRegex },
          { materials: searchRegex },
        ],
      });
    }

    // 3. Price Range Filter
    query.price = {
      $gte: Number(minPrice) || 0,
      $lte: Number(maxPrice) || 10000,
    };

    // 4. Rating Filter
    if (rating && Number(rating) > 0) {
      query.rating = { $gte: Number(rating) };
    }

    // 5. Safe Sort Whitelist
    let sortObj = { createdAt: -1 };
    switch (sort) {
      case 'price-asc':
        sortObj = { price: 1 };
        break;
      case 'price-desc':
        sortObj = { price: -1 };
        break;
      case 'rating':
        sortObj = { rating: -1, reviewCount: -1 };
        break;
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'featured':
      default:
        sortObj = { isFeatured: -1, isTrending: -1, createdAt: -1 };
        break;
    }

    const currentPage = Math.max(1, Number(page) || 1);
    const pageLimit = Math.min(100, Math.max(1, Number(limit) || 12));
    const skip = (currentPage - 1) * pageLimit;

    const [items, totalCount] = await Promise.all([
      Product.find(query).sort(sortObj).skip(skip).limit(pageLimit).lean({ virtuals: true }),
      Product.countDocuments(query),
    ]);

    // Format items to ensure `id` is present as slug
    const formatted = items.map(p => ({
      ...p,
      id: p.slug,
      _databaseId: p._id,
    }));

    return {
      items: formatted,
      totalCount,
      currentPage,
      totalPages: Math.ceil(totalCount / pageLimit) || 1,
    };
  }

  async getProductBySlugOrId(identifier) {
    let product = await Product.findOne({
      $or: [{ slug: identifier }, { sku: identifier.toUpperCase() }],
      isPublished: true,
    }).lean({ virtuals: true });

    if (!product && identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier).lean({ virtuals: true });
    }

    if (!product) {
      throw new NotFoundError(`Product "${identifier}" was not found`);
    }

    return {
      ...product,
      id: product.slug,
      _databaseId: product._id,
    };
  }

  async getFeaturedProducts(limit = 4) {
    const products = await Product.find({ isPublished: true, isFeatured: true })
      .limit(limit)
      .lean({ virtuals: true });
    return products.map(p => ({ ...p, id: p.slug }));
  }

  async getTrendingProducts(limit = 4) {
    const products = await Product.find({ isPublished: true, isTrending: true })
      .limit(limit)
      .lean({ virtuals: true });
    return products.map(p => ({ ...p, id: p.slug }));
  }

  async getSearchSuggestions(query) {
    if (!query || query.trim().length < 2) return [];
    const sanitized = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(sanitized, 'i');

    const matches = await Product.find({
      isPublished: true,
      $or: [{ name: regex }, { category: regex }, { subCategory: regex }],
    })
      .select('name slug category subCategory price image')
      .limit(6)
      .lean({ virtuals: true });

    return matches.map(p => ({
      id: p.slug,
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      price: p.price,
      image: p.image,
    }));
  }

  async createProduct(data) {
    return Product.create(data);
  }

  async updateProduct(id, updates) {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!product) throw new NotFoundError('Product not found');
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new NotFoundError('Product not found');
    return product;
  }
}

export const productService = new ProductService();
export default productService;
