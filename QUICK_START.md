# 🚀 Quick Start Guide - Highway Delite BookIt

## ✅ What's Been Completed

### Frontend ✨
- ✅ Home page with experience grid and search
- ✅ Details page with date/slot selection
- ✅ Checkout page with user form and promo codes
- ✅ Result/Confirmation page with booking reference
- ✅ All pages connected with React Router
- ✅ Real-time promo validation
- ✅ Dynamic date generation (5 consecutive days)
- ✅ Responsive design with TailwindCSS
- ✅ API integration ready

### Backend 🔧
- ✅ Express server with MongoDB
- ✅ Experience and Booking models
- ✅ Atomic capacity decrement (prevents overbooking)
- ✅ Email notifications with Nodemailer
- ✅ Promo code validation endpoint
- ✅ RESTful API with CORS enabled

---

## 🏃 How to Run

### **Step 1: Start Frontend** (Already Running)

The frontend should be running on `http://localhost:5173`

If not, run:
```powershell
cd "c:\Christ Trimester 1\FSD\Internshala\29.10.25 Assignment\travel-booking-app"
npm run dev
```

### **Step 2: Configure Backend Database**

Before starting the backend, you need to set up MongoDB Atlas:

1. **Create MongoDB Atlas Account (Free)**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free tier (M0)
   - Create a cluster (choose nearest region)

2. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `bookituser`
   - Password: Choose a strong password (save it!)
   - Database User Privileges: "Read and write to any database"

3. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For testing: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production: Use specific IP addresses

4. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add `/bookit` before the `?` to specify database name

   Example:
   ```
   mongodb+srv://bookituser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
   ```

5. **Update Backend `.env` File**

   Edit `backend/.env`:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://bookituser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   FROM_EMAIL="Highway Delite" <no-reply@gmail.com>
   ```

### **Step 3: Set Up Gmail for Email Notifications**

1. Enable 2FA on Gmail: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Highway Delite BookIt"
   - Copy the 16-character password
3. Update `SMTP_USER` and `SMTP_PASS` in `backend/.env`

### **Step 4: Seed Database with Demo Data**

```powershell
cd "c:\Christ Trimester 1\FSD\Internshala\29.10.25 Assignment\travel-booking-app\backend"
npm run seed
```

Expected output:
```
Connected
Seeded experience id: 67xxxxxxxxxxxxxxxx
```

### **Step 5: Start Backend Server**

```powershell
npm run dev
```

Expected output:
```
Mongo connected
API running on http://localhost:4000
```

---

## 🧪 Testing the Complete Flow

### 1. **Browse Experiences**
   - Open: http://localhost:5173
   - You should see experience cards on the home page
   - Try searching for "Kayaking"

### 2. **View Details**
   - Click "View Details" on any experience
   - Select a date (5 consecutive days shown)
   - Select a time slot
   - Adjust quantity
   - Click "Confirm"

### 3. **Checkout**
   - Fill in your name and email
   - (Optional) Try promo codes:
     - `SAVE10` - 10% discount
     - `FLAT100` - ₹100 flat discount
   - Check the terms checkbox
   - Click "Pay and Confirm"

### 4. **Confirmation**
   - You'll see "Booking Confirmed!" message
   - Booking reference number displayed (e.g., `BK-ABC123`)
   - Check your email for confirmation
   - Click "Back to Home" to book another experience

### 5. **Verify in Database**
   - Go to MongoDB Atlas dashboard
   - Database → Browse Collections
   - You should see:
     - `experiences` collection (from seed)
     - `bookings` collection (your booking)

---

## 🔧 Troubleshooting

### Frontend shows "localhost refused to connect"
- **Issue**: Backend is not running
- **Solution**: Follow Step 5 above to start the backend

### "Mongo connection error"
- **Issue**: Incorrect MongoDB URI or IP not whitelisted
- **Solution**: 
  - Check `MONGO_URI` in `backend/.env`
  - Verify IP whitelist in MongoDB Atlas (use 0.0.0.0/0 for testing)

### "Email send failed" warning
- **Issue**: Gmail SMTP not configured or app password incorrect
- **Solution**: 
  - Verify `SMTP_USER` and `SMTP_PASS` in `backend/.env`
  - Ensure 2FA is enabled and app password is correct
  - Note: Booking still succeeds even if email fails

### Promo code doesn't work
- **Issue**: Backend not connected or promo endpoint failing
- **Solution**: 
  - Check backend is running on port 4000
  - Check browser console for API errors
  - Verify `VITE_API_URL` in frontend `.env`

### Capacity not decreasing
- **Issue**: Database not updating
- **Solution**: 
  - Check MongoDB connection
  - Verify experience ID exists in database
  - Check backend logs for errors

---

## 📊 Available Promo Codes

- **SAVE10** - 10% discount on total
- **FLAT100** - ₹100 flat discount

---

## 🎯 API Endpoints

### Experiences
- `GET http://localhost:4000/api/experiences` - Get all experiences
- `GET http://localhost:4000/api/experiences/:id` - Get single experience

### Promo Codes
- `POST http://localhost:4000/api/promo/validate` - Validate promo code
  ```json
  { "code": "SAVE10" }
  ```

### Bookings
- `POST http://localhost:4000/api/bookings` - Create booking
  ```json
  {
    "experienceId": "67...",
    "date": "2025-10-29",
    "slotId": "s2-2025-10-29",
    "qty": 1,
    "price": 999,
    "user": {
      "name": "John Doe",
      "email": "test@example.com"
    },
    "promo": {
      "code": "SAVE10",
      "discountAmount": 99
    }
  }
  ```

---

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string updated in `backend/.env`
- [ ] Gmail SMTP configured
- [ ] Backend dependencies installed
- [ ] Database seeded
- [ ] Backend server running (port 4000)
- [ ] Frontend running (port 5173)
- [ ] Test booking completed successfully
- [ ] Email received
- [ ] Booking visible in MongoDB Atlas

---

## 🎉 You're All Set!

Once everything is running:
1. Frontend: http://localhost:5173
2. Backend: http://localhost:4000
3. MongoDB: Check Atlas dashboard

**Next Steps:**
- Add more experiences to the database
- Customize email templates
- Deploy to production (Render for backend, Vercel for frontend)
- Add payment gateway integration

Enjoy building with Highway Delite BookIt! 🚀
