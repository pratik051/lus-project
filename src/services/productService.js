import apiClient from './apiClient';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';

export const productService = {
  /**
   * Fetch products with optional filtering and sorting
   * Expected backend route: GET /api/products?category=...&q=...&sort=...&minPrice=...&maxPrice=...
   */
  async getProducts({
    category = 'all',
    search = '',
    sort = 'featured',
    minPrice = 0,
    maxPrice = 1000,
    rating = 0,
    page = 1,
    limit = 12
  } = {}) {
    try {
      const queryParams = new URLSearchParams({
        category,
        search,
        sort,
        minPrice,
        maxPrice,
        rating,
        page,
        limit
      }).toString();
      const res = await apiClient.get(`/products?${queryParams}`);
      const items = Array.isArray(res.data) ? res.data : (res.data?.products || res.items || []);
      const totalCount = res.meta?.totalCount ?? (res.totalCount || items.length);
      const currentPage = res.meta?.currentPage ?? (res.currentPage || page);
      const totalPages = res.meta?.totalPages ?? (res.totalPages || Math.ceil(totalCount / limit) || 1);

      return {
        items,
        totalCount,
        currentPage,
        totalPages,
        isMockData: false,
      };
    } catch {
      // Graceful fallback to client-side filtering over mock data
      let items = [...MOCK_PRODUCTS];

      if (category && category !== 'all') {
        items = items.filter(
          p => p.category.toLowerCase() === category.toLowerCase() ||
               p.subCategory.toLowerCase() === category.toLowerCase()
        );
      }

      if (search) {
        const query = search.toLowerCase().trim();
        items = items.filter(
          p => p.name.toLowerCase().includes(query) ||
               p.category.toLowerCase().includes(query) ||
               p.subCategory.toLowerCase().includes(query) ||
               p.description.toLowerCase().includes(query)
        );
      }

      items = items.filter(p => p.price >= minPrice && p.price <= maxPrice);

      if (rating > 0) {
        items = items.filter(p => p.rating >= rating);
      }

      if (sort === 'price-asc') {
        items.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        items.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        items.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'newest') {
        items.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
      }

      const totalCount = items.length;
      const startIndex = (page - 1) * limit;
      const paginatedItems = items.slice(startIndex, startIndex + limit);

      return {
        items: paginatedItems,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit) || 1,
        isMockData: true,
      };
    }
  },

  /**
   * Fetch single product details by ID or slug
   * Expected backend route: GET /api/products/:id
   */
  async getProductById(id) {
    try {
      const res = await apiClient.get(`/products/${id}`);
      const p = res.data || res;
      return { ...p, id: p.id || p.slug || id };
    } catch {
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (!product) {
        throw new Error(`Product with ID "${id}" was not found.`);
      }
      return { ...product, isMockData: true };
    }
  },

  /**
   * Fetch curated categories list
   * Expected backend route: GET /api/categories
   */
  async getCategories() {
    try {
      const res = await apiClient.get('/categories');
      return res.data || res;
    } catch {
      return MOCK_CATEGORIES;
    }
  },

  /**
   * Fetch quick search autocomplete suggestions
   * Expected backend route: GET /api/search/autocomplete?q=...
   */
  async getSearchSuggestions(query) {
    if (!query || query.trim().length < 2) return [];
    try {
      const res = await apiClient.get(`/search/autocomplete?q=${encodeURIComponent(query)}`);
      return res.data || res;
    } catch {
      const q = query.toLowerCase().trim();
      return MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
      ).slice(0, 5);
    }
  },

  /**
   * Fetch trending / featured seasonal pieces
   */
  async getTrendingProducts() {
    try {
      const res = await apiClient.get('/products/trending');
      return res.data || res;
    } catch {
      return MOCK_PRODUCTS.filter(p => p.isTrending || p.isFeatured).slice(0, 4);
    }
  }
};

export default productService;
