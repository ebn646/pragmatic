// Dependencies
const express = require('express');

// Config
const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.send('Hello world!');
});

// Export router
module.exports = router;
