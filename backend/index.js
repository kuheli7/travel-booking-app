// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const experiencesRouter = require('./routes/experiences');
const bookingsRouter = require('./routes/bookings');
const promoRouter = require('./routes/promo');

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI is required");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo connected"))
  .catch(err => { console.error("Mongo connection error", err); process.exit(1); });

app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

// Root route - helpful for health checks and quick verification
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Highway Delite API is running',
    endpoints: [
      '/api/experiences',
      '/api/experiences/ids',
      '/api/bookings',
      '/api/promo'
    ]
  });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
