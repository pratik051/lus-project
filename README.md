# LuxStore — Production React Frontend

**LuxStore** is a human-centered, production-ready e-commerce frontend built upon the **Atelier Commerce** design system and approved Google Stitch designs. Built with React, Vite, Tailwind CSS, Lucide React, and modern Context API architecture.

---

## 1. Quick Start

### Development Server
```bash
npm install
npm run dev
```
Access the application locally at `http://localhost:5173/`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 2. Technology Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router v6 (`react-router-dom`)
- **Styling**: Tailwind CSS configured with Atelier Commerce design tokens & custom Inter typography
- **Icons**: Lucide React + Material Symbols Outlined
- **State Management**: React Context API:
  - `CartContext`: Cart items, quantity controls, promo validation, subtotal, taxes, shipping calculation
  - `WishlistContext`: Wishlist toggles and saved items persistence
  - `AuthContext`: Session management, demo 1-click login, addresses, and customer profile
  - `NotificationContext`: Responsive micro-feedback toasts
- **API Services**: Clean abstraction layer (`apiClient`, `productService`, `authService`, `cartService`, `orderService`) ready for Express + MongoDB integration with seamless client fallback.

---

## 3. Implemented Screen Inventory & Route Mapping

| Route | Screen / Component | Features & Stitch Reference |
|---|---|---|
| `/` | `HomePage` | Curated Essentials storefront, Autumn/Winter Edition 04 banner, Spotlight card, Category directory, Trending products, Atelier values |
| `/shop` | `ProductsPage` | PLP with multi-facet sidebar filters (Categories, Price Slider, Sizes, Colorways, Rating), Sorting, Search query reflection, Shimmer loaders, Empty states |
| `/product/:id` | `ProductDetailPage` | High-res image gallery, thumbnail strip, variant color swatches, size pills, quantity selector, add to bag, buy now, accordions, mobile sticky purchase bar, related pairings |
| `/search` | `SearchPage` | Dedicated search query results with live suggestions, count reflection, and reset actions |
| `/cart-checkout` | `CartCheckoutPage` | Shopping bag management, free shipping threshold indicator, promo code discounts (`ATELIER10`, `WELCOME20`), shipping address form, payment method cards, simulated 256-bit SSL tokenization |
| `/order-confirmation/:orderId` | `OrderConfirmationPage` | Order reference number, courier tracking stepper, item breakdown, and sandbox demonstration disclosure |
| `/account` | `AccountPage` | Customer Dashboard: Profile Management, Order History & Parcel Tracking, Saved Addresses modal, Wishlist Items grid, Customer Support Concierge |
| `/login` | `LoginPage` | Member sign-in with 1-click reviewer demo login ("Login as Jane Doe") and validation |
| `/register` | `RegisterPage` | Member registration form with password confirmation and terms |
| `/forgot-password` | `ForgotPasswordPage` | Account password recovery interface |
| `/collections` | `CollectionsPage` | Curated capsules (Edition 04, Horology, Tuscan Leatherware, Monolithic Living) |
| `/about` | `AboutPage` | Brand provenance, European artisan workshops, and sustainability ethos |
| `/shipping` | `ShippingPage` | Transparent global shipping policies, 30-day returns, and lifetime guarantee |
| `/contact` | `ContactPage` | Client advisory desk inquiries and studio contact details |

---

## 4. Design System Tokens (Atelier Commerce)

- **Surface Background**: `#FFFFFF` / `bg-surface`
- **Secondary Background**: `#F6F6F4` / `bg-surface-container`
- **Primary Text**: `#202020` / `text-on-surface`
- **Secondary Text**: `#707070` / `text-on-surface-variant`
- **Structural Borders**: `#E5E5E5` / `border-surface-variant`
- **Primary Action**: `#2457C5` / `bg-primary` (hover: `#1946A3`)
- **Accent Feedback**: `#267347` (Success / Free Shipping), `#B42318` (Error / Promo discount)
- **Typography**: Inter (`font-sans`), tracked out for labels and geometric hierarchy.

---

## 5. Backend Integration Contracts (MERN Architecture)

When connecting your Express.js and MongoDB backend, point `VITE_API_BASE_URL` in `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Expected backend endpoints documented in `src/services/`:
- `GET /api/products` — Filterable product catalog (`category`, `q`, `sort`, `minPrice`, `maxPrice`, `rating`)
- `GET /api/products/:id` — Single product details with variants, images, and inventory
- `GET /api/search/autocomplete?q=...` — Live suggestions
- `POST /api/auth/login` & `POST /api/auth/register` — JWT authentication
- `POST /api/orders` — Order creation and transaction verification
- `GET /api/orders` — Customer order history and shipment tracking
# lus-project
