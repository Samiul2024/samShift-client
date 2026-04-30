# 🚀 SamShift – Smart Parcel Management & Delivery System

A full-stack MERN-based logistics and parcel delivery platform built with secure authentication, rider management, parcel tracking, analytics dashboards, Stripe payment integration, and role-based workflow automation.

---

# 🌐 Live Links

- 🔗 Frontend: https://frontend-url.vercel.app
- 🔗 Backend: https://backend-url.vercel.app

---

# 📸 Project Overview

SamShift is a modern parcel delivery management system where:

- Users can send parcels and pay online
- Admins manage riders, analytics, parcels, and assignments
- Riders manage delivery workflow and earnings
- Customers can track parcel status in real time

The system follows a real-world logistics workflow similar to professional courier services.

---

# ✨ Major Features

# 🔐 Authentication & Authorization

- Firebase Authentication
- Google Login
- Email/Password Login
- Firebase Admin SDK Token Verification
- Protected Routes
- Role-based Access Control
  - User
  - Rider
  - Admin

---

# 📦 Parcel Management System

- Create Parcel
- View My Parcels
- Delete Parcel
- Parcel Status Workflow
- Dynamic Parcel Tracking
- Delivery Charge Calculation
- Sender & Receiver Information
- Real-time Parcel Lifecycle Updates

---

# 💳 Stripe Payment Integration

- Stripe Payment Gateway
- Secure Payment Intent API
- Parcel Auto Confirmation After Payment
- Transaction History
- Payment History Dashboard

---

# 🚚 Rider Management System

- Rider Application System
- Admin Approval / Rejection
- Dynamic Role Upgrade
- Active Rider Management
- District-Based Rider Filtering
- Rider Work Status Control

---

# 📍 Rider Assignment System

- Assign Riders to Paid Parcels
- District Matching Logic
- Assign Rider Modal
- Rider Acceptance System
- Delivery Status Updates

Parcel workflow example:

1. Parcel Created
2. Payment Completed
3. Rider Assigned
4. Rider Accepted
5. Picked Up
6. In Transit
7. Delivered

---

# 📡 Real-Time Tracking System

Tracking history is automatically stored for every parcel action.

Includes:
- Parcel Confirmed
- Rider Assigned
- Rider Accepted
- Picked Up
- In Transit
- Delivered

---

# 📊 Rider Dashboard

Advanced Rider Dashboard includes:

- Total Earnings
- Total Deliveries
- Completed Deliveries
- Pending Earnings
- Weekly / Monthly Earnings Filter
- Earnings Overview Charts
- Delivery Analytics
- Recent Earnings Table

Built with:
- Recharts
- TanStack Query
- TailwindCSS

---

# 📈 Admin Analytics Dashboard

Advanced analytics system for admins.

Includes:
- Total Revenue
- Total Parcels
- Delivered Parcels
- Delivery Success Rate
- Revenue Analytics
- Monthly Revenue Chart
- Last 7 Days / 30 Days Filter
- Top Riders Leaderboard
- Rider Performance Analytics

---

# 💸 Rider Withdrawal System

Professional payout system for riders.

Features:
- Withdrawal Request
- Minimum Balance Validation
- Rider Balance Tracking
- Withdrawal History
- Pending / Approved Status
- Admin Withdrawal Management

---

# 🛡 Security Features

- Firebase Token Verification Middleware
- verifyAdmin Middleware
- verifyRider Middleware
- Protected API Routes
- Secure Axios Instance
- Environment Variable Protection

---

# 🧠 Tech Stack

## 🖥 Frontend

- React.js
- React Router
- TanStack Query (React Query)
- Tailwind CSS
- DaisyUI
- Axios
- Recharts
- React Icons
- SweetAlert2

---

## ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK

---

## 💳 Payment

- Stripe API

---

# 🏗️ Architecture Highlights

- RESTful API Architecture
- Modular Folder Structure
- Secure Middleware System
- Role-based Dashboard
- Reusable Components
- Real-world Parcel Workflow
- Analytics-driven Dashboard
- Scalable MongoDB Collections

---

# 📂 Folder Structure

```bash
samShift/
│
├── client/                     # React Frontend
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   └── config/
│
├── server/                     # Express Backend
│   ├── index.js
│   ├── firebase-admin-key.json
│   └── .env
│
└── README.md
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
PORT=5000

DB_USER=your_db_user
DB_PASS=your_db_password

PAYMENT_GATEWAY_KEY=your_stripe_secret_key
```

---

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/Samiul2024/samShift-client.git
cd samshift
```

---

# 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

---

# 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

# 🔥 Core Functional Workflow

## 👤 User Workflow

1. Register/Login
2. Create Parcel
3. Pay Delivery Charge
4. Track Parcel
5. View Payment History

---

## 🛠 Admin Workflow

1. Approve Riders
2. Manage Roles
3. Assign Riders
4. Monitor Analytics
5. Manage Withdrawals
6. Track Parcel Operations

---

## 🚚 Rider Workflow

1. Accept Delivery
2. Update Delivery Status
3. Complete Delivery
4. Earn Delivery Income
5. Withdraw Earnings

---

# 📡 API Highlights

## Authentication
- Firebase Token Verification

## User APIs
- Create User
- Search Users
- Get User Role

## Parcel APIs
- Create Parcel
- Assign Rider
- Update Delivery Status
- Get Assignable Parcels
- Track Parcel

## Rider APIs
- Apply Rider
- Approve Rider
- Rider Dashboard
- Earnings

## Payment APIs
- Stripe Payment Intent
- Payment History

## Analytics APIs
- Revenue Analytics
- Rider Leaderboard
- Delivery Success Metrics

---

# 📊 Dashboard Features

## User Dashboard
- My Parcels
- Payment History
- Tracking

## Rider Dashboard
- Earnings Analytics
- Withdrawals
- Delivery Statistics

## Admin Dashboard
- Rider Management
- Assign Rider
- Analytics
- Revenue Charts
- Top Riders

---

# 🚀 Future Improvements

- Live GPS Tracking
- Google Maps Integration
- Push Notifications
- SMS Notifications
- Email Notifications
- Mobile App (React Native)
- AI-based Delivery Optimization
- Automatic Rider Recommendation
- Multi-branch Support
- COD (Cash on Delivery)
- Invoice Generation
- Customer Review & Rating System
- Rider Live Location Sharing

---

# 👨‍💻 Author

## Md. Samiulla Hossen

- MERN Stack Developer
- React & Firebase Enthusiast
- Passionate about scalable systems and real-world web applications

---

# ⭐ Support

If this project helped you or inspired you, consider giving it a ⭐ on GitHub.

---

# 📜 License

This project is licensed for educational and portfolio purposes.

---

> Built with scalability, performance, analytics, and real-world logistics workflow architecture 🚚