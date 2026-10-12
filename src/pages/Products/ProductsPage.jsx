import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductGridSkeleton } from '../../components/common/LoadingSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { productService } from '../../services/productService';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentSearch = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Client Filter States
  const [selectedCategories, setSelectedCategories] = useState(
    currentCategory !== 'all' ? [currentCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [minRating, setMinRating] = useState(0);

  // Mobile Filter Drawer
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Synchronize URL category changes
  useEffect(() => {
    if (currentCategory && currentCategory !== 'all') {
      setSelectedCategories([currentCategory]);
    } else {
      setSelectedCategories([]);
    }
  }, [currentCategory]);

  // Fetch / filter products
  useEffect(() => {
    setIsLoading(true);
    let active = true;

    productService.getProducts({
      category: selectedCategories.length === 1 ? selectedCategories[0] : 'all',
      search: currentSearch,
      sort: currentSort,
      minPrice: 0,
      maxPrice: maxPrice,
      rating: minRating,
      limit: 24
    }).then(response => {
      if (!active) return;
      let filtered = response.items;

      // Multi-category filtering
      if (selectedCategories.length > 1) {
        filtered = filtered.filter(p =>
          selectedCategories.some(c =>
            p.category.toLowerCase().includes(c.toLowerCase()) ||
            p.subCategory.toLowerCase().includes(c.toLowerCase())
          )
        );
      }

      // Size filtering
      if (selectedSizes.length > 0) {
        filtered = filtered.filter(p =>
          p.sizes?.some(s => selectedSizes.some(sel => s.includes(sel)))
        );
      }

      // Color filtering
      if (selectedColor) {
        filtered = filtered.filter(p =>
          p.colors?.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()))
        );
      }

      setProducts(filtered);
      setTotalCount(filtered.length);
      setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, [selectedCategories, currentSort, currentSearch, maxPrice, selectedSizes, selectedColor, minRating]);

  const handleCategoryToggle = (catSlug) => {
    setSelectedCategories(prev => {
      const next = prev.includes(catSlug)
        ? prev.filter(c => c !== catSlug)
        : [...prev, catSlug];
      return next;
    });
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(1000);
    setSelectedSizes([]);
    setSelectedColor(null);
    setMinRating(0);
    const params = new URLSearchParams();
    setSearchParams(params);
  };

  const activeFilterCount =
    selectedCategories.length +
    (maxPrice < 1000 ? 1 : 0) +
    selectedSizes.length +
    (selectedColor ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const filterSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const filterColors = [
    { name: 'Black', hex: '#191B22' },
    { name: 'Grey', hex: '#D1D5DB' },
    { name: 'Navy', hex: '#1B243B' },
    { name: 'Tan', hex: '#C29B72' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-grow w-full">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-4">
        <Link to="/" className="hover:underline hover:text-on-surface">Home</Link>
        <span>/</span>
        <span className="text-on-surface font-medium">Shop</span>
        {currentSearch && (
          <>
            <span>/</span>
            <span className="text-primary font-medium">Search: "{currentSearch}"</span>
          </>
        )}
      </nav>

      {/* Header Info & Sort Controls (Matching Stitch Screen 14) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-surface-variant mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            {currentCategory !== 'all'
              ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Collection`
              : 'New Arrivals & Essentials'}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Showing {products.length} {products.length === 1 ? 'item' : 'items'} with restrained minimalist aesthetic.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg border border-surface-variant bg-surface text-xs font-medium text-on-surface"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-medium text-on-surface-variant whitespace-nowrap hidden sm:inline">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={currentSort}
                onChange={handleSortChange}
                className="appearance-none bg-surface border border-surface-variant text-on-surface text-xs rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-primary font-medium cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Additions</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-on-surface-variant font-medium">Applied:</span>
          {selectedCategories.map(cat => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-surface-container border border-surface-variant text-on-surface font-medium"
            >
              Category: {cat}
              <button onClick={() => handleCategoryToggle(cat)} className="hover:text-primary">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {maxPrice < 1000 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-surface-container border border-surface-variant text-on-surface font-medium">
              Under ${maxPrice}
              <button onClick={() => setMaxPrice(1000)} className="hover:text-primary">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSizes.map(size => (
            <span
              key={size}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-surface-container border border-surface-variant text-on-surface font-medium"
            >
              Size: {size}
              <button onClick={() => handleSizeToggle(size)} className="hover:text-primary">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedColor && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-surface-container border border-surface-variant text-on-surface font-medium">
              Color: {selectedColor}
              <button onClick={() => setSelectedColor(null)} className="hover:text-primary">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-surface-container border border-surface-variant text-on-surface font-medium">
              Rating: {minRating}+ Stars
              <button onClick={() => setMinRating(0)} className="hover:text-primary">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-primary underline hover:text-primary-hover font-medium ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar (Matching Stitch Screen 14) */}
        <aside className="hidden lg:block lg:col-span-1 bg-surface border border-surface-variant p-6 rounded-xl sticky top-20 space-y-6">
          <div className="flex items-center justify-between pb-3.5 border-b border-surface-variant">
            <h2 className="text-base font-semibold text-on-surface">Filters</h2>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-primary underline hover:text-primary-hover"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="pb-6 border-b border-surface-variant">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">
              Categories
            </h3>
            <div className="space-y-2.5">
              {MOCK_CATEGORIES.map(cat => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 text-xs text-on-surface-variant cursor-pointer hover:text-on-surface"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => handleCategoryToggle(cat.slug)}
                    className="rounded border-surface-variant text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pb-6 border-b border-surface-variant">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">
              Price Range
            </h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary h-1 bg-surface-container rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>$0</span>
                <span className="font-semibold text-primary">${maxPrice}</span>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="pb-6 border-b border-surface-variant">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">
              Sizes
            </h3>
            <div className="flex flex-wrap gap-2">
              {filterSizes.map(size => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-surface-container border border-surface-variant text-on-surface hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="pb-6 border-b border-surface-variant">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">
              Colorway
            </h3>
            <div className="flex items-center gap-3">
              {filterColors.map(color => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(isSelected ? null : color.name)}
                    aria-label={color.name}
                    className={`w-6 h-6 rounded-full border border-surface-variant transition-all ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">
              Minimum Rating
            </h3>
            <div className="space-y-2">
              {[4.8, 4.5].map(rating => (
                <label
                  key={rating}
                  className="flex items-center gap-2.5 text-xs text-on-surface-variant cursor-pointer hover:text-on-surface"
                >
                  <input
                    type="radio"
                    name="min-rating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                    onClick={() => {
                      if (minRating === rating) setMinRating(0);
                    }}
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>★ {rating}+ Stars</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area (3 cols desktop, 2 cols mobile) */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <ProductGridSkeleton count={6} />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products match your selected filters"
              description="Try adjusting your category, price range, or color criteria to view available pieces in our catalog."
              actionLabel="Reset All Filters"
              onActionClick={handleResetFilters}
            />
          )}
        </div>

      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-surface h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-surface-variant mb-6">
                <h3 className="text-base font-bold text-on-surface">Filters</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1 text-on-surface-variant">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">Categories</h4>
                <div className="space-y-2">
                  {MOCK_CATEGORIES.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => handleCategoryToggle(cat.slug)}
                        className="rounded border-surface-variant text-primary focus:ring-primary"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-2">Max Price: ${maxPrice}</h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {filterSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        selectedSizes.includes(size)
                          ? 'bg-primary text-white'
                          : 'bg-surface-container border border-surface-variant'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-variant flex gap-3">
              <button
                onClick={handleResetFilters}
                className="w-1/2 py-2.5 rounded-lg border border-surface-variant text-xs font-medium text-on-surface"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-1/2 py-2.5 rounded-lg bg-primary text-white text-xs font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsPage;
