// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

// Config
const router = express.Router();

// Routers
router.route('/')
  .get((req, res) => {
    res.render('login/login.ejs');
  });

// Export
module.exports = router;
