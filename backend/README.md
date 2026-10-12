# LuxStore E-Commerce Backend — MERN Architecture

LuxStore is a high-performance, secure, and production-grade Node.js, Express, and MongoDB backend supporting the LuxStore luxury e-commerce application.

---

## 1. Architecture & Design Principles

- **Framework**: Node.js (ES Modules) with Express.js.
- **Database**: MongoDB with Mongoose ODM (strict schema validation, compound indexes, lean queries, virtual fields).
- **API Standard**: RESTful endpoints mounted under both `/api/v1` and `/api` (for seamless frontend compatibility).
- **Separation of Concerns**:
  - `controllers/`: HTTP handling, query extraction, response serialization via standard envelopes.
  - `services/`: Core business logic, authoritative price/quote calculations, inventory decrements, and domain operations.
  - `models/`: Validated Mongoose models with timestamps, constraints, and index optimizations.
  - `middleware/`: Authentication (JWT / HttpOnly cookies), role-based authorization (`admin`, `staff`, `customer`), rate limiters, request validation, and sanitized logging.
  - `validators/`: Zod schemas enforcing strict input boundaries and type conversions.
  - `utils/`: Structured Pino logger (with secret redaction), API response envelopes, and custom error classes.

---

## 2. Directory Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection manager, pooling & graceful shutdown
│   │   └── env.js               # Strict Zod environment variable validator
│   ├── controllers/
│   │   ├── adminController.js   # Product, inventory, order, and audit controllers
│   │   ├── authController.js    # Register, login, me, profile, password reset
│   │   ├── cartController.js    # Cart items, sync, promo code validation
│   │   ├── orderController.js   # Authoritative quotes, order creation, order history
│   │   ├── productController.js # Product catalog, slug lookup, featured & autocomplete
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.js              # authenticate, optionalAuth, and authorize(roles)
│   │   ├── errorHandler.js      # Centralized error handler with safe production messages
│   │   ├── rateLimiter.js       # Global and sensitive auth rate limiters
│   │   └── validate.js          # Zod schema validation middleware
│   ├── models/
│   │   ├── Address.js           # Multi-country delivery address records
│   │   ├── AuditLog.js          # Admin action trail with IP and change snapshots
│   │   ├── Cart.js              # Customer & anonymous session carts
│   │   ├── Category.js          # Hierarchical product categories
│   │   ├── Coupon.js            # Server-verified discount codes (percentage/fixed)
│   │   ├── Order.js             # Immutable snapshots of items, addresses, prices, and status
│   │   ├── Product.js           # SKU, pricing, variants, inventory, and search indexes
│   │   ├── Review.js            # Verified customer reviews with rating aggregation
│   │   └── User.js              # Normalized emails, bcrypt hashes, roles, tiers
│   ├── routes/                  # Express route aggregators
│   ├── services/                # Authoritative domain business logic
│   ├── utils/
│   │   ├── apiResponse.js       # Standard { success, message, data, meta } envelopes
│   │   ├── errors.js            # AppError hierarchy (BadRequest, NotFound, Forbidden, etc.)
│   │   ├── logger.js            # Pino logger with redaction of passwords, tokens & cards
│   │   └── seedData.js          # Seed script for Stitch catalog and demo accounts
│   ├── app.js                   # Express app factory with Helmet, CORS, and parsers
│   └── server.js                # Server entry point with graceful shutdown handling
├── tests/
│   ├── auth.test.js             # Registration, login, rate limiting, and password hashing tests
│   ├── cart_order.test.js       # Cart items, promo codes, quotes, and order creation tests
│   ├── products.test.js         # Public catalog, filters, pagination, and autocomplete tests
│   └── security_admin.test.js   # RBAC, audit logging, and customer data isolation tests
├── .env.example                 # Safe environment configuration template
└── package.json
```

---

## 3. Security Implementation

1. **Password Hashing**: `bcryptjs` with 12 salt rounds. Plaintext passwords and hashes are never returned in API payloads (`select: false`).
2. **Authentication**: JWT access tokens signed with HMAC-SHA256, optionally stored in `HttpOnly`, `SameSite=Lax` cookies or transmitted via `Authorization: Bearer <token>`.
3. **HTTP Security Headers**: `helmet` configured with strict referrer policy, frameguard (`SAMEORIGIN`), X-Content-Type-Options (`nosniff`), and HSTS.
4. **CORS Allowlist**: Explicit allowed origins configured via `CORS_ORIGIN` (e.g., `http://localhost:5173`) with support for credentials (`cookies`).
5. **Rate Limiting**:
   - Sensitive endpoints (`/auth/login`, `/auth/register`, `/auth/forgot-password`): 15 requests per 15 minutes.
   - General API routes: 100 requests per 15 minutes.
