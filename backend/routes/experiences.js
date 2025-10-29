// routes/experiences.js
const express = require('express');
const Experience = require('../models/Experience');
const router = express.Router();

// GET /api/experiences/ids - Get list of experience IDs and titles for easy testing
router.get('/ids', async (req, res) => {
  try {
    const items = await Experience.find().select('_id title').lean();
    const list = items.map(item => ({
      id: item._id.toString(),
      title: item.title
    }));
    res.json({ experiences: list });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/experiences
router.get('/', async (req, res) => {
  const items = await Experience.find().lean();
  res.json(items);
});

// GET /api/experiences/:id
router.get('/:id', async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ error: 'Not found' });
    res.json(exp);
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

module.exports = router;
