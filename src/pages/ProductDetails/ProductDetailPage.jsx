import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import { ProductCard } from '../../components/products/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useNotification();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variant States
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Accordion Toggles
  const [openSections, setOpenSections] = useState({
    details: true,
    specs: false,
    care: false,
    shipping: false
  });

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    let mounted = true;

    productService.getProductById(id)
      .then(data => {
        if (!mounted) return;
        setProduct(data);
        setSelectedImage(0);
        setSelectedColor(data.colors?.[0] || null);
        setSelectedSize(data.sizes?.[0] || null);
        setQuantity(1);

        // Fetch related products
        productService.getProducts({ category: data.category, limit: 4 })
          .then(res => {
            if (mounted) {
              setRelatedProducts(res.items.filter(p => p.id !== data.id).slice(0, 4));
            }
          });

        setIsLoading(false);
      })
      .catch(err => {
        if (mounted) {
          setError(err.message || 'Product not found');
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 h-[500px] bg-surface rounded-xl border border-surface-variant skeleton-shimmer" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-6 w-1/3 skeleton-shimmer rounded" />
            <div className="h-10 w-3/4 skeleton-shimmer rounded" />
            <div className="h-6 w-1/4 skeleton-shimmer rounded" />
            <div className="h-32 w-full skeleton-shimmer rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-on-surface mb-2">Product Not Found</h2>
        <p className="text-sm text-on-surface-variant mb-6">
          The requested item may have been archived or moved.
        </p>
        <Link
          to="/shop"
          className="bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-primary-hover"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    addToast(`Added ${quantity}x "${product.name}" to your cart.`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/cart-checkout');
  };

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-6">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:underline">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-on-surface font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Matching Stitch Screen 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Gallery (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Active Main View */}
          <div className="relative w-full h-[400px] sm:h-[520px] md:h-[600px] bg-surface-container rounded-xl overflow-hidden border border-surface-variant group">
            <img
              src={images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {product.discount && (
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {product.discount}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-surface/85 backdrop-blur-md text-on-surface hover:text-primary transition-all active:scale-95 shadow-sm"
              aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-surface-variant hover:border-on-surface-variant/50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Column (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Header & Subtitle */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              LuxStore {product.subCategory || product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface mt-1">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
              ))}
            </div>
            <span className="text-xs text-on-surface font-semibold">{product.rating}</span>
            <span className="text-xs text-on-surface-variant">({product.reviewCount} verified reviews)</span>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pt-3 border-t border-surface-variant">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-on-surface-variant line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">
                Save ${((product.originalPrice || 0) - product.price).toFixed(0)}
              </span>
            )}
          </div>

          {/* Stock Availability Pill */}
          <div className="flex items-center gap-2 text-xs font-medium text-tertiary bg-surface-container px-3.5 py-2.5 rounded-lg border border-surface-variant">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#267347]" />
            <span>In Stock — Ships within 24 hours in signature eco-packaging</span>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface block">
                Selected Color: <span className="font-normal text-on-surface-variant">{selectedColor?.name}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map(col => {
                  const isSelected = selectedColor?.name === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      aria-label={col.name}
                      className={`w-7 h-7 rounded-full border border-surface-variant transition-all ${
                        isSelected ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Size / Fit Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-on-surface">
                  Size / Format: <span className="font-normal text-on-surface-variant">{selectedSize}</span>
                </label>
                <button className="text-[11px] text-primary underline hover:text-primary-hover">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-container border border-surface-variant text-on-surface hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-surface-variant rounded-lg overflow-hidden bg-surface">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2.5 hover:bg-surface-container text-on-surface transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-xs font-semibold text-on-surface">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2.5 hover:bg-surface-container text-on-surface transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Primary Button */}
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-primary text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-lg hover:bg-primary-hover transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-surface-container hover:bg-surface-container-high border border-surface-variant text-on-surface text-xs sm:text-sm font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Instant Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Note */}
          <div className="flex items-start gap-3 p-3.5 bg-surface-container rounded-xl border border-surface-variant text-xs text-on-surface">
            <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Complimentary Express Shipping</span>
              <span className="text-on-surface-variant text-[11px]">
                Estimated delivery in 2-3 business days. Free returns within 30 days.
              </span>
            </div>
          </div>

          {/* Accordion Panels for Details, Specifications, Care */}
          <div className="border-t border-surface-variant divide-y divide-surface-variant text-xs">
            
            {/* Features & Details */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('details')}
                className="w-full flex justify-between items-center text-xs font-semibold text-on-surface hover:text-primary transition-colors text-left"
              >
                <span>Features & Tailoring</span>
                {openSections.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSections.details && (
                <ul className="mt-2.5 space-y-1.5 text-on-surface-variant pl-4 list-disc">
                  {product.features?.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                  <li>SKU: {product.sku || 'LX-ED4-STD'}</li>
                </ul>
              )}
            </div>

            {/* Materials & Care */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('care')}
                className="w-full flex justify-between items-center text-xs font-semibold text-on-surface hover:text-primary transition-colors text-left"
              >
                <span>Materials & Maintenance</span>
                {openSections.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSections.care && (
                <div className="mt-2.5 space-y-2 text-on-surface-variant">
                  <p><strong>Composition:</strong> {product.materials}</p>
                  <p><strong>Care Instructions:</strong> {product.care}</p>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="py-3.5">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex justify-between items-center text-xs font-semibold text-on-surface hover:text-primary transition-colors text-left"
              >
                <span>Shipping & Complimentary Returns</span>
                {openSections.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSections.shipping && (
                <div className="mt-2.5 space-y-2 text-on-surface-variant">
                  <p>{product.shipping}</p>
                  <p>Dispatched from our European central logistics center in Milan. Orders are tracked with end-to-end SMS notifications.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Sticky Mobile Purchase Bar (Matching Stitch Screen 5 Mobile Specification) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-surface-variant p-3 px-4 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs text-on-surface-variant block font-medium">Total</span>
          <span className="text-base font-bold text-primary">${(product.price * quantity).toFixed(2)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-hover active:scale-95 flex items-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>

      {/* Recommended / Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-24 pt-10 border-t border-surface-variant">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
                Harmonious Pairings
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface mt-0.5">
                Complete the Look
              </h2>
            </div>
            <Link to="/shop" className="text-xs text-primary font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetailPage;
