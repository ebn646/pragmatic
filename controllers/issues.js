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

router.get('/', isAuthenticated, async (req, res) => {
  const issues = await Issue.find({boardId: req.board.id});
  console.log(issues);
  res.render('issues/index.ejs', {
    issues: issues,
    boardKey: req.board.key
  });
});

router.post('/issues', isAuthenticated, async (req, res) => {
  req.body.boardId = req.board.id;
  await Issue.create(req.body);
  res.redirect(`/boards/key/${req.board.key}`);
});

router.get('/issues/new', isAuthenticated, (req, res) => {
  res.render('issues/new.ejs', {
    boardKey: req.board.key
  });
});

router.route('/issues/:id')
  .get(isAuthenticated, async (req, res) => {
    const issue = await Issue.findById(req.params.id);
    res.render('issues/show.ejs', {
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
  res.render('issues/edit.ejs', {
    id: req.params.id
  });
});

// Export router
module.exports = router;
