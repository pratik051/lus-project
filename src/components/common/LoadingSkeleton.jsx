import React from 'react';

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-surface rounded-xl border border-surface-variant overflow-hidden flex flex-col justify-between"
        >
          <div className="aspect-[4/5] skeleton-shimmer w-full" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-1/3 skeleton-shimmer rounded" />
            <div className="h-4 w-3/4 skeleton-shimmer rounded" />
            <div className="h-3 w-1/4 skeleton-shimmer rounded" />
            <div className="pt-2 border-t border-surface-variant flex justify-between items-center">
              <div className="h-4 w-16 skeleton-shimmer rounded" />
              <div className="h-8 w-8 skeleton-shimmer rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
