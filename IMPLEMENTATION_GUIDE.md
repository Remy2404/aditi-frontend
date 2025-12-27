# Aditi E-Commerce Frontend

A modern, full-featured e-commerce frontend built with **Next.js 16**, **React 19**, **TypeScript**, and **Firebase**. This application provides a complete shopping experience with authentication, product catalog, cart management, checkout, order tracking, and an admin dashboard.

## Features Implemented

### 1. **User Authentication** ✅

- Email/password registration and login with Firebase Authentication
- Google OAuth 2.0 integration
- JWT-based sessions
- Protected routes with role-based access control
- User profile management
- Settings and preferences

### 2. **Product Catalog** ✅

- Product listing with pagination (12 items per page)
- Advanced filtering by category, price range
- Full-text search functionality
- Sort options: price (asc/desc), name (asc/desc), rating
- Product detail pages with specifications
- Stock status display
- Real-time product ratings and reviews count

### 3. **Shopping Cart** ✅

- Add/remove items from cart
- Update quantities with increment/decrement controls
- Cart persistence using localStorage
- Real-time cart summary
- Cart item count display in navbar
- Free shipping threshold ($100+)
- Automatic tax calculation (10%)

### 4. **Checkout Process** ✅

- Multi-step checkout flow (Shipping → Payment → Confirmation)
- Shipping information form with Zod validation
  - First/Last name, Email, Phone
  - Address, City, State, Postal Code, Country
  - Form validation with error messages
- Order summary with itemized breakdown
- Payment form (demo implementation)
- Order confirmation screen

### 5. **Order Management** ✅

- Order history with status tracking
- Order detail view with all information
- Real-time order status: pending, confirmed, shipped, delivered
- Invoice download as PDF (jsPDF integration)
- Tracking number display
- Order search and filtering in admin panel

### 6. **Admin Dashboard** ✅

- Dashboard overview with analytics
  - Total orders, revenue, products, users
- Product management (CRUD operations)
  - Add new products
  - Edit existing products
  - Delete products
  - Stock management
- Order management
  - View all orders
  - Update order status
  - Track order details
- User management interface

### 7. **UI Components** ✅

- Modern, responsive design using Tailwind CSS
- Radix UI component library
- Custom components:
  - Button, Input, Card, Badge, Tabs
  - Dialog, Dropdown Menu, Sheet, Avatar
  - Checkbox, Label, Separator, Select
  - Textarea, Loading spinner
- Icons from Lucide React
- Responsive grid layouts
- Mobile-first approach

### 8. **Additional Features** ✅

- User profile with avatar support
- Wishlist button on product cards
- Real-time search with debouncing
- Pagination with smart page numbers
- Error handling and validation
- Loading states
- Toast notifications ready (can integrate)
- Utility functions for formatting (price, date, etc.)

## Technology Stack

### Frontend Framework

- **Next.js 16.1.1** - React framework with SSR/SSG
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### State Management & Context

- React Context API
- Custom hooks (useAuth, useCart, useProducts)
- localStorage for persistence

### Database & Backend

- **Firebase 12.7.0**
  - Authentication
  - Firestore (real-time database)
  - Storage (for images)

### Styling

- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Headless component library
- **clsx** & **tailwind-merge** - Class merging

### Form Handling

- **react-hook-form** - Lightweight form library
- **@hookform/resolvers** - Form validation
- **Zod** - Type-safe schema validation

### PDF Generation

- **jsPDF** - Invoice PDF generation

### Icons

- **Lucide React** - Modern SVG icon library

### Development

- **ESLint** - Code linting
- **Next.js CLI** - Development server

## Project Structure

```
app/
├── (auth)/                  # Authentication routes
│   ├── login/
│   └── register/
├── (shop)/                  # Shopping routes
│   ├── shop/               # Product listing
│   ├── shop/[id]/          # Product detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── account/            # User account
│   └── orders/[id]/        # Order details
├── admin/                  # Admin routes
│   ├── products/           # Product management
│   └── orders/             # Order management
├── dashboard/              # Admin dashboard
├── components/
│   ├── auth/               # Auth components
│   ├── products/           # Product components
│   ├── cart/               # Cart components
│   ├── checkout/           # Checkout components
│   ├── order/              # Order components
│   ├── account/            # Account components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── contexts/               # React contexts
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── hooks/                  # Custom hooks
├── lib/                    # Utilities & Firebase
│   ├── firebase.ts
│   ├── utils.ts
│   ├── validation.ts
│   └── invoice-generator.ts
├── services/               # API services
│   └── product.service.ts
├── types/                  # TypeScript types
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── user.ts
└── layout.tsx              # Root layout
```

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or pnpm
- Firebase account

