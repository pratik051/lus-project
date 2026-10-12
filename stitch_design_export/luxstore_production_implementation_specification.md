# LuxStore: Production Implementation Specification & Developer Hand-off

This document serves as the formal engineering and UX hand-off specification for **LuxStore**, a human-centered, premium e-commerce platform built upon the **Atelier Commerce** design system.

---

## 1. Project Screen Inventory & Mapping

| Screen ID | Title | Device | Primary Purpose & Route |
|---|---|---|---|
| `{{DATA:SCREEN:SCREEN_15}}` | LuxStore - Curated Essentials | Desktop (`/`) | Brand storefront, curated categories, trending items |
| `{{DATA:SCREEN:SCREEN_8}}` | LuxStore - Curated Essentials | Desktop (`/`) | (Alternative view / reference layout) |
| `{{DATA:SCREEN:SCREEN_14}}` | Shop All Products - LuxStore | Desktop (`/shop`) | Product Listing Page (PLP) with multi-facet sidebar filters |
| `{{DATA:SCREEN:SCREEN_10}}` | Shop All Products - LuxStore | Desktop (`/shop`) | (Alternative PLP pagination state) |
| `{{DATA:SCREEN:SCREEN_9}}` | Minimalist Leather Tote - LuxStore | Desktop (`/product/:id`) | Product Detail Page (PDP) with high-res gallery, specs, reviews |
| `{{DATA:SCREEN:SCREEN_13}}` | Minimalist Leather Tote - LuxStore | Desktop (`/product/:id`) | (Alternative PDP variant state) |
| `{{DATA:SCREEN:SCREEN_7}}` | Cart & Checkout - LuxStore | Desktop (`/cart-checkout`) | Multi-item cart management, shipping, payment, order summary |
| `{{DATA:SCREEN:SCREEN_12}}` | Cart & Checkout - LuxStore | Desktop (`/cart-checkout`) | (Alternative cart state / promo code applied) |
| `{{DATA:SCREEN:SCREEN_6}}` | My Account & Orders - LuxStore | Desktop (`/account`) | Customer Dashboard, profile, order history, saved addresses |
| `{{DATA:SCREEN:SCREEN_11}}` | My Account & Orders - LuxStore | Desktop (`/account`) | (Alternative account tab state) |
| `{{DATA:SCREEN:SCREEN_4}}` | Shop All Products - LuxStore (Mobile) | Mobile (`/shop`) | Mobile PLP with sticky filter/sort bar & 2-column grid |
| `{{DATA:SCREEN:SCREEN_5}}` | Minimalist Precision Chronograph (Mobile) | Mobile (`/product/:id`) | Mobile PDP with sticky bottom purchase bar & accordion details |
| `{{DATA:SCREEN:SCREEN_2}}` | Cart & Checkout - LuxStore (Mobile) | Mobile (`/cart-checkout`) | Mobile single-column checkout flow & collapsible summary |

---

## 2. Design System Tokens (`Atelier Commerce`)

### Colors (Tailwind / CSS Variables)
* **Surface Background (`bg-surface`)**: `#faf8ff` / `#FFFFFF`
* **Surface Dim (`bg-surface-dim`)**: `#d9d9e3` / `#F6F6F4`
* **Surface Container Low (`bg-surface-container-low`)**: `#f3f3fd` / `#FAFAFA`
* **Primary Text / On-Surface**: `#202020` (Dark Charcoal)
* **Secondary Text (`text-on-surface-variant`)**: `#707070` (Muted Gray)
* **Borders & Dividers**: `#E5E5E5` / `#d9d9e3`
* **Primary Brand Accent (`text-primary` / `bg-primary`)**: `#2457c5` (Restrained Muted Blue)

### Typography
* **Font Family**: Inter (`font-sans`)
* **Headlines**: `text-headline-sm font-headline-sm` to `text-headline-lg font-headline-lg`
* **Body**: `text-body-sm font-body-sm` / `text-body-md`
* **Labels**: `text-label-md font-label-md`

### Component Roundness & Elevation
* **Corner Radius**: `rounded-lg` (4px / `ROUND_FOUR`) for form controls, buttons, and product cards.
* **Shadows & Elevation**: Flat, no heavy shadows (`shadow-none`), relying on clean 1px borders (`border border-surface-variant`) for structural separation.

---

## 3. Component Specifications & Interactive States

