require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('./models/Booking');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    const bookings = await Booking.find();
    console.log(`\nFound ${bookings.length} bookings:\n`);
    bookings.forEach(booking => {
      console.log(`Ref: ${booking.ref}`);
      console.log(`  Experience: ${booking.title}`);
      console.log(`  Date: ${booking.date} at ${booking.slotTime}`);
      console.log(`  User: ${booking.user.name} (${booking.user.email})`);
      console.log(`  Total: ₹${booking.total}`);
      console.log('');
    });
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
