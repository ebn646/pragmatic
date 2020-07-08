// Dependencies
const express = require('express');
const Issue = require('../models/issue.js');
const seed = require('../models/issueSeed.js');

// Config
const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.send('Hello world!');
});

// FOR TESTING PURPOSES
router.get('/seed', async (req, res) => {
  await Issue.collection.drop();
  await Issue.create(seed);
  res.send('Seeding complete!');
});

// Export router
module.exports = router;
