// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  title: String,
  date: String,
  slotId: String,
  slotTime: String,
  qty: { type: Number, default: 1 },
  price: Number,
  subtotal: Number,
  taxes: Number,
  total: Number,
  promo: { code: String, discountAmount: Number },
  user: { name: String, email: String }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
