import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Heart, RefreshCcw } from 'lucide-react';

export const EmptyState = ({
  icon = 'search',
  title = 'No items found',
  description = 'Try adjusting your filters or search terms to discover our curated pieces.',
  actionLabel = 'Explore All Products',
  actionLink = '/shop',
  onActionClick = null,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'cart':
        return <ShoppingBag className="w-10 h-10 text-on-surface-variant/70 stroke-[1.5]" />;
      case 'wishlist':
        return <Heart className="w-10 h-10 text-on-surface-variant/70 stroke-[1.5]" />;
      case 'refresh':
        return <RefreshCcw className="w-10 h-10 text-on-surface-variant/70 stroke-[1.5]" />;
      case 'search':
      default:
        return <Search className="w-10 h-10 text-on-surface-variant/70 stroke-[1.5]" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-surface-container rounded-xl border border-surface-variant my-6">
      <div className="w-16 h-16 rounded-full bg-surface border border-surface-variant flex items-center justify-center mb-4 shadow-sm">
        {renderIcon()}
      </div>
      <h3 className="text-base font-semibold text-on-surface mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {onActionClick ? (
        <button
          onClick={onActionClick}
          className="bg-primary text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      ) : actionLink ? (
        <Link
          to={actionLink}
          className="bg-primary text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
};

export default EmptyState;