6. **NoSQL Injection Defense**: All user inputs validated through Zod before reaching Mongoose queries. Direct MongoDB operators (`$where`, `$gt`) are never accepted as raw query objects.
7. **Redacted Logging**: Pino logger automatically scrubs fields: `password`, `token`, `accessToken`, `refreshToken`, `creditCard`, `cvv`, and `secret`.
8. **Authoritative Server Calculations**:
   - The server **never** trusts client-submitted prices, discounts, subtotal, tax, or shipping fees.
   - Inventory is decremented atomically during order placement.
   - Idempotency keys (`Idempotency-Key` header or payload) protect against double submissions.
9. **Customer Data Isolation**: Users can only query, view, or modify their own orders and saved addresses. Accessing another user's order returns `403 Forbidden`.

---

## 4. API Endpoints Directory

All routes are accessible via `/api/v1` (primary) and `/api` (compatibility).

### Public Product & Category APIs
- `GET /api/v1/products`: Search, filter by category/price/rating, sort (`price-asc`, `price-desc`, `rating`, `newest`), and paginate.
- `GET /api/v1/products/:slug`: Retrieve full product details by slug or database ID.
- `GET /api/v1/products/featured`: Top curated products.
- `GET /api/v1/products/trending`: Seasonal trending items.
- `GET /api/v1/products/autocomplete?q=...`: Real-time autocomplete suggestions.
- `GET /api/v1/categories`: Curated list of categories with taglines and imagery.
- `GET /api/v1/categories/:slug`: Specific category details.

### Authentication APIs
- `POST /api/v1/auth/register`: Create new customer account with validated credentials.
- `POST /api/v1/auth/login`: Authenticate and issue JWT + HttpOnly cookie.
- `POST /api/v1/auth/logout`: Invalidate session and clear auth cookies.
- `GET /api/v1/auth/me`: Fetch authenticated profile and membership status.
- `PUT /api/v1/auth/profile`: Update customer contact information.
- `POST /api/v1/auth/forgot-password`: Request secure password reset token.
- `POST /api/v1/auth/reset-password`: Reset password with one-time verification token.

### Cart & Wishlist APIs
- `GET /api/v1/cart`: Retrieve current user/session cart.
- `POST /api/v1/cart/items`: Add item with chosen color/size variant.
- `PATCH /api/v1/cart/items/:itemId`: Update item quantity (stock verified).
- `DELETE /api/v1/cart/items/:itemId`: Remove item from cart.
- `DELETE /api/v1/cart`: Clear cart.
- `POST /api/v1/cart/promo-code`: Validate discount code (`ATELIER10`, `WELCOME20`, `LUX10`).
- `POST /api/v1/cart/sync`: Synchronize client-side cart items with server.
- `GET /api/v1/wishlist`: Retrieve customer wishlist.
- `POST /api/v1/wishlist/:productId`: Add product to wishlist (duplicate protected).
- `DELETE /api/v1/wishlist/:productId`: Remove item from wishlist.

### Addresses APIs
- `GET /api/v1/addresses`: Retrieve customer's saved delivery addresses.
- `POST /api/v1/addresses`: Save new delivery address (supports default flag).
- `PATCH /api/v1/addresses/:id`: Update saved address.
- `DELETE /api/v1/addresses/:id`: Delete address.

