// routes/promo.js
const express = require('express');
const router = express.Router();

/**
 * Simple promo validation route.
 * POST /api/promo/validate
 * body: { code: "SAVE10" }
 */
const PROMOS = {
  SAVE10: { code: 'SAVE10', type: 'percentage', amount: 10 },
  FLAT100: { code: 'FLAT100', type: 'flat', amount: 100 }
};

// GET /api/promo - Get all available promo codes
router.get('/', (req, res) => {
  const promoList = Object.values(PROMOS);
  return res.json({ 
    promos: promoList,
    usage: "To validate a promo code, POST to /api/promo/validate with body: { \"code\": \"SAVE10\" }"
  });
});

// GET /api/promo/validate - Show usage instructions
router.get('/validate', (req, res) => {
  return res.json({
    message: "This endpoint accepts POST requests only",
    usage: "POST /api/promo/validate",
    body: { code: "SAVE10" },
    availableCodes: Object.keys(PROMOS)
  });
});

router.post('/validate', async (req, res) => {
  const code = (req.body?.code || '').trim().toUpperCase();
  if (!code) return res.status(400).json({ valid: false, message: 'No code provided' });
  const found = PROMOS[code];
  if (!found) return res.json({ valid: false, message: 'Invalid code' });
  return res.json({ valid: true, promo: found });
});

module.exports = router;
