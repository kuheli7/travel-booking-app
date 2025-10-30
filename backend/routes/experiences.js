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

  // Normalize image URLs: some seeded docs reference local paths in the repo
  // which won't be available from the deployed site. Map those filenames to
  // remote image URLs or leave absolute URLs as-is.
  const imageMap = {
    'Nandi Hills Sunrise.jpg': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop',
    'kayaking2.jpg': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    'bungee jumping.jpg': 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80'
  };

  const transformed = items.map(item => {
    const out = { ...item };
    const src = (item.imageUrl || '').toString();
    if (src.startsWith('http')) {
      out.image = src;
    } else if (src.includes('/src/assets/')) {
      const parts = src.split('/');
      const filename = parts[parts.length - 1];
      out.image = imageMap[filename] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop';
    } else {
      out.image = src || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop';
    }
    return out;
  });

  res.json(transformed);
});

// GET /api/experiences/:id
router.get('/:id', async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ error: 'Not found' });
    // same image normalization for single item
    const src = (exp.imageUrl || '').toString();
    if (src.startsWith('http')) {
      exp.image = src;
    } else if (src.includes('/src/assets/')) {
      const parts = src.split('/');
      const filename = parts[parts.length - 1];
      const imageMap = {
        'Nandi Hills Sunrise.jpg': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop',
        'kayaking2.jpg': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'bungee jumping.jpg': 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80'
      };
      exp.image = imageMap[filename] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop';
    } else {
      exp.image = src || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop';
    }
    res.json(exp);
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

module.exports = router;
