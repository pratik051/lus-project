import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Award, Feather, ShieldCheck } from 'lucide-react';
import { ProductCard } from '../../components/products/ProductCard';
import { productService } from '../../services/productService';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      productService.getTrendingProducts(),
      productService.getCategories()
    ]).then(([trending, cats]) => {
      if (mounted) {
        setTrendingProducts(trending);
        setCategories(cats || MOCK_CATEGORIES);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-16">
      
      {/* 1. Hero Promotion Banner (Matching Stitch Screen 15) */}
      <section className="border-b border-surface-variant bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="md:col-span-7 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Edition 04 — Autumn / Winter
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface leading-[1.15] max-w-xl">
                Understated essentials for everyday living, crafted with quiet intention.
              </h1>

              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-lg">
                An editorial collection of unhurried apparel, footwear, and objects made from resilient organic textiles and vegetable-tanned leathers.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/shop"
                  className="bg-primary text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-lg hover:bg-primary-hover transition-all duration-200 shadow-sm flex items-center gap-2 active:scale-95"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/collections"
                  className="text-on-surface text-xs sm:text-sm font-medium px-5 py-3 border border-surface-variant rounded-lg hover:border-on-surface-variant transition-all duration-200 active:scale-95"
                >
                  Explore Lookbook
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4 text-xs text-on-surface-variant border-t border-surface-variant w-full max-w-lg">
                <span>Overcoat Series</span>
                <span>•</span>
                <span>Italian Cashmere</span>
                <span>•</span>
                <span>Artisan Stoneware</span>
              </div>
            </div>

            {/* Right Spotlight Product Card */}
            <div className="md:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-surface-variant bg-surface-container shadow-sm group">
                <div
                  className="h-72 sm:h-80 md:h-96 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrHltshVXpcVqGoUSnmceOy6iqwuitJljwhez3N6oslZdue_U1L3s3bP9mnSBpzh91ZCaiWvO5piYG5ErZAvdZM56uO783cV0-v6DV7F9nWKz0rbLGhB4T_UFpdcgmf01lgmU5IhW5XCBBCvE4N6qN48EfGZWgkP3h5INq1GrElKKJPel87m5e4h_dFmt2V-XIfq7yiaPMwKTjithDxJXI94KmJIFuDuIGHRKk6PNJxepWie5QMxTxtw')`,
                  }}
                />
                <div className="p-4 bg-surface border-t border-surface-variant flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block">
                      Spotlight Feature
                    </span>
                    <h4 className="text-sm font-semibold text-on-surface">Double-Breasted Wool Coat</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary">$380.00</span>
                    <span className="text-[10px] text-on-surface-variant block">Charcoal Grey</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Curated Categories (Matching Stitch Screen 15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end border-b border-surface-variant pb-3.5 mb-6">
          <div>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
              Department Directory
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
              Curated Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <span>View Complete Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group relative h-64 sm:h-72 rounded-xl overflow-hidden border border-surface-variant bg-surface flex flex-col justify-end p-5 transition-all duration-200 hover:border-primary/80 shadow-none hover:shadow-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-wider block text-white/80 font-medium">
                  {cat.tagline}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white mt-0.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/75 mt-0.5">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Seasonal Pieces (Matching Stitch Screen 15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end border-b border-surface-variant pb-3.5 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
              Trending Products
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Most desired pieces this season across wardrobe and living
            </p>
          </div>
          <Link
            to="/shop?sort=rating"
            className="text-xs sm:text-sm text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <span>Explore All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-80 bg-surface rounded-xl border border-surface-variant skeleton-shimmer" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Atelier Values Section */}
      <section className="bg-surface-container border-y border-surface-variant py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
              Quiet Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
              Engineered with human-centered care
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2">
              Every garment and object in LuxStore adheres to our four core design commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-on-surface">Organic Natural Fibers</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                From Normandy flax to non-mulesed Australian Merino, our materials are selected for breathability, longevity, and biodegradable purity.
              </p>
            </div>

            <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-on-surface">Vegetable Tanned Leather</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Tanned in Tuscany using chestnut and mimosa barks without toxic chromium salts, developing a rich organic patina over decades of wear.
              </p>
            </div>

            <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-on-surface">Honest Pricing</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct partnerships with master workshops across Portugal and Italy eliminate excessive distributor markups.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
