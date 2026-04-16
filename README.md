# 🚀 SamShift – Parcel Management & Delivery System

A full-stack MERN-based logistics platform designed to manage parcel delivery, rider assignment, and real-time tracking with secure payment integration.

---

## 🌐 Live Links
- 🔗 Frontend: https://frontend-url.vercel.app
- 🔗 Backend: https://backend-url.vercel.app

---

## 📸 Project Overview

SamShift is a scalable parcel delivery system where:
- Users can send parcels and track them
- Admins can manage users, riders, and assignments
- Riders handle delivery workflows

---

## ✨ Core Features

### 👤 Authentication & Authorization
- Firebase Authentication (Email & Google)
- JWT verification with Firebase Admin SDK
- Role-based access control (User / Admin / Rider)

### 📦 Parcel Management
- Create, view, and delete parcels
- Filter parcels by user
- Parcel lifecycle tracking

### 💳 Payment System
- Stripe payment integration
- Payment history tracking
- Auto parcel status update after payment

### 🚚 Rider Management
- Rider application system
- Admin approval/rejection
- Role upgrade/downgrade dynamically

### 📍 Assign Rider System
- District-based rider matching
- Assign rider via modal UI
- Parcel status update (in-transit)
- Rider work status update (in-delivery)

### 📊 Admin Dashboard
- Manage users and roles
- View active & pending riders
- Assign riders to parcels

### 📡 Tracking System
- Real-time tracking updates
- Tracking history stored in database

---

## 🧠 Tech Stack

### 🖥 Frontend
- React.js
- React Router
- TanStack Query (React Query)
- Tailwind CSS + DaisyUI
- Axios (secure API calls)

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK

### 💳 Payment
- Stripe API

---

## 🏗️ Architecture Highlights

- RESTful API structure
- Secure middleware (verifyFBToken, verifyAdmin)
- Modular component-based frontend
- Optimized data fetching with caching
- Scalable database schema

---

## 📂 Folder Structure (Simplified)

```
samShift/
│
├── client/          # React Frontend
├── server/          # Express Backend
├── README.md
```

---

## 🔐 Environment Variables

### Backend (.env)

```
PORT=5000
DB_USER=db_user
DB_PASS=db_password
PAYMENT_GATEWAY_KEY=stripe_secret
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```
git clone https://github.com/username/samshift.git
cd samshift
```

### 2️⃣ Setup Backend
```
cd server
npm install
npm run dev
```

### 3️⃣ Setup Frontend
```
cd client
npm install
npm run dev
```

---

## 🔥 Key Functional Flow

1. User creates parcel
2. User makes payment (Stripe)
3. Parcel status → "paid"
4. Admin assigns rider (district match)
5. Parcel status → "in-transit"
6. Rider delivers parcel
7. Tracking updates stored in DB

---

## 📌 Future Improvements

- Live map tracking (Google Maps API)
- Push notifications
- Rider mobile app (React Native)
- Advanced analytics dashboard

---

## 👨‍💻 Author

**Md. Samiulla Hossen**

- MERN Stack Developer
- Passionate about scalable systems

---

## ⭐ Support

If this project is helpful, consider giving it a ⭐ on GitHub.

---

> Built with performance, scalability, and real