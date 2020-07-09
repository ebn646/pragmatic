// Dependencies
const express = require('express');
const Issue = require('../models/issue.js');
const seed = require('../models/issueSeed.js');

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

// FOR TESTING PURPOSES
router.get('/seed', isAuthenticated, async (req, res) => {
  await Issue.collection.drop();
  await Issue.create(seed);
  res.redirect('/projects');
});

router.get('/', isAuthenticated, async (req, res) => {
  const issues = await Issue.find({});
  res.render('projects/index.ejs', {
    issues: issues
  });
});

router.post('/issues', isAuthenticated, async (req, res) => {
  await Issue.create(req.body);
  res.redirect('/projects');
});

router.get('/issues/new', isAuthenticated, (req, res) => {
  res.render('projects/new.ejs');
});

router.route('/issues/:id')
  .get(isAuthenticated, async (req, res) => {
    const issue = await Issue.findById(req.params.id);
    res.render('projects/show.ejs', {
      issue: issue
    });
  })
  .put(isAuthenticated, async (req, res) => {
    const id = req.params.id;
    await Issue.findByIdAndUpdate(id, req.body);
    res.redirect(`/projects/issues/${id}`);
  })
  .delete(isAuthenticated, async (req, res) => {
    await Issue.findByIdAndRemove(req.params.id, {useFindAndModify: false});
    res.redirect('/projects');
  });

router.get('/issues/:id/edit', isAuthenticated, async (req, res) => {
  res.render('projects/edit.ejs', {
    id: req.params.id
  });
});

// Export router
module.exports = router;
