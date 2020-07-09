// Dependencies
const express = require('express');
const Board = require('../models/boards.js');

// Config
const router = express.Router();

// Authentication
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// Routes
router.get('/', isAuthenticated, (req, res) => {
  res.render('boards/index.ejs');
});

// Export router
module.exports = router;
