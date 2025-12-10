# 🎟️ Events & Activities Management Platform

### MERN + Next.js · Prisma ORM · Stripe Payments · Role-Based System · Secure Auth · Admin Dashboard

**🔗 Live URL:** *[🔗Events & Activities🔗](https://events-activities-frontend.vercel.app/)*
**🔗 Backend API Base URL:** `${BASE_URL}/api`

---

## 🚀 Overview

This is a full-stack **Events & Activities Management Platform** featuring secure authentication, multi-role user access, event booking, host dashboards, Stripe payment processing, and a complete admin management system.

The platform includes:

* **Next.js (App Router)** frontend
* **Express.js + Prisma ORM** backend
* **PostgreSQL** database
* **JWT Access + Refresh Tokens** for secure sessions
* **Stripe Payment Gateway** for ticket purchases

User roles:

* **Admin** – Full analytics, user moderation, event moderation
* **Host** – Create/manage events
* **User** – Browse events, book tickets, make payments

---

# ✨ Features

## 🔐 Authentication & Security

* JWT Access Token + Refresh Token rotation
* Secure HTTP-Only cookies
* Role-based authorization middleware
* Bcrypt password hashing
* Complete login, register, and token refresh system

## 💳 Payment Integration (Stripe)

* Fully integrated **Stripe Checkout Session**
* Secure payment processing
* Stripe Webhook support
* Event ticket purchases with real-time payment verification
* Automatic booking confirmation after successful payment
* Stripe Dashboard for viewing payments

## 👥 User Roles & Capabilities

### **Admin**

* Comprehensive dashboard analytics
* Manage all users (including soft-deleted users)
* Approve hosts
* Moderate all events
* Advanced search, filtering, and pagination

### **Host**

* Create, update, delete events
* Manage their event participants
* View all of their events in "My Events"

### **User**

* Browse events
* Book tickets & pay with Stripe
* View booking history
* Update profile

## 📊 Admin Dashboard Includes

* Total events
* Total users, hosts, admins
* Total bookings
* Monthly revenue
* Revenue & event charts (via Recharts)

---

# 🛠️ Technology Stack

## **Frontend (Next.js 16)**

* TypeScript
* TailwindCSS + Shadcn
* Server Actions
* Custom `serverFetch` with automatic token refresh
* React Hook Form
* Recharts
* Sonner Toast

## **Backend (Node.js + Express)**

* TypeScript
* Prisma ORM
* PostgreSQL
* Zod Validation
* Custom error handling
* Stripe Payment Integration
* Webhook validation and event handling
* Role-based authorization middleware

## **Database**

* PostgreSQL
* Prisma Client
* Prisma Migrations

---

# 📦 Backend Project Structure

```
EVENTS-BACKEND/
├── dist/
├── generated/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── src/
│   └── app/
│        ├── config/
│        ├── errors/
│        ├── helper/
│        ├── interfaces/
│        ├── middlewares/
│        ├── modules/
│        │     ├── auth/
│        │     ├── person/
│        │     ├── host/
│        │     ├── admin/
│        │     ├── event/
│        │     └── booking/
│        ├── routes/
│        └── utils/
│   ├── app.ts
│   └── server.ts
├── uploads/
├── .env
├── tsconfig.json
├── prisma.config.ts
├── render-build.sh
└── package.json
```

---

# ⚙️ Backend Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd events-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env` in the root:

```
DATABASE_URL="postgresql://..."
PORT="your_port_number"

CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_NAME="your_cloudinary_api_name"

STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

FRONTEND_URL="your_frontend_url"

JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_ACCESS_EXPIRES="10m"
JWT_REFRESH_EXPIRES="7d"

NODE_ENV="development"
EXPRESS_SESSION_SECRET="your_express_session_secret"
BCRYPT_SALT_ROUND="your_bcrypt_salt_round_number"

ADMIN_EMAIL="your_admin_email"
ADMIN_PASSWORD="your_admin_password"
```

### 4. Apply Prisma Schema

```bash
npx prisma migrate dev
```

### 5. Run the Backend Locally

```bash
npm run dev
```

---

# 💻 Frontend Setup Instructions

### 1. Navigate to Project Root

```bash
cd events-frontend
npm install
```

### 2. Add `.env.local`

```
NEXT_PUBLIC_BASE_API_URL="https://events-activities-backend.onrender.com/api"
NODE_ENV="development"
STRIPE_SECRET_KEY="your_stripe_secret_key"
JWT_SECRET="your_jwt_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret_here"
```

### 3. Start the Frontend

```bash
npm run dev
```

---

# 🔄 Token Refresh Flow (Important)

Your frontend uses:

```ts
serverFetch.get("/some-api")
```

This automatically:

1. Reads `accessToken` from cookies
2. Calls `/auth/refresh-token` when expired
3. Updates cookies
4. Repeats the original request without breaking

This ensures seamless SSR and client rendering without 401 issues.

---

# 🤝 Contribution Guidelines

* Maintain clean controller + service architecture
* Follow TypeScript coding standards
* Use proper HTTP status codes
* Keep Prisma schema clean and validated

---

# 🪪 License

MIT License © 2025 — Abdullah Al Towsif
