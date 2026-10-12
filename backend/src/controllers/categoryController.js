import categoryService from '../services/categoryService.js';
import { sendSuccess, sendCreated } from '../utils/apiResponse.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return sendSuccess(res, categories, 'Categories retrieved successfully');
  } catch (err) {
    next(err);
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryBySlug(req.params.slug);
    return sendSuccess(res, category, 'Category details');
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const created = await categoryService.createCategory(req.body);
    return sendCreated(res, created, 'Category created');
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updated = await categoryService.updateCategory(req.params.id, req.body);
    return sendSuccess(res, updated, 'Category updated');
  } catch (err) {
    next(err);
  }
};

export default {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
};
