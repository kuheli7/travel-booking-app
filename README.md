# 🌄 Highway Delite - Travel Booking Application

A full-stack travel booking application built with React, TypeScript, Vite, TailwindCSS, Node.js, Express, and MongoDB.

## 🚀 Live Demo

- **Frontend:** [Add your Render frontend URL here]
- **Backend API:** [Add your Render backend URL here]

## ✨ Features

### User Features
- 🏞️ Browse travel experiences with beautiful card layouts
- 🔍 Search experiences by title, location, or description
- 📅 Select dates and available time slots
- 👥 Choose number of participants
- 💰 Apply promo codes (SAVE10 for 10% off, FLAT100 for ₹100 off)
- 📧 Receive booking confirmation emails
- 🎫 Get unique booking reference numbers

### Technical Features
- ⚡ Fast and responsive UI with Vite + React 18
- 🎨 Beautiful styling with TailwindCSS
- 🔒 Atomic booking operations to prevent double-booking
- 📊 MongoDB Atlas for data persistence
- 🌐 RESTful API with proper error handling
- 📱 Mobile-responsive design

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email notifications
- **Express Validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

### Clone Repository
```bash
git clone <your-repo-url>
cd travel-booking-app
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your backend URL
VITE_API_URL=http://localhost:4000

# Start development server
npm run dev
```

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
MONGO_URI=your_mongodb_atlas_connection_string
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Seed database with demo data
npm run seed

# Start backend server
npm start
```

## 🌐 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/ids` - Get experience IDs and titles
- `GET /api/experiences/:id` - Get single experience by ID

### Bookings
- `GET /api/bookings` - View all bookings
- `POST /api/bookings` - Create new booking

### Promo Codes
- `GET /api/promo` - List available promo codes
- `POST /api/promo/validate` - Validate promo code

## 🎨 Design System

- **Brand Yellow:** `#F1D35B`
- **Brand Dark:** `#0F1724`
- **Card Grey:** `#f1f1f1`
- **Muted Text:** `#6b6b6b`
- **Page Background:** `#fafafa`

## 📝 Available Promo Codes

- **SAVE10** - Get 10% discount
- **FLAT100** - Get ₹100 flat discount

## 🚢 Deployment

### Deploy to Render

1. **Backend Deployment:**
   - Create new Web Service on Render
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Add environment variables (MONGO_URI, SMTP credentials)
   - Deploy

2. **Frontend Deployment:**
   - Create new Static Site on Render
   - Connect your GitHub repository
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL=<your-backend-url>`
   - Deploy

3. **Update CORS:**
   - Update backend `index.js` to include production frontend URL in CORS configuration

Detailed deployment instructions: [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

## 📂 Project Structure

```
travel-booking-app/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── index.js         # Server entry point
│   └── seed.js          # Database seeder
├── src/
│   ├── api/             # API client functions
│   ├── assets/          # Images and static files
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── services/        # Service layer
│   ├── utils/           # Utility functions
│   └── types.ts         # TypeScript types
└── public/              # Public assets
```

## 🧪 Testing

### Test Backend API
```bash
# Get all experiences
curl http://localhost:4000/api/experiences

# Get experience IDs
curl http://localhost:4000/api/experiences/ids

# Get all bookings
curl http://localhost:4000/api/bookings

# Get promo codes
curl http://localhost:4000/api/promo
```

### Test Frontend
- Open http://localhost:5173
- Browse experiences
- Select an experience and book
- Apply promo codes
- Complete booking

## 📸 Screenshots

[Add screenshots of your application here]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



## 🙏 Acknowledgments

- Highway Delite for the project inspiration
- React and Vite communities
- TailwindCSS team

---

**Note:** Remember to update MongoDB Atlas network access to allow connections from Render's IP addresses when deploying to production.
