# BookIt Backend API

Node.js + Express + MongoDB backend for the Highway Delite travel booking application.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update with your MongoDB Atlas URI and SMTP credentials

   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your@email.com
   SMTP_PASS=your_app_password
   FROM_EMAIL="Highway Delite" <no-reply@yourdomain.com>
   ```

3. **Seed the database:**
   ```bash
   npm run seed
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID

### Promo Codes
- `POST /api/promo/validate` - Validate promo code
  - Body: `{ "code": "SAVE10" }`
  - Available codes: `SAVE10` (10% off), `FLAT100` (₹100 off)

### Bookings
- `POST /api/bookings` - Create a new booking
  - Body:
    ```json
    {
      "experienceId": "<mongo_id>",
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

## MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with password
3. Whitelist your IP address (or use 0.0.0.0/0 for testing)
4. Get connection string and add to `.env` as `MONGO_URI`

## Deployment on Render

1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Add environment variables in Render dashboard
5. Deploy!

## Features

- ✅ RESTful API with Express
- ✅ MongoDB with Mongoose ODM
- ✅ Atomic slot capacity decrement
- ✅ Email notifications with Nodemailer
- ✅ Promo code validation
- ✅ Input validation with express-validator
- ✅ CORS enabled for frontend integration
