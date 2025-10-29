# 🚀 Render Deployment Guide

## Step 1: Prepare Your GitHub Repository

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Travel Booking App ready for deployment"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `travel-booking-app`)
   - Don't initialize with README (we already have files)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/travel-booking-app.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**:
   - Visit https://render.com
   - Sign up or log in
   - Click **"New +"** → **"Web Service"**

2. **Connect Repository**:
   - Select your GitHub repository
   - Click **"Connect"**

3. **Configure Backend Service**:
   - **Name**: `travel-booking-backend`
   - **Region**: Choose closest to you (e.g., Singapore)
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node index.js`
   - **Plan**: Free

4. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV = production
   PORT = 4000
   MONGO_URI = mongodb+srv://bookit_user:Kuheli%4012345@cluster0.s2mg5td.mongodb.net/bookit?retryWrites=true&w=majority&appName=Cluster0
   FRONTEND_URL = (leave empty for now, will update after frontend deployment)
   ```

   Optional (for email notifications):
   ```
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 465
   SMTP_SECURE = true
   SMTP_USER = your@email.com
   SMTP_PASS = your_app_password
   FROM_EMAIL = "Highway Delite" <no-reply@yourdomain.com>
   ```

5. **Click "Create Web Service"** and wait for deployment (5-10 minutes)

6. **Copy Backend URL**: After deployment, copy the URL (e.g., `https://travel-booking-backend.onrender.com`)

## Step 3: Deploy Frontend to Render

1. **Create Static Site**:
   - Go back to Render Dashboard
   - Click **"New +"** → **"Static Site"**

2. **Connect Same Repository**:
   - Select your repository again

3. **Configure Frontend**:
   - **Name**: `travel-booking-frontend`
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```
   (Use the backend URL you copied in Step 2)

5. **Click "Create Static Site"** and wait for deployment

6. **Copy Frontend URL**: After deployment, copy the URL (e.g., `https://travel-booking-frontend.onrender.com`)

## Step 4: Update Backend CORS

1. **Go back to Backend Service** in Render Dashboard

2. **Update Environment Variables**:
   - Find `FRONTEND_URL` variable
   - Set value to your frontend URL from Step 3

3. **Manual Deploy** (if needed):
   - Click "Manual Deploy" → "Deploy latest commit"

## Step 5: Seed Database (Optional)

If you want to add demo experiences to your production database:

1. In Render Backend service, go to **"Shell"** tab
2. Run: `node seed.js`
3. Wait for "Seeded experience" message

## Step 6: Test Your Live App! 🎉

1. Visit your frontend URL
2. Test the complete booking flow:
   - Browse experiences
   - Select date and slot
   - Apply promo code (SAVE10 or FLAT100)
   - Complete booking
   - Check confirmation page

## 🔍 Troubleshooting

**Backend won't start:**
- Check logs in Render dashboard
- Verify all environment variables are set
- Make sure MONGO_URI is correct with URL-encoded password

**Frontend can't connect to backend:**
- Verify VITE_API_URL is set correctly
- Check CORS settings in backend
- Make sure FRONTEND_URL is updated in backend

**Database connection fails:**
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MONGO_URI format and credentials

## 📝 Important Notes

- Free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- Backend deploys automatically on git push
- Frontend rebuilds automatically on git push

## 🎊 Your App is Live!

Share your URLs:
- **Frontend**: https://your-app.onrender.com
- **API**: https://your-backend.onrender.com/api/experiences
