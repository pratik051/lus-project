import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/Home/HomePage';
import { ProductsPage } from './pages/Products/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetails/ProductDetailPage';
import { CartCheckoutPage } from './pages/Cart/CartCheckoutPage';
import { OrderConfirmationPage } from './pages/Orders/OrderConfirmationPage';
import { AccountPage } from './pages/Account/AccountPage';
import { SearchPage } from './pages/Search/SearchPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { AboutPage } from './pages/Information/AboutPage';
import { CollectionsPage } from './pages/Information/CollectionsPage';
import { ShippingPage } from './pages/Information/ShippingPage';
import { ContactPage } from './pages/Information/ContactPage';

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);
  return null;
}

// 404 Fallback
function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
      <span className="text-4xl font-bold text-primary block">404</span>
      <h1 className="text-xl font-bold text-on-surface">Page Not Found</h1>
      <p className="text-xs text-on-surface-variant">
        The piece or screen you are looking for does not exist or has been relocated.
      </p>
      <Link
        to="/"
        className="inline-block bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
      >
        Return to LuxStore Storefront
      </Link>
    </div>
  );
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary selection:text-white">
      <ScrollToTop />
      <Header />
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Navigate to="/cart-checkout" replace />} />
          <Route path="/cart-checkout" element={<CartCheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/wishlist" element={<Navigate to="/account?tab=wishlist" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
