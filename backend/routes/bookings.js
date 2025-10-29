// routes/bookings.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Experience = require('../models/Experience');
const Booking = require('../models/Booking');
const shortUUID = require('short-uuid');
const nodemailer = require('nodemailer');

const router = express.Router();

// GET /api/bookings - Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// nodemailer transport (configure in index.js or create local)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE === 'true'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendBookingEmail(to, booking) {
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const subject = `Booking confirmed — Ref ${booking.ref}`;
  const html = `
    <div style="font-family: Arial, sans-serif; color:#111">
      <h2>Booking Confirmed</h2>
      <p>Ref: <strong>${booking.ref}</strong></p>
      <p>Experience: <strong>${booking.title}</strong></p>
      <p>Date: <strong>${booking.date}</strong> at <strong>${booking.slotTime}</strong></p>
      <p>Qty: ${booking.qty}</p>
      <p>Total: ₹${booking.total}</p>
      <hr/>
      <p>Thank you for booking with Highway Delite.</p>
    </div>
  `;
  await transporter.sendMail({ from, to, subject, html });
}

// POST /api/bookings
router.post('/',
  body('experienceId').notEmpty(),
  body('date').notEmpty(),
  body('slotId').notEmpty(),
  body('qty').isInt({ min: 1 }),
  body('price').isNumeric(),
  body('user.name').notEmpty(),
  body('user.email').isEmail(),
  async (req, res) => {
    console.log('📥 Received booking request:', JSON.stringify(req.body, null, 2));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { experienceId, date, slotId, qty = 1, price, user, promo } = req.body;
    const qtyInt = Number(qty);
    
    console.log('✅ Validation passed. Processing booking...');

    try {
      // Atomic decrement: find experience and decrement slot capacity if available
      const query = { _id: experienceId, "slots.date": date };
      const update = { $inc: { "slots.$[d].slots.$[s].capacity": -qtyInt } };
      const options = { new: true, arrayFilters: [{ "d.date": date }, { "s.id": slotId, "s.capacity": { $gte: qtyInt } }] };

      const updated = await Experience.findOneAndUpdate(query, update, options).exec();

      if (!updated) return res.status(404).json({ error: 'Experience or date not found' });

      // locate slot to verify capacity is not negative
      const dateObj = (updated.slots || []).find(d => d.date === date);
      if (!dateObj) return res.status(404).json({ error: 'Date not found' });

      const slotObj = (dateObj.slots || []).find(s => s.id === slotId);
      if (!slotObj) return res.status(409).json({ error: 'Slot not available' });

      if (slotObj.capacity < 0) {
        // rollback increment
        await Experience.updateOne({ _id: experienceId, "slots.date": date }, { $inc: { "slots.$[d].slots.$[s].capacity": qtyInt } }, { arrayFilters: [{ "d.date": date }, { "s.id": slotId }] });
        return res.status(409).json({ error: 'Insufficient capacity' });
      }

      // compute pricing
      const subtotal = price * qtyInt;
      const promoDiscount = promo?.discountAmount ? Number(promo.discountAmount) : 0;
      const taxes = Math.round((subtotal - promoDiscount) * 0.06);
      const total = subtotal - promoDiscount + taxes;

      const ref = shortUUID.generate().slice(0, 8).toUpperCase();

      const booking = new Booking({
        ref,
        experienceId,
        title: updated.title,
        date,
        slotId,
        slotTime: slotObj.time,
        qty: qtyInt,
        price,
        subtotal,
        taxes,
        total,
        promo: promo ? { code: promo.code, discountAmount: promoDiscount } : undefined,
        user
      });

      await booking.save();
      
      console.log('✅ Booking saved to database:', ref);

      try {
        await sendBookingEmail(user.email, booking);
        console.log('✅ Confirmation email sent');
        return res.status(201).json({ success: true, ref });
      } catch (emailErr) {
        console.error('❌ Email failed:', emailErr);
        return res.status(201).json({ success: true, ref, warning: 'Booking created but email failed' });
      }
    } catch (err) {
      console.error('❌ Server error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
