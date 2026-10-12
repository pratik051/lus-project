import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useNotification();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(
      isFavorited
        ? `Removed ${product.name} from wishlist.`
        : `Added ${product.name} to wishlist.`
    );
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart.`);
  };

  return (
    <div className="group bg-surface rounded-xl border border-surface-variant overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-primary/80 shadow-none hover:shadow-sm">
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badge (Discount / New / Spotlight) */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-semibold px-2 py-0.5 rounded">
            {product.discount}
          </span>
        )}
        {!product.discount && product.badge && (
          <span className="absolute top-3 left-3 bg-surface-container-high text-on-surface text-[11px] font-semibold px-2 py-0.5 rounded border border-surface-variant">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
            isFavorited
              ? 'bg-surface text-primary shadow-sm'
              : 'bg-surface/85 text-on-surface-variant hover:text-primary shadow-none'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
        </button>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-surface">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant block mb-1">
            {product.category}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-semibold text-on-surface hover:text-primary transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          {product.rating && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-on-surface-variant">
              <div className="flex text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
              </div>
              <span className="font-medium text-[11px]">{product.rating}</span>
              <span className="text-[10px] text-on-surface-variant/70">({product.reviewCount})</span>
            </div>
          )}
        </div>

        {/* Price & Quick Add Button */}
        <div className="flex items-center justify-between pt-2.5 border-t border-surface-variant">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-on-surface-variant/70 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="p-1.5 bg-surface-container hover:bg-primary hover:text-white text-on-surface rounded-lg transition-all active:scale-95 border border-surface-variant hover:border-primary"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
