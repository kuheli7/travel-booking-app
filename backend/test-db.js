require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('./models/Experience');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    const experiences = await Experience.find();
    console.log(`Found ${experiences.length} experiences:`);
    experiences.forEach(exp => {
      console.log(`- ${exp.title} (${exp._id})`);
    });
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
