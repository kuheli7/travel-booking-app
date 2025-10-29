// models/Experience.js
const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  id: { type: String, required: true },
  time: { type: String, required: true },
  capacity: { type: Number, required: true, default: 0 }
}, { _id: false });

const DateSlotsSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  slots: { type: [SlotSchema], default: [] }
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  price: Number,
  imageUrl: String,
  slots: { type: [DateSlotsSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
