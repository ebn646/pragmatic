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
  })
  .post(async (req, res) => {
    const user = await User.findOne({email: req.body.email}).catch(
      err => console.log(err.message)
    );
    const passwordMatches = user ?
      bcrypt.compareSync(req.body.password, user.password) : false;

    if (user && passwordMatches) {
      req.session.user = user;
      res.redirect('/boards');
    } else {
      res.send('Invalid email or password');
    }
  });

// Export
module.exports = router;
