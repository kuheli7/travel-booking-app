# Highway Delite - Travel Booking App

A complete full-stack travel booking application built with React, TypeScript, Express, and MongoDB.

## 🚀 Live Demo

- **Frontend**: [Your Render URL will go here]
- **Backend API**: [Your Backend URL will go here]

## 📋 Features

- Browse travel experiences with beautiful UI
- Dynamic date and time slot selection
- Real-time availability checking
- Promo code validation (SAVE10, FLAT100)
- Complete booking flow with confirmation
- MongoDB Atlas database integration
- Responsive design with TailwindCSS

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS v3.4.1
- React Router DOM v7.9.4
- Axios

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- Nodemailer for email notifications
- Express Validator

## 📦 Local Development

### Prerequisites
- Node.js 16+
- MongoDB Atlas account

### Frontend Setup
```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# PORT=4000
# MONGO_URI=your_mongodb_uri
# SMTP credentials (optional)
npm run seed  # Seed database with demo data
npm run dev   # Runs on http://localhost:4000
```

## 🌐 Render Deployment

### Backend Deployment
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node index.js`
   - **Environment Variables**:
     - `NODE_ENV=production`
     - `PORT=4000`
     - `MONGO_URI=your_mongodb_uri`
     - `FRONTEND_URL=your_frontend_url`
     - SMTP credentials (optional)

### Frontend Deployment
1. Create new Static Site on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variable**:
     - `VITE_API_URL=your_backend_url`

## 📡 API Endpoints

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get specific experience
- `POST /api/bookings` - Create new booking
- `POST /api/promo/validate` - Validate promo code

## 🎨 Design System

- Brand Yellow: `#F1D35B`
- Brand Dark: `#0F1724`
- Card Grey: `#f1f1f1`
- Page Background: `#fafafa`

## 📝 Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount

## 👨‍💻 Author

Built as part of Full Stack Development internship assignment.

## 📄 License

MIT
