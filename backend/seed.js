// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('./models/Experience');
const { getNextNDatesISO } = require('./utils/dateUtils');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookit';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected');

  // Clear existing experiences
  await Experience.deleteMany({});

  const dates = getNextNDatesISO(5);
  const templateSlots = [
    { id: 's1', time: '09:00 AM', capacity: 5 },
    { id: 's2', time: '11:00 AM', capacity: 3 },
    { id: 's3', time: '02:00 PM', capacity: 0 },
    { id: 's4', time: '04:00 PM', capacity: 8 }
  ];

  const createSlots = () => dates.map(date => ({
    date,
    slots: templateSlots.map(s => ({ ...s, id: `${s.id}-${date}` }))
  }));

  const experiences = [
    {
      title: 'Kayaking',
      location: 'Udupi',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 999,
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop',
      slotTimes: templateSlots,
      slots: createSlots()
    },
    {
      title: 'Nandi Hills Sunrise',
      location: 'Bangalore',
      description: 'Sunrise trekking and scenic views. Small groups only.',
      price: 899,
      imageUrl: '/src/assets/Nandi Hills Sunrise.jpg',
      slotTimes: [
        { id: 's5', time: '05:00 AM', capacity: 10 },
        { id: 's6', time: '05:30 AM', capacity: 5 }
      ],
      slots: dates.map(date => ({
        date,
        slots: [
          { id: `s5-${date}`, time: '05:00 AM', capacity: 10 },
          { id: `s6-${date}`, time: '05:30 AM', capacity: 5 }
        ]
      }))
    },
    {
      title: 'Coffee Trail',
      location: 'Coorg',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop',
      slotTimes: [
        { id: 's7', time: '08:00 AM', capacity: 12 },
        { id: 's8', time: '10:00 AM', capacity: 8 },
        { id: 's9', time: '03:00 PM', capacity: 6 }
      ],
      slots: dates.map(date => ({
        date,
        slots: [
          { id: `s7-${date}`, time: '08:00 AM', capacity: 12 },
          { id: `s8-${date}`, time: '10:00 AM', capacity: 8 },
          { id: `s9-${date}`, time: '03:00 PM', capacity: 6 }
        ]
      }))
    },
    {
      title: 'Kayaking',
      location: 'Udupi, Karnataka',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 999,
      imageUrl: '/src/assets/kayaking2.jpg',
      slotTimes: [
        { id: 's10', time: '09:00 AM', capacity: 5 },
        { id: 's11', time: '02:00 PM', capacity: 3 }
      ],
      slots: dates.map(date => ({
        date,
        slots: [
          { id: `s10-${date}`, time: '09:00 AM', capacity: 5 },
          { id: `s11-${date}`, time: '02:00 PM', capacity: 3 }
        ]
      }))
    },
    {
      title: 'Boat Cruise',
      location: 'Sunderban',
      description: 'Relaxing cruise with scenic views. Light refreshments included.',
      price: 999,
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
      slotTimes: [
        { id: 's12', time: '10:00 AM', capacity: 20 },
        { id: 's13', time: '03:00 PM', capacity: 15 }
      ],
      slots: dates.map(date => ({
        date,
        slots: [
          { id: `s12-${date}`, time: '10:00 AM', capacity: 20 },
          { id: `s13-${date}`, time: '03:00 PM', capacity: 15 }
        ]
      }))
    },
    {
      title: 'Bungee Jumping',
      location: 'Manali',
      description: 'Adrenaline rush with safety harness and trained instructors.',
      price: 999,
      imageUrl: '/src/assets/bungee jumping.jpg',
      slotTimes: [
        { id: 's14', time: '10:00 AM', capacity: 4 },
        { id: 's15', time: '01:00 PM', capacity: 2 },
        { id: 's16', time: '04:00 PM', capacity: 0 }
      ],
      slots: dates.map(date => ({
        date,
        slots: [
          { id: `s14-${date}`, time: '10:00 AM', capacity: 4 },
          { id: `s15-${date}`, time: '01:00 PM', capacity: 2 },
          { id: `s16-${date}`, time: '04:00 PM', capacity: 0 }
        ]
      }))
    },
    {
      title: 'Coffee Trail',
      location: 'Coorg',
      description: 'Scenic coffee plantation trails and tasting.',
      price: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop',
      slotTimes: [
        { id: 's17', time: '08:00 AM', capacity: 10 },
        { id: 's18', time: '02:00 PM', capacity: 8 }
      ],
      slots: dates.map(date => ({
        date,
        slots: [
          { id: `s17-${date}`, time: '08:00 AM', capacity: 10 },
          { id: `s18-${date}`, time: '02:00 PM', capacity: 8 }
        ]
      }))
    }
  ];

  // Insert all experiences
  const inserted = await Experience.insertMany(experiences);
  console.log(`Seeded ${inserted.length} experiences`);
  inserted.forEach(exp => console.log(`- ${exp.title} (${exp.location}): ${exp._id}`));
  
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
