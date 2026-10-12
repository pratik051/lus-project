import productService from '../services/productService.js';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/apiResponse.js';

export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.getProducts(req.query);
    return sendSuccess(res, result.items, 'Products retrieved successfully', 200, {
      totalCount: result.totalCount,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    });
  } catch (err) {
    next(err);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await productService.getProductBySlugOrId(req.params.slug || req.params.id);
    return sendSuccess(res, product, 'Product details');
  } catch (err) {
    next(err);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 4;
    const products = await productService.getFeaturedProducts(limit);
    return sendSuccess(res, products, 'Featured products');
  } catch (err) {
    next(err);
  }
};

export const getTrendingProducts = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 4;
    const products = await productService.getTrendingProducts(limit);
    return sendSuccess(res, products, 'Trending seasonal products');
  } catch (err) {
    next(err);
  }
};

export const getAutocompleteSuggestions = async (req, res, next) => {
  try {
    const query = req.query.q || req.query.search || '';
    const suggestions = await productService.getSearchSuggestions(query);
    return sendSuccess(res, suggestions, 'Search suggestions');
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const created = await productService.createProduct(req.body);
    return sendCreated(res, created, 'Product created successfully');
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    return sendSuccess(res, updated, 'Product updated successfully');
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    return sendNoContent(res);
  } catch (err) {
    next(err);
  }
};

export default {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getTrendingProducts,
  getAutocompleteSuggestions,
  createProduct,
  updateProduct,
  deleteProduct,
};
