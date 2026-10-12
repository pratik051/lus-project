import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchContainerRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Handle autocomplete query
  useEffect(() => {
    let active = true;
    if (searchQuery.trim().length >= 2) {
      productService.getSearchSuggestions(searchQuery).then(results => {
        if (active) {
          setSuggestions(results);
          setIsSearchOpen(true);
        }
      });
    } else {
      setSuggestions([]);
      setIsSearchOpen(false);
    }
    return () => {
      active = false;
    };
  }, [searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!isSearchOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      setIsSearchOpen(false);
      setSearchQuery('');
      navigate(`/product/${selected.id}`);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-surface-variant backdrop-blur-md bg-white/95">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-3.5 max-w-7xl mx-auto">
        
        {/* Mobile menu button + Brand */}
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-on-surface hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle mobile navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-tight text-primary transition-colors">
            LuxStore
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search, Wishlist, Cart, Account */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Search Autocomplete Bar (Desktop) */}
          <div ref={searchContainerRef} className="relative hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container px-3.5 py-1.5 rounded-lg border border-surface-variant focus-within:border-primary transition-all">
              <Search className="w-4 h-4 text-on-surface-variant mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery.trim().length >= 2 && setIsSearchOpen(true)}
                placeholder="Search products..."
                className="bg-transparent border-none focus:outline-none text-on-surface text-sm placeholder:text-on-surface-variant/70 w-36 md:w-52 lg:w-64"
                id="header-search-input"
                aria-label="Search products"
              />
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-surface-variant rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-2.5 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider bg-surface-container border-b border-surface-variant flex justify-between items-center">
                  <span>Suggestions</span>
                  <span className="text-[10px] text-on-surface-variant/70">Press ↵ to view all</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-surface-variant">
                  {suggestions.length > 0 ? (
                    suggestions.map((item, index) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className={`flex items-center gap-3 p-3 transition-colors ${
                          selectedIndex === index ? 'bg-surface-container' : 'hover:bg-surface-container/60'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 object-cover rounded-md border border-surface-variant shrink-0 bg-surface-container"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="text-xs font-medium text-on-surface truncate">{item.name}</h4>
                          <span className="text-[11px] text-on-surface-variant block">{item.category}</span>
                        </div>
                        <span className="text-xs font-semibold text-primary shrink-0">${item.price.toFixed(2)}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-on-surface-variant">
                      No matching products found for "{searchQuery}".
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative p-2 text-on-surface-variant hover:text-primary transition-colors active:scale-95"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-primary fill-primary/20' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Link>

          {/* Cart Icon with badge */}
          <Link
            to="/cart-checkout"
            className="relative p-2 text-on-surface-variant hover:text-primary transition-colors active:scale-95"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Account / Profile */}
          <Link
            to="/account"
            className="flex items-center gap-2 p-1 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="User Account"
          >
            {isAuthenticated && user?.initials ? (
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-semibold text-xs">
                {user.initials}
              </div>
            ) : (
              <div className="p-1 rounded-full hover:bg-surface-container">
                <User className="w-5 h-5" />
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="sm:hidden px-4 pb-3 border-t border-surface-variant/40 pt-2 bg-surface">
        <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container px-3 py-1.5 rounded-lg border border-surface-variant">
          <Search className="w-4 h-4 text-on-surface-variant mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent border-none focus:outline-none text-on-surface text-sm w-full placeholder:text-on-surface-variant/70"
          />
        </form>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-surface-variant bg-surface px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2">
            <Link
              to="/shop"
              className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-surface-container text-on-surface"
            >
              Shop All Products
            </Link>
            <Link
              to="/collections"
              className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-surface-container text-on-surface"
            >
              Curated Collections
            </Link>
            <Link
              to="/about"
              className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-surface-container text-on-surface"
            >
              About LuxStore
            </Link>
            <Link
              to="/wishlist"
              className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-surface-container text-on-surface flex justify-between items-center"
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-surface-container text-on-surface flex justify-between items-center"
            >
              <span>Customer Account</span>
              <span className="text-xs text-primary font-semibold">{user?.firstName || 'Sign In'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
