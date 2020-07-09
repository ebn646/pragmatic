// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

// Config
const router = express.Router();

// Routers
router.route('/')
  .get((req, res) => {
    res.render('signup/signup.ejs');
  })
  .post(async (req, res) => {
    req.body.password = bcrypt.hashSync(
      req.body.password, bcrypt.genSaltSync(10)
    );
    await User.create(req.body);
    res.redirect('/projects');
  });

// Export
module.exports = router;