### Install Dependencies

```bash
npm install
# or
pnpm install
```

### Environment Setup

Create a `.env.local` file with Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Key Features Details

### Authentication Flow

1. Users can register with email/password or Google OAuth
2. Firebase handles authentication securely
3. User profiles stored in Firestore
4. Protected routes require authentication
5. Automatic redirect to login for unauthenticated users

### Product Catalog

- **Mock data** with 6 sample products
- **Real-time filtering** by category, price
- **Search** functionality (in-memory, ready for backend integration)
- **Pagination** with smart navigation
- **Responsive grid** (1 col mobile, 3-4 cols desktop)

### Cart Management

- **Context-based state** for global cart access
- **localStorage persistence** for offline access
- **Real-time calculations** (subtotal, tax, shipping)
- **Cart drawer** with quick view
- **Quantity controls** with validation

### Checkout Flow

1. **Shipping Step** - Collect delivery address with validation
2. **Payment Step** - (Demo form, ready for Stripe integration)
3. **Confirmation** - Order success page
4. Clear cart after successful order

### Order Management

- **Order history** with status tracking
- **Order details** with items and shipping info
- **PDF invoice** generation
- **Tracking number** display
- **Admin interface** to update order status

## API Integration Points

Ready to integrate with your backend:

1. **Products API** - `getProducts()`, `getProductById()`
2. **Orders API** - Create order, fetch order history
3. **Authentication API** - Firebase (already integrated)
4. **User API** - Profile updates, settings
5. **Payment API** - Stripe or other payment processor

## Components Available for Reuse

### Product Components

```
<ProductCard /> - Individual product display
<ProductGrid /> - Product grid with pagination
<ProductFilter /> - Filter and sort controls
<ProductDetail /> - Full product page
```

### Cart Components

```
<CartDrawer /> - Shopping cart view
<CartItem /> - Individual cart item
<CartSummary /> - Cart totals and shipping
```

### Checkout Components

```
<CheckoutShippingForm /> - Address input with validation
<PaymentForm /> - Payment details form
<OrderSummary /> - Order review
```

### Auth Components

```
<LoginForm /> - Email/password login
<RegisterForm /> - User registration
<GoogleButton /> - Google OAuth button
<ProtectedRoute /> - Route protection wrapper
```

### Account Components

```
<AccountContent /> - Tabbed account interface
<ProfileTab /> - User profile info
<OrdersTab /> - Order history
<SettingsTab /> - User preferences
```

## Validation Schemas

Using Zod for type-safe validation:

- **loginSchema** - Email and password
- **registerSchema** - Full registration form
- **shippingFormSchema** - Shipping address validation
- **Custom validators** - Phone, postal code, email formats

## Utility Functions

```
formatPrice(price) - Format as USD currency
formatDate(date) - Format date as readable string
formatDateTime(date) - Format with time
truncateString(str, length) - Truncate long text
slugify(str) - Convert to URL slug
getInitials(name) - Get name initials
generateOrderNumber() - Create unique order numbers
calculateDiscount(original, discounted) - Discount percentage
```

## Performance Optimizations

- Image optimization with Next.js
- Code splitting with dynamic imports
- localStorage caching for cart
- Lazy loading for routes
- Memoization for expensive calculations

## Future Enhancements

- [ ] WebSocket integration for real-time updates
- [ ] Full Stripe payment integration
- [ ] Email verification system
- [ ] Password recovery flow
- [ ] Advanced product search (Elasticsearch)
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Coupon/discount codes
- [ ] Multiple payment methods
- [ ] Shipping provider integration
- [ ] Analytics dashboard
- [ ] Email notifications

## Security Considerations

- Firebase authentication with email verification
- Protected API routes (to be implemented on backend)
- Input validation on all forms (Zod)
- XSS protection with React
- CSRF protection (implement on backend)
- Rate limiting (implement on backend)
- Secure password requirements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project as a template for your own applications.

## Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Next.js 16, React 19, and Firebase**
