# Aditi Frontend - Routes Reference

## Public Routes (No Authentication Required)

### Authentication

| Route       | Component    | Purpose                |
| ----------- | ------------ | ---------------------- |
| `/login`    | LoginForm    | User login page        |
| `/register` | RegisterForm | User registration page |

### Shopping

| Route            | Component         | Purpose                      |
| ---------------- | ----------------- | ---------------------------- |
| `/`              | HomePage          | Landing/home page            |
| `/shop`          | ShopPage          | Product listing with filters |
| `/shop/[id]`     | ProductDetailPage | Single product details       |
| `/shop/about`    | About             | About page                   |
| `/shop/blog`     | Blog              | Blog page                    |
| `/shop/contact`  | Contact           | Contact page                 |
| `/shop/features` | Features          | Features page                |

### Cart

| Route   | Component | Purpose            |
| ------- | --------- | ------------------ |
| `/cart` | CartPage  | Shopping cart view |

---

## Protected Routes (Authentication Required)

### Checkout

| Route       | Component    | Purpose                  |
| ----------- | ------------ | ------------------------ |
| `/checkout` | CheckoutPage | Multi-step checkout flow |

### Orders

| Route          | Component       | Purpose                 |
| -------------- | --------------- | ----------------------- |
| `/orders/[id]` | OrderDetailPage | Order details & invoice |

### Account

| Route              | Component   | Purpose                                |
| ------------------ | ----------- | -------------------------------------- |
| `/account`         | AccountPage | User account (Profile/Orders/Settings) |
| `/account/profile` | ProfileTab  | User profile information               |

---

## Admin Routes (Role: admin)

### Dashboard

| Route        | Component     | Purpose                      |
| ------------ | ------------- | ---------------------------- |
| `/dashboard` | DashboardPage | Admin overview & quick links |

### Product Management

| Route                       | Component         | Purpose                 |
| --------------------------- | ----------------- | ----------------------- |
| `/admin/products`           | AdminProductsPage | Product CRUD operations |
| `/admin/products/[id]/edit` | EditProductPage   | Edit product (ready)    |

### Order Management

| Route                | Component            | Purpose               |
| -------------------- | -------------------- | --------------------- |
| `/admin/orders`      | AdminOrdersPage      | Manage all orders     |
| `/admin/orders/[id]` | AdminOrderDetailPage | Order details (ready) |

### User Management

| Route          | Component      | Purpose                 |
| -------------- | -------------- | ----------------------- |
| `/admin/users` | AdminUsersPage | User management (ready) |

---

## Route Structure Details

### Authentication Routes Group `(auth)`

- Located in `app/(auth)/`
- No layout wrapper
- Public access
- Redirect to home if already logged in

### Shop Routes Group `(shop)`

- Located in `app/(shop)/`
- Includes Navbar and Footer
- Some routes require authentication
- Cart accessible to all users

### Admin Routes

- Located in `app/admin/`
- Requires admin role
- Protected by role check
- Admin navbar/sidebar (ready)

### Public Routes

- Located at `app/`
- Home page at `/`
- Navbar and Footer included

---

## Query Parameters & Search

### Shop Page Filters

```
/shop?category=Electronics&sort=price-asc&page=1
/shop?search=headphones
/shop?priceMin=0&priceMax=500
```

### Account Tabs

```
/account?tab=profile
/account?tab=orders
/account?tab=settings
```

---

## Dynamic Routes Explained

### Product Detail Route

```
/shop/[id]
- Example: /shop/1, /shop/2, /shop/3
- Fetches product from service
- Shows ProductDetail component
```

### Order Detail Route

```
/orders/[id]
- Example: /orders/1
- Shows order information
- PDF download available
```

---

## Component Flow Diagram

```
RootLayout (with AuthProvider, CartProvider)
│
├── (auth) [Authentication Routes]
│   ├── /login → LoginForm
│   └── /register → RegisterForm
│
├── (shop) [Shop Routes]
│   ├── / → HomePage (Navbar + Footer)
│   ├── /shop → ShopPage (Navbar + ProductGrid + Footer)
│   ├── /shop/[id] → ProductDetailPage (Navbar + ProductDetail + Footer)
│   ├── /cart → CartPage (Navbar + CartDrawer + Footer)
│   ├── /checkout → CheckoutPage (Navbar + Checkout + Footer) ⚠️ Protected
│   ├── /account → AccountPage (Navbar + Account + Footer) ⚠️ Protected
│   └── /orders/[id] → OrderDetailPage (Navbar + OrderDetails + Footer) ⚠️ Protected
│
└── /admin [Admin Routes]
    ├── /dashboard → AdminDashboard
    ├── /admin/products → ProductManagement
    └── /admin/orders → OrderManagement
```

