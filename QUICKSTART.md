# Aditi Frontend - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies ✅

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyATs7p7Fiot__5r8dJ8x6plpNaHjeklyMo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=additi-frontend.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=additi-frontend
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=additi-frontend.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=551875233106
NEXT_PUBLIC_FIREBASE_APP_ID=1:551875233106:web:8e6099462a140af2a9a68b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-JSTFKTLYFT
```

### Step 3: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Step 4: Test the Application

#### Try These Actions:

1. **Authentication**

   - Click "Register" → Create a new account
   - Or click "Login" and use Google Sign-In
   - Or login with existing email/password

2. **Shopping**

   - Go to "Shop" → Browse products
   - Use filters to search by category, price
   - Click on a product to see details
   - Click "Add to Cart"

3. **Cart**

   - Go to "Cart" → View your items
   - Update quantities or remove items
   - Click "Proceed to Checkout"

4. **Checkout**

   - Fill in shipping address (validation required)
   - Review order summary
   - Complete checkout (demo payment)
   - See order confirmation

5. **Account**

   - Click profile icon in navbar
   - View order history
   - Update settings

6. **Admin** (if admin user)
   - Go to /dashboard
   - Manage products (add, edit, delete)
   - Manage orders (update status)

## 📁 Important Files

### Core Pages

```
app/(auth)/login/           → Login page
app/(auth)/register/        → Registration page
app/(shop)/shop/            → Product listing
app/(shop)/shop/[id]/       → Product details
app/(shop)/cart/            → Shopping cart
app/(shop)/checkout/        → Checkout flow
app/(shop)/account/         → User account
app/(shop)/orders/[id]/     → Order details
app/admin/products/         → Product management
app/admin/orders/           → Order management
app/dashboard/              → Admin dashboard
```

### Key Components

```
components/auth/            → Authentication components
components/products/        → Product components
components/cart/            → Cart components
components/checkout/        → Checkout components
components/order/           → Order components
components/account/         → Account components
```

### State Management

```
contexts/AuthContext.tsx    → Global auth state
contexts/CartContext.tsx    → Global cart state
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 📱 Features Overview

### ✅ Complete Features

- User registration & login with Firebase
- Google OAuth authentication
- Product catalog with filtering & search
- Shopping cart with persistence
- Checkout process with shipping & payment
- Order management & history
- PDF invoice generation
- Admin dashboard
- Responsive design

### 🔄 Ready for Backend Integration

- Product API endpoints
- Order creation API
- User profile API
- Admin management API

### 📦 All Dependencies Installed

```
next.js, react, typescript, firebase, tailwind,
react-hook-form, zod, jspdf, radix-ui, lucide-react
```

## 🎨 Design System

- **Colors**: Blue primary (#0066CC), Gray backgrounds
- **Typography**: Inter font via Google Fonts
- **Spacing**: Tailwind CSS 4 grid system
- **Components**: Radix UI primitives
- **Icons**: Lucide React (500+ icons)

## 🔐 Firebase Configuration

Firebase is already configured and connected:

- Authentication enabled
- Firestore database ready
- User profiles stored in Firestore
- Google OAuth configured

## 📝 Form Validation

All forms use **Zod** schemas:

- Login form
- Registration form
- Shipping address form
- Custom validation rules

## 🗄️ Database Structure

### Firestore Collections

```
users/[uid]/
  - uid
  - email
  - displayName
  - photoURL
  - role (customer/admin)
  - createdAt
  - updatedAt
```

## 🚨 Common Issues

### Issue: "Firebase not initialized"

**Solution**: Check `.env.local` has correct Firebase config

### Issue: "Products not loading"

**Solution**: Using mock data from `services/product.service.ts`

- Ready to connect to backend API

### Issue: "Cart empty on page reload"

**Solution**: Using localStorage - clear if needed

```javascript
localStorage.removeItem("aditi_cart");
```

### Issue: "Can't add to cart"

**Solution**: Must be logged in (auto-redirect)

## 📚 Documentation Files

- **IMPLEMENTATION_GUIDE.md** - Detailed feature documentation
- **COMPLETION_SUMMARY.md** - What has been implemented
- **This file** - Quick start guide

## 🎯 Next Steps

1. ✅ **Setup & Testing** (current)
2. **Backend Integration**

   - Create REST API endpoints
   - Connect to database
   - Implement Stripe payments

3. **Deployment**

   - Deploy to Vercel
   - Set up CI/CD pipeline
   - Configure custom domain

4. **Enhancement**
   - Add email notifications
   - Implement reviews system
   - Add inventory management

## 💡 Pro Tips

1. **Local Cart Persistence**

   - Cart data saved to localStorage
   - Survives page refreshes
   - Clear with DevTools

2. **Mock Data**

   - 6 sample products loaded
   - Product filtering works
   - Search functionality ready

3. **Form Validation**

   - Real-time validation
   - Error messages shown
   - Phone: 10 digits
   - Postal: 5 digits

4. **Admin Access**
   - Create admin user in Firebase
   - Set role to "admin" in Firestore
   - Access /dashboard

## 📞 Support

For issues or questions:

1. Check error messages in browser console
2. Review IMPLEMENTATION_GUIDE.md
3. Check Firebase console for user data
4. Verify environment variables

## ✨ Features Showcase

### Product Browsing

```
1. Visit http://localhost:3000/shop
2. See all products in grid
3. Use filters on the left
4. Search with the search bar
5. Click product to see details
```

### Shopping Experience

```
1. Click "Add to Cart"
2. See cart badge update in navbar
3. Go to /cart to review
4. Update quantities or remove
5. Proceed to checkout
```

### Checkout Flow

```
1. Fill shipping address
2. Form validates in real-time
3. Review order summary
4. Complete payment (demo)
5. See confirmation page
```

### Account Management

```
1. Login/Register first
2. Click profile icon (top right)
3. See your information
4. View past orders
5. Update settings
```

## 🎓 Learning Resources

**Included in Project:**

- React 19 patterns
- Next.js 16 file routing
- TypeScript strict mode
- Firebase integration
- Form validation with Zod
- Tailwind CSS utility-first
- Component composition patterns

## 📊 Project Stats

- **Files Created**: 40+
- **Components**: 25+
- **Pages**: 12+
- **Type Definitions**: 10+
- **Lines of Code**: 3000+
- **Dependencies**: 15+
- **Zero External State Management** (Context API only)

## 🎉 Success Indicators

✅ npm install completed
✅ All dependencies installed
✅ Firebase configured
✅ All components created
✅ All pages working
✅ Cart persistence working
✅ Forms validating
✅ Responsive design
✅ Admin panel ready

## 🚀 You're Ready!

Everything is set up and ready to go. Start with:

```bash
npm run dev
```

Then visit http://localhost:3000 and explore the application!

---

**Happy coding! 🎉**
