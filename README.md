# Wi Root - Cassava Flour E-Commerce Platform

A production-ready full-stack e-commerce platform built with Next.js 14, MongoDB, and Clerk authentication. This platform empowers women-led vendors to sell premium cassava flour online.

## 🚀 Features

### Customer Features
- 🔐 Secure authentication with Clerk
- 🛍️ Browse products from multiple vendors
- 🛒 Shopping cart with quantity management
- 💳 Mock payment system (Cash, Card, Mobile Money)
- 📦 Order tracking and history
- ⭐ Product reviews
- 🔔 Order notifications

### Admin Features
- 👥 Vendor management (Create, Update, Deactivate)
- 📦 Product management (Create, Update, Stock control)
- 🛍️ Order management (Status updates, Delivery tracking)
- 📊 Dashboard overview

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** Clerk
- **Database:** MongoDB with Mongoose ODM
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Server Actions
- **UI Components:** Radix UI primitives

## 📋 Prerequisites

- Node.js 18+ and yarn
- MongoDB instance (running locally or remote)
- Clerk account (for authentication)

## 🚀 Getting Started

### 1. Environment Variables

The `.env` file is already configured with:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=wiroot_db
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Seed the Database

```bash
node scripts/seed.js
```

This will create:
- 3 women-led vendors
- 8 cassava flour products with various weights and prices

### 4. Create Admin User

1. Sign up through the application at `/sign-up`
2. Connect to MongoDB and run:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "ADMIN" } }
)
```

### 5. Start Development Server

The server is already running via supervisor:

```bash
sudo supervisorctl restart nextjs
```

Visit: `http://localhost:3000`

## 📁 Project Structure

```
/app
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── admin/               # Admin dashboard
│   │   ├── vendors/
│   │   ├── products/
│   │   └── orders/
│   ├── products/            # Product pages
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── orders/              # Order history
│   └── page.js              # Homepage
├── components/              # Reusable components
│   ├── ui/                  # shadcn components
│   └── Navbar.js
├── lib/
│   ├── actions/             # Server actions
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── models/              # Mongoose schemas
│   └── db.js                # Database connection
├── scripts/
│   └── seed.js              # Database seeding
└── middleware.js            # Clerk auth middleware
```

## 🗄️ Database Schema

### Collections

- **users** - User accounts with Clerk integration
- **vendors** - Women-led cassava flour vendors
- **products** - Product catalog with pricing
- **carts** - User shopping carts
- **cartItems** - Items in carts
- **orders** - Customer orders
- **orderItems** - Items in orders
- **payments** - Payment records
- **deliveries** - Delivery tracking
- **reviews** - Product reviews
- **notifications** - User notifications

## 🔒 Authentication & Authorization

- Authentication handled by Clerk
- Two roles: `CUSTOMER` (default) and `ADMIN`
- Protected routes using Clerk middleware
- Server actions validate user role before execution

## 🎨 UI Components

Using shadcn/ui components:
- Button, Card, Input, Label
- Select, Dialog, Tabs
- Toast notifications (Sonner)
- All components styled with Tailwind CSS

## 📱 Key Pages

### Public
- `/` - Homepage with hero and featured products
- `/products` - Product catalog
- `/products/[id]` - Product details

### Customer (Protected)
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/orders` - Order history
- `/orders/[id]` - Order details

### Admin (Protected)
- `/admin` - Dashboard
- `/admin/vendors` - Vendor management
- `/admin/products` - Product management
- `/admin/orders` - Order management

## 🚀 Deployment Notes

- All environment variables are configured
- MongoDB connection uses environment variable
- Clerk handles authentication in production
- Server runs on port 3000 via supervisor

## 📄 License

Proprietary Software — All rights reserved. Unauthorized copying, distribution, modification, or disclosure is prohibited without express written permission from Wi Root. Intended for internal use and authorized collaborators only.

## 🙏 Acknowledgments

- Built to support women-led cassava flour vendors in Sierra Leone
- Empowering communities through technology and e-commerce

---

**Wi Root** - *Healthy Flour, Happy Families* 🌱
