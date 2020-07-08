// Dependencies
const express = require('express');
const Issue = require('../models/issue.js');
const seed = require('../models/issueSeed.js');

// Config
const router = express.Router();

// Routes

// FOR TESTING PURPOSES
router.get('/seed', async (req, res) => {
  await Issue.collection.drop();
  await Issue.create(seed);
  res.redirect('/projects');
});

router.get('/', async (req, res) => {
  const issues = await Issue.find({});
  res.render('projects/index.ejs', {
    issues: issues
  });
});

router.post('/issues', async (req, res) => {
  await Issue.create(req.body);
  res.redirect('/projects');
});

router.get('/issues/new', (req, res) => {
  res.render('projects/new.ejs');
});

router.get('/issues/:id', async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  res.render('projects/show.ejs', {
    issue: issue
  });
});

router.get('/issues/:id/edit', async (req, res) => {
  res.render('projects/edit.ejs');
});

// Export router
module.exports = router;
