import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { productService } from '../../services/productService';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductGridSkeleton } from '../../components/common/LoadingSkeleton';
import { EmptyState } from '../../components/common/EmptyState';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInputValue(query);
    setIsLoading(true);
    let mounted = true;

    productService.getProducts({ search: query, limit: 20 })
      .then(res => {
        if (mounted) {
          setProducts(res.items);
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow w-full">
      
      {/* Header with Search Input */}
      <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Catalog Search
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Search across apparel, footwear, leather goods, and interior accents.
        </p>

        <form onSubmit={handleSubmit} className="relative flex items-center mt-4">
          <Search className="w-5 h-5 text-on-surface-variant absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a product name, color, or material..."
            className="w-full pl-12 pr-28 py-3.5 rounded-xl border border-surface-variant bg-surface text-sm text-on-surface focus:outline-none focus:border-primary shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Header */}
      {query && (
        <div className="flex justify-between items-center pb-4 border-b border-surface-variant mb-6 text-xs text-on-surface-variant">
          <span>
            Search results for <strong className="text-on-surface">"{query}"</strong>
          </span>
          <span>{products.length} {products.length === 1 ? 'match' : 'matches'} found</span>
        </div>
      )}

      {/* Grid or Empty State */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title={`No results found for "${query}"`}
          description="We couldn't find any products matching your query. Try searching for 'overcoat', 'chronograph', 'tote', or 'linen'."
          actionLabel="Explore All Products"
          actionLink="/shop"
        />
      )}

    </div>
  );
};

export default SearchPage;