### Checkout & Orders APIs
- `POST /api/v1/checkout/quote`: Calculate authoritative prices, taxes, shipping, and coupon discounts.
- `POST /api/v1/orders`: Recalculates quote, atomically decrements stock, and creates immutable order record.
- `GET /api/v1/orders`: Retrieve authenticated customer's order history.
- `GET /api/v1/orders/:id`: Retrieve order details (customer-isolated or guest order token).
- `POST /api/v1/orders/:id/cancel`: Customer cancellation (allowed only while order is `confirmed` or `pending`).

### Protected Admin & Staff APIs
- `GET /api/v1/admin/stats`: Operational dashboard (total revenue, order counts, registered customers).
- `GET /api/v1/admin/orders`: Full list of orders across the platform with status filtering.
- `PATCH /api/v1/admin/orders/:id/status`: Update fulfillment status (`confirmed`, `processing`, `shipped`, `delivered`, `cancelled`) with automatic `AuditLog` generation.
- `PATCH /api/v1/admin/products/:id/inventory`: Real-time stock level updates.
- `POST /api/v1/admin/coupons`: Create new promotional discount codes.
- `GET /api/v1/admin/audit-logs`: Review administrative action audit trails.

---

## 5. Seed Data & Demo Accounts

Run the seed script to populate categories, products, coupons, and test accounts:

```bash
npm run seed
```

### Pre-configured Accounts:
| Role | Email | Password | Member Tier |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@luxstore.internal` | `Admin@LuxStore2026!` | Atelier Privé |
| **Staff** | `staff@luxstore.internal` | `Staff@LuxStore2026!` | Verified Member |
| **Customer** | `jane.doe@example.com` | `JaneDoe@2026!` | Verified Member |

### Active Promotional Codes:
- `ATELIER10`: 10% discount across all products.
- `WELCOME20`: 20% discount on initial orders (min purchase $100).
- `LUX10`: 10% seasonal discount.

---

## 6. Payment Architecture

The backend includes a payment service abstraction in `backend/src/services/paymentService.js`:
- **Provider Agnostic**: Ready for Stripe, PayPal, or Adyen webhook adapters.
- **Webhook Verification**: Validates raw signature payloads (`stripe-signature`) before state changes.
- **Idempotency**: Webhook events are checked against processed transaction IDs before updating order state.
- **Zero Card Retention**: Credit card numbers and CVV codes are never stored or logged on the server.
- **Order State Reconciliation**: Orders remain in `authorized` or `pending_payment` until signed payment provider confirmation is received.

---

## 7. Testing

The backend includes a comprehensive automated test suite utilizing Node.js's native test runner (`node:test`) and `supertest`:

```bash
npm test
```

### Test Coverage Summary:
- `auth.test.js`: Registration, login validation, JWT cookie issuance, rate limiting, and password hashing.
- `products.test.js`: Public catalog querying, price/category filters, sorting, slug retrieval, and autocomplete.
- `cart_order.test.js`: Cart operations, coupon validation, authoritative checkout quotes, stock decrement, and duplicate prevention.
- `security_admin.test.js`: RBAC enforcement (customers blocked from admin endpoints), audit logging, and customer data isolation.

**Result: 23 passing tests (0 failures).**

---

## 8. Deployment & Operation

### Environment Variables
Configure the following in `backend/.env` (refer to `.env.example`):
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/luxstore_db?retryWrites=true&w=majority
JWT_SECRET=your-256-bit-cryptographically-secure-jwt-secret
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your-random-cookie-signing-secret
CORS_ORIGIN=https://your-luxstore-domain.com
```

### Start Commands
```bash
# In backend/
npm start         # Production daemon
npm run dev       # Development with auto-restart
```

### Health Monitoring
- Health endpoint: `GET http://localhost:5000/api/v1/health`
- Returns HTTP 200 with server status, uptime, environment, and version.
