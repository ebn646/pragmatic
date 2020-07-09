// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

// Config
const router = express.Router();

// Routers
router.get('/', (req, res) => {
  res.send('This is the login page!');
});

// Export
module.exports = router;