### Top Navigation Bar (`TopNavBar`)
* **Layout**: Flex container (`justify-between items-center w-full max-w-7xl mx-auto px-gutter py-md`).
* **Elements**: Brand logo, primary links (`Shop`, `Collections`, `About`), live search autocomplete input (`w-72` with search icon), Wishlist icon button with counter, Cart icon button with item badge (`2`), User account avatar/initials (`JD`).
* **Interactive State - Search Autocomplete**:
  * Triggered on `input` event when typing ≥ 2 characters.
  * Dropdown container appears instantly below the input with product thumbnails, titles, categories, and prices.
  * Keyboard navigation: Arrow Down/Up to highlight, Enter to select/navigate, Escape to dismiss.

### Product Card (`ProductCard`)
* **Layout**: Vertical card with image container, category tag, product title, star rating, and price.
* **Interactive States**:
  * **Default**: Clean border, hover subtle scale or image zoom.
  * **Discount Badge**: Red pill (`bg-red-500 text-white text-xs px-2 py-0.5 rounded`) showing discount percentage (e.g., `-20%`).
  * **Wishlist Action**: Top-right heart icon button with active toggle state (`fill-primary` when saved).
  * **Quick Add**: Optional inline "+ Add to Cart" action button on hover/tap.

### Buttons & Form Controls
* **Primary Button**: `bg-primary text-white hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 py-3 px-6 rounded-lg font-medium`.
* **Secondary / Outline Button**: `border border-surface-variant text-primary hover:bg-surface-container-low py-3 px-6 rounded-lg font-medium`.
* **Input Fields**: `bg-surface border border-surface-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`.

---

## 4. Complete Customer Journey & Edge States

### 1. Discovery & Search
* **Loading State**: Shimmer skeleton loaders matching the 3-column desktop / 2-column mobile product grid dimensions.
* **Empty Search / Filter State**: Friendly prompt (*"No products match your selected filters"*), CTA button to `"Reset All Filters"`, and top trending category suggestions.

### 2. Product Detail Page (PDP)
* **Variant Selection**: Color swatches (e.g., Matte Black, Brushed Steel) update the active thumbnail gallery and SKU state immediately. Size/Diameter pill buttons toggle active styling (`border-2 border-primary bg-primary/5`).
* **Unavailable / Out of Stock State**: Disables the *"Add to Cart"* button, displays explicit red badge (*"Currently Out of Stock — Notify Me"*).

### 3. Cart & Checkout Flow
* **Quantity Controls**: `-` and `+` buttons update subtotal in real-time without full page reloads.
* **Empty Cart State**: Encouraging prompt (*"Your shopping bag is empty"*), CTA button `"Explore New Arrivals"` linked to `/shop`.
* **Form Validation**: Inline error messages under required address and payment fields (e.g., *"Valid postal code required"*).
* **Payment Processing State**: Loading spinner inside the `"Complete Secure Order"` button during simulated 256-bit SSL tokenization.
* **Order Confirmation State**: Success screen displaying order reference ID, item breakdown, estimated delivery dates, and tracking summary.

---

## 5. Data Architecture & Backend API Requirements

| Endpoint / Service | Method | Payload / Parameters | Response Data Structure |
|---|---|---|---|
| `/api/products` | `GET` | `category`, `sort`, `min_price`, `max_price`, `page` | `items[]`, `total_count`, `current_page`, `filters` |
| `/api/products/:id` | `GET` | `id` | Product details, variants, images[], reviews[], stock_status |
| `/api/search/autocomplete` | `GET` | `q` (query string) | Array of matching products (thumbnail, title, price, url) |
| `/api/cart` | `GET`, `POST`, `DELETE` | Cart item ID, quantity | Cart items[], subtotal, taxes, shipping fee |
| `/api/checkout` | `POST` | Shipping address, billing, payment token, items | Order reference, transaction status, receipt data |
| `/api/user/orders` | `GET` | User bearer token | List of past/active orders with tracking timeline |

---

## 6. Developer Implementation Checklist

1. **Frontend Framework Setup**: Initialize React / Next.js / Vue project with Tailwind CSS configured with the Atelier Commerce color palette (`#2457C5`, `#FAFAFA`, `#202020`).
2. **Component Library**: Build atomic components (`TopNavBar`, `Footer`, `ProductCard`, `Button`, `Input`, `Accordion`, `Modal`).
3. **Routing & Views**: Implement routes for Homepage, PLP, PDP, Cart/Checkout, and User Dashboard for both desktop and mobile viewports.
4. **Search Autocomplete**: Implement debounced API calls for real-time search suggestions with keyboard accessibility (ARIA attributes).
5. **Form Validation & State**: Integrate client-side validation (Zod + React Hook Form) for checkout address and credit card inputs.
6. **Responsive Testing**: Verify mobile touch targets (≥44px), sticky purchase bars on mobile PDPs, and off-canvas filter drawers on mobile PLPs.
7. **Accessibility (WCAG 2.2 AA)**: Ensure sufficient color contrast ratios, focus visible states, and alt text for all product photography.
