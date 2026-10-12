import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { NotFoundError } from '../utils/errors.js';

export class WishlistService {
  async getWishlist(userId) {
    let wishlist = await Wishlist.findOne({ user: userId }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }
    return {
      products: wishlist.products.map(p => ({ ...p.toObject(), id: p.slug })),
      count: wishlist.products.length,
    };
  }

  async toggleProduct(userId, productId) {
    const product = await Product.findOne({
      $or: [{ slug: productId }, { _id: productId.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
    });

    if (!product) {
      throw new NotFoundError(`Product "${productId}" not found`);
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }

    const index = wishlist.products.findIndex(id => id.toString() === product._id.toString());
    let added = false;

    if (index > -1) {
      wishlist.products.splice(index, 1);
    } else {
      wishlist.products.push(product._id);
      added = true;
    }

    await wishlist.save();
    return {
      added,
      productId: product.slug,
      count: wishlist.products.length,
    };
  }

  async removeProduct(userId, productId) {
    const product = await Product.findOne({
      $or: [{ slug: productId }, { _id: productId.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== product._id.toString());
      await wishlist.save();
    }

    return {
      success: true,
      productId: product.slug,
    };
  }
}

export const wishlistService = new WishlistService();
export default wishlistService;
