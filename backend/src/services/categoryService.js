import Category from '../models/Category.js';
import { NotFoundError } from '../utils/errors.js';

export class CategoryService {
  async getAllCategories() {
    return Category.find({ active: true }).sort({ displayOrder: 1, name: 1 }).lean();
  }

  async getCategoryBySlug(slug) {
    const category = await Category.findOne({ slug, active: true }).lean();
    if (!category) {
      throw new NotFoundError(`Category "${slug}" not found`);
    }
    return category;
  }

  async createCategory(data) {
    return Category.create(data);
  }

  async updateCategory(id, updates) {
    const category = await Category.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!category) throw new NotFoundError('Category not found');
    return category;
  }
}

export const categoryService = new CategoryService();
export default categoryService;
