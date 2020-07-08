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

router.route('/issues/:id')
  .get(async (req, res) => {
    const issue = await Issue.findById(req.params.id);
    res.render('projects/show.ejs', {
      issue: issue
    });
  })
  .put(async (req, res) => {
    const id = req.params.id;
    await Issue.findByIdAndUpdate(id, req.body);
    res.redirect(`/projects/issues/${id}`);
  })
  .delete(async (req, res) => {
    await Issue.findByIdAndRemove(req.params.id, {useFindAndModify: false});
    res.redirect('/projects');
  });

router.get('/issues/:id/edit', async (req, res) => {
  res.render('projects/edit.ejs', {
    id: req.params.id
  });
});

// Export router
module.exports = router;