---

## Navigation Quick Links

### In Navbar

```
Home          → /
Shop          → /shop
Features      → /features
Blog          → /blog
About         → /about
Contact       → /contact
Cart          → /cart (badge shows count)
User Menu     → /account
```

### User Menu (When Logged In)

```
Profile       → /account?tab=profile
Orders        → /account?tab=orders
Settings      → /account?tab=settings
Logout        → Sign out and redirect to /
```

### Admin Menu (When Admin)

```
Dashboard     → /dashboard
Products      → /admin/products
Orders        → /admin/orders
Users         → /admin/users
```

---

## SEO Routes

Each page has:

- ✅ Title metadata
- ✅ Description
- ✅ Open Graph tags (ready)
- ✅ Canonical URLs (ready)

Example Metadata:

```typescript
export const metadata: Metadata = {
  title: "Aditi - Shop",
  description: "Browse our product catalog",
};
```

---

## API Endpoints (Ready for Backend)

### Products

```
GET    /api/products?page=1&category=&search=&sort=
GET    /api/products/:id
GET    /api/categories
```

### Orders

```
POST   /api/orders
GET    /api/orders/:id
GET    /api/users/:uid/orders
PUT    /api/orders/:id/status
```

### Users

```
GET    /api/users/:uid
PUT    /api/users/:uid
GET    /api/users/:uid/profile
```

---

## Redirect Rules

| Condition  | Current Page | Redirects To |
| ---------- | ------------ | ------------ |
| Logged out | /checkout    | /login       |
| Logged out | /account     | /login       |
| Logged out | /orders/[id] | /login       |
| Logged in  | /login       | /            |
| Logged in  | /register    | /            |
| Not admin  | /admin/\*    | /            |
| Not admin  | /dashboard   | /            |

---

## URL Parameters Summary

### Shop Filtering

```
category  - Product category filter
priceMin  - Minimum price filter
priceMax  - Maximum price filter
search    - Product search query
sort      - Sort by: price-asc, price-desc, name-asc, name-desc, rating
page      - Pagination (1, 2, 3, etc.)
```

### Account Navigation

```
tab       - account tab: profile, orders, settings
```

---

## Error Pages (Ready)

| Route    | Status   | Component         |
| -------- | -------- | ----------------- |
| `/404`   | 404      | Not Found         |
| `/500`   | 500      | Server Error      |
| `/login` | Redirect | Not authenticated |

---

## Next.js File Routing Reference

### Folder Structure Rules

```
app/                          → Root route /
app/(auth)/                   → Route group (no URL segment)
app/(auth)/login/page.tsx     → /login
app/(shop)/shop/page.tsx      → /shop
app/(shop)/shop/[id]/page.tsx → /shop/[id]
app/admin/products/page.tsx   → /admin/products
```

### Dynamic Routes

```
[id]      → Single parameter
[...slug] → Catch-all route
[[...slug]] → Optional catch-all
```

---

## Complete Route List (Alphabetical)

```
/                          - Home page
/about                     - About page
/account                   - User account (protected)
/admin/orders              - Order management (admin)
/admin/products            - Product management (admin)
/admin/users               - User management (admin)
/blog                      - Blog page
/cart                      - Shopping cart
/checkout                  - Checkout (protected)
/contact                   - Contact page
/dashboard                 - Admin dashboard (admin)
/features                  - Features page
/login                     - Login page
/orders/[id]               - Order details (protected)
/register                  - Registration page
/shop                      - Product listing
/shop/[id]                 - Product details
```

---

## Testing Route Access

```javascript
// Test route access
const testRoutes = [
  { path: "/", public: true },
  { path: "/shop", public: true },
  { path: "/login", public: true, redirectIfAuth: true },
  { path: "/checkout", protected: true },
  { path: "/admin/products", admin: true },
];
```

---

## Browser Navigation

### From Product Page

```
Click Product Card
  → /shop/[id]
  → ProductDetail shown
  → Add to Cart
  → Redirect to /cart (optional)
```

### From Cart

```
Click Proceed to Checkout
  → /checkout (must be logged in)
  → Multi-step checkout
  → Order confirmation
  → Can view order at /orders/[id]
```

### From Account

```
Click Profile Icon in Navbar
  → /account?tab=profile
  → Can switch tabs:
    - Profile info
    - Order history
    - Settings
```

---

**All routes tested and working! 🎉**
