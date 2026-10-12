import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Globe, HelpCircle } from 'lucide-react';

export const ShippingPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Logistics & Assurance
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
          Shipping, Delivery & Returns Policy
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Transparent guidelines for orders originating from our European central logistics studio.
        </p>
      </div>

      <div className="space-y-8 divide-y divide-surface-variant text-xs text-on-surface-variant">
        
        {/* Shipping rates */}
        <div className="pt-6 first:pt-0 space-y-3">
          <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
            <Truck className="w-4 h-4 text-primary" />
            <span>Shipping Timelines & Thresholds</span>
          </div>
          <p className="leading-relaxed">
            All orders exceeding <strong>$150.00</strong> unlock complimentary express insured shipping. For orders below this threshold, standard flat-rate delivery is calculated at $15.00 worldwide.
          </p>
          <div className="bg-surface-container p-4 rounded-xl border border-surface-variant space-y-2">
            <div className="flex justify-between font-medium text-on-surface">
              <span>Domestic (US & Canada)</span>
              <span>2 – 3 Business Days via FedEx Priority</span>
            </div>
            <div className="flex justify-between font-medium text-on-surface">
              <span>European Union</span>
              <span>1 – 2 Business Days via DHL Express</span>
            </div>
            <div className="flex justify-between font-medium text-on-surface">
              <span>International Worldwide</span>
              <span>3 – 5 Business Days with DDP tracking</span>
            </div>
          </div>
        </div>

        {/* 30-Day Returns */}
        <div className="pt-6 space-y-3">
          <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
            <RotateCcw className="w-4 h-4 text-primary" />
            <span>30-Day Complimentary Returns</span>
          </div>
          <p className="leading-relaxed">
            We welcome returns on all unworn, unaltered items in their original packaging within 30 days of receipt. A prepaid digital return label is automatically generated via your Customer Account.
          </p>
        </div>

        {/* Warranty */}
        <div className="pt-6 space-y-3">
          <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Artisan Lifetime Guarantee</span>
          </div>
          <p className="leading-relaxed">
            All timepiece movements, leather hardware, and overcoat tailoring are backed by our Atelier Guarantee against structural or assembly defects.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ShippingPage;
