import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for subscribing to LuxStore Gazettes.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-surface-container border-t border-surface-variant text-on-surface mt-auto">
      {/* Value Proposition Bar */}
      <div className="border-b border-surface-variant bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <Truck className="w-5 h-5 text-primary shrink-0" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface">Complimentary Express Shipping</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">On all domestic orders over $150</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-primary shrink-0" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface">30-Day Effortless Returns</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">Prepaid return label enclosed in every box</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface">Artisan Lifetime Guarantee</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">Ethically sourced European textiles & leather</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Editorial Newsletter */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-primary">
              LuxStore
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
              An editorial commerce atelier dedicated to understated essentials, crafted with quiet intention, timeless geometry, and sustainable European materials.
            </p>
            
            <form onSubmit={handleSubscribe} className="mt-2 flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for private editions..."
                required
                className="bg-surface border border-surface-variant rounded-lg px-3.5 py-2.5 text-xs text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary flex-grow"
              />
              <button
                type="submit"
                className="bg-primary text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <span className="text-[11px] text-on-surface-variant/80">
              Zero spam. Dispatched bi-weekly with seasonal releases and craft essays.
            </span>
          </div>

          {/* Catalog Columns */}
          <div className="md:col-span-2 col-span-6">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3.5">Shop</h5>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li><Link to="/shop?category=apparel" className="hover:text-primary transition-colors">Apparel & Outerwear</Link></li>
              <li><Link to="/shop?category=footwear" className="hover:text-primary transition-colors">Footwear</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-primary transition-colors">Leather & Accessories</Link></li>
              <li><Link to="/shop?category=home-living" className="hover:text-primary transition-colors">Home & Living</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">All New Arrivals</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 col-span-6">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3.5">Client Care</h5>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li><Link to="/account?tab=orders" className="hover:text-primary transition-colors">Track Shipment</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/account" className="hover:text-primary transition-colors">Customer Account</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Concierge & Inquiries</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary transition-colors">Saved Wishlist</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 col-span-12">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-on-surface mb-3.5">The Atelier</h5>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li><Link to="/about" className="hover:text-primary transition-colors">Design System & Philosophy</Link></li>
              <li><Link to="/collections" className="hover:text-primary transition-colors">Seasonal Lookbook (Edition 04)</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Responsible Materials Matrix</Link></li>
              <li><span className="text-on-surface-variant/70">Atelier Studio: Via Sant'Andrea, Milan</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-surface-variant mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <p>© 2026 LuxStore. Engineered on the Atelier Commerce architecture. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/shipping" className="hover:text-primary transition-colors">Security Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
