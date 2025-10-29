# 🚀 Backend Setup Guide - Highway Delite BookIt

## 📋 Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (free tier)
- Gmail account (for email notifications)

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create a Free Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Click **"Build a Database"**
4. Select **"M0 FREE"** tier
5. Choose your preferred region (e.g., AWS, Mumbai)
6. Click **"Create Cluster"**

### Step 2: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `bookituser` (or any name)
5. Set a strong password (save it!)
6. Set **Database User Privileges** to **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Whitelist IP Address

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For testing: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ **For production:** Use specific IP addresses
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://bookituser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your database user password
6. Add `/bookit` before the `?` to specify database name:
   ```
   mongodb+srv://bookituser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
   ```

---

## 📧 Gmail SMTP Setup (for Email Notifications)

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **"2-Step Verification"**

### Step 2: Create App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **"Mail"** and **"Other (Custom name)"**
3. Enter name: **"Highway Delite BookIt"**
4. Click **"Generate"**
5. Copy the 16-character app password (save it!)

---

## ⚙️ Backend Installation

### Step 1: Navigate to Backend Directory

```powershell
cd "c:\Christ Trimester 1\FSD\Internshala\29.10.25 Assignment\travel-booking-app\backend"
```

### Step 2: Install Dependencies

```powershell
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `nodemailer` - Email sending
- `express-validator` - Input validation
- `short-uuid` - Booking reference generation
- `body-parser` - Request body parsing
- `nodemon` - Development auto-reload

### Step 3: Configure Environment Variables

Edit the `.env` file in the backend folder:

```env
PORT=4000
MONGO_URI=mongodb+srv://bookituser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
FROM_EMAIL="Highway Delite" <no-reply@gmail.com>
```

**Replace:**
- `YOUR_PASSWORD` - Your MongoDB user password
- `your-email@gmail.com` - Your Gmail address
- `your-16-char-app-password` - Your Gmail app password

### Step 4: Seed the Database

```powershell
npm run seed
```

This creates a demo experience with:
- 5 consecutive dates (from today)
- Multiple time slots per date
- Different capacities

Expected output:
```
Connected
Seeded experience id: 67xxxxxxxxxxxxxxxx
```

**Save this experience ID!** You'll need it for testing.

### Step 5: Start the Backend Server

```powershell
npm run dev
```

Expected output:
```
Mongo connected
API running on http://localhost:4000
```

---

## 🧪 Testing the API

### Test 1: Get All Experiences

```powershell
curl http://localhost:4000/api/experiences
```

### Test 2: Validate Promo Code

```powershell
curl -X POST http://localhost:4000/api/promo/validate -H "Content-Type: application/json" -d "{\"code\": \"SAVE10\"}"
```

Expected response:
```json
{"valid":true,"promo":{"code":"SAVE10","type":"percentage","amount":10}}
```

### Test 3: Create Booking

Replace `EXPERIENCE_ID` with the ID from seed output:

```powershell
curl -X POST http://localhost:4000/api/bookings -H "Content-Type: application/json" -d "{\"experienceId\":\"EXPERIENCE_ID\",\"date\":\"2025-10-29\",\"slotId\":\"s2-2025-10-29\",\"qty\":1,\"price\":999,\"user\":{\"name\":\"Test User\",\"email\":\"test@example.com\"}}"
```

Expected response:
```json
{"success":true,"ref":"ABCD1234"}
```

---

## 🔗 Connect Frontend to Backend

### Step 1: Update Frontend API Endpoints

The frontend currently uses mock data. You need to update:

1. **Home Page** - Fetch from `/api/experiences`
2. **Details Page** - Fetch from `/api/experiences/:id`
3. **Checkout Promo** - POST to `/api/promo/validate`
4. **Checkout Submit** - POST to `/api/bookings`

### Step 2: Add API Base URL

Create `src/config/api.ts`:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
```

Add to `.env` in frontend root:

```env
VITE_API_URL=http://localhost:4000
```

---

## 🌐 Deploy to Render (Free Tier)

### Step 1: Push to GitHub

1. Initialize git in backend folder:
   ```powershell
   cd backend
   git init
   git add .
   git commit -m "Initial backend setup"
   ```

2. Create GitHub repository
3. Push code:
   ```powershell
   git remote add origin https://github.com/your-username/bookit-backend.git
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `bookit-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

5. Add Environment Variables:
   - Click **"Advanced"**
   - Add all variables from `.env`:
     - `MONGO_URI`
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `SMTP_SECURE`
     - `SMTP_USER`
     - `SMTP_PASS`
     - `FROM_EMAIL`

6. Click **"Create Web Service"**

### Step 3: Seed Production Database

Once deployed, go to Render dashboard:
1. Click on your service
2. Go to **"Shell"** tab
3. Run: `npm run seed`

### Step 4: Update Frontend

Update frontend `.env`:

```env
VITE_API_URL=https://bookit-backend.onrender.com
```

---

## 📁 Backend File Structure

```
backend/
├── index.js              # Main server file
├── seed.js               # Database seeding script
├── package.json          # Dependencies
├── .env                  # Environment variables (DO NOT COMMIT)
├── .env.example          # Environment template
├── .gitignore           # Git ignore rules
├── README.md            # Documentation
├── models/              # MongoDB schemas
│   ├── Experience.js    # Experience model
│   └── Booking.js       # Booking model
├── routes/              # API routes
│   ├── experiences.js   # GET experiences
│   ├── promo.js         # POST promo validation
│   └── bookings.js      # POST booking creation
└── utils/               # Utility functions
    └── dateUtils.js     # Date helper functions
```

---

## 🔑 Available Promo Codes

- **SAVE10** - 10% discount
- **FLAT100** - ₹100 flat discount

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoServerError: bad auth`
- Check username and password in `MONGO_URI`
- Ensure database user is created in MongoDB Atlas
- Verify password doesn't contain special characters (URL encode if needed)

### Email Not Sending

**Error:** `Invalid login`
- Verify Gmail app password is correct (16 characters, no spaces)
- Ensure 2FA is enabled on Gmail account
- Check `SMTP_USER` matches Gmail address

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::4000`
- Change `PORT` in `.env` to `4001` or another available port
- Or kill the process using port 4000

### Seed Script Fails

**Error:** `Connection refused`
- Ensure MongoDB connection string is correct
- Check IP whitelist in MongoDB Atlas (should include 0.0.0.0/0 for testing)

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Database user created with password
- [ ] IP address whitelisted (0.0.0.0/0 for testing)
- [ ] Connection string copied and password replaced
- [ ] Gmail 2FA enabled
- [ ] Gmail app password generated
- [ ] Backend dependencies installed (`npm install`)
- [ ] `.env` file configured with all variables
- [ ] Database seeded successfully (`npm run seed`)
- [ ] Backend server running (`npm run dev`)
- [ ] API endpoints tested with curl/Postman
- [ ] Frontend connected to backend
- [ ] Booking flow tested end-to-end

---

## 🎯 Next Steps

1. ✅ **Backend is ready!**
2. Update frontend to use real API endpoints
3. Test complete booking flow
4. Deploy frontend to Vercel/Netlify
5. Deploy backend to Render
6. Update environment variables for production

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review server logs in terminal
3. Check MongoDB Atlas logs
4. Verify all environment variables are correct

**Happy Coding! 🚀**
