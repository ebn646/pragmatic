// Dependencies
import express from 'express';
import Group from '../models/groups.js';
import Issue from '../models/issues.js';
import issueSeed from '../models/issueSeed.js';

// Config
const issuesRouter = express.Router();

// Authentication
// eslint-disable-next-line consistent-return
const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect('/login');
};

/*
Routes
*/
// Seed route (for testing purposes)
issuesRouter.get('/seed', isAuthenticated, async (req, res) => {
  // Get backlog information
  const backlog = await Group.findOne({
    name: 'Backlog',
    boardId: req.board.id,
  });

  // Append backlog ID to issue seed
  const newIssues = issueSeed.map((issue) => {
    const newIssue = { ...issue };
    newIssue.groupId = backlog._id;
    newIssue.boardId = req.board.id;
    return newIssue;
  });

  // Delete current issues
  await Issue.deleteMany({ boardId: req.board.id });

  // Create new issues in current board
  await Issue.create(newIssues);

  // Redirect
  res.redirect(req.baseUrl);
});

// Index route
issuesRouter.get('/', isAuthenticated, async (req, res) => {
  // Get relevant variables
  const boardId = req.board.id;
  const groups = await Group.find({ boardId });
  const issues = await Issue.find({ boardId });
  const boardKey = req.board.key;

  // Render
  res.render('issues/index.ejs', {
    groups,
    issues,
    baseUrl: req.baseUrl,
    title: `${boardKey} board`,
  });
});

// Create issue route
issuesRouter.post('/issues', isAuthenticated, async (req, res) => {
  // Delete blank fields
  Object.keys(req.body).forEach((key) => {
    if (!req.body[key]) delete req.body[key];
  });

  // Get relevant variables
  const boardId = req.board.id;
  const backlog = await Group.findOne({ boardId, name: 'Backlog' });

  // Add missing required fields
  req.body.boardId = boardId;
  req.body.groupId = backlog._id;

  // Create new issue and assign to backlog group
  await Issue.create(req.body).catch((err) => res.send(err.message));

  // Redirect
  res.redirect(req.baseUrl);
});

// New route
issuesRouter.get('/issues/new', isAuthenticated, (req, res) => {
  // Render new view
  res.render('issues/new.ejs', {
    boardKey: req.board.key,
    baseUrl: req.baseUrl,
    title: 'New issue',
  });
});

issuesRouter
  .route('/issues/:id')
  // Show route
  .get(isAuthenticated, async (req, res) => {
    // Get relevant variables
    const issue = await Issue.findById(req.params.id).catch((err) =>
      res.send(err.message)
    );
    const group = await Group.findById(issue.groupId).catch((err) =>
      res.send(err.message)
    );
    // Render
    res.render('issues/show.ejs', {
      issue,
      baseUrl: req.baseUrl,
      title: `${req.board.key} issues`,
      groupName: group.name,
    });
  })
  // Update route
  .put(isAuthenticated, async (req, res) => {
    // Obtain group ID
    const group = await Group.findOne({
      boardId: req.board.id,
      name: req.body.sprint,
    });
    const groupId = group._id;
    // Add group ID field to req.body
    req.body.groupId = groupId;
    // Update database
    await Issue.findByIdAndUpdate(req.params.id, req.body);
    // Redirect
    res.redirect(req.baseUrl);
  })
  // Delete route
  .delete(isAuthenticated, async (req, res) => {
    await Issue.findByIdAndRemove(req.params.id, { useFindAndModify: false });
    res.redirect(req.baseUrl);
  });

// Edit route
issuesRouter.get('/issues/:id/edit', isAuthenticated, async (req, res) => {
  // Get relevant variables
  const issue = await Issue.findById(req.params.id);
  const currentGroup = await Group.findById(issue.groupId);
  const groups = await Group.find({ boardId: req.board.id });
  // Render
  res.render('issues/edit.ejs', {
    issue,
    groups,
    currentGroup,
    baseUrl: req.baseUrl,
    title: 'Edit issue',
  });
});

// Create sprint route
issuesRouter.post('/sprint', isAuthenticated, async (req, res) => {
  // Get relevant variables
  const boardId = req.board.id;
  // Get current largest index
  const group = await Group.findOne({ boardId }).sort('-index');
  const newIndex = group.index + 1;
  // Create data for new group
  const newGroup = {
    boardId,
    index: newIndex,
    name: `${req.board.key} Sprint ${newIndex}`,
  };
  // Create new sprint group
  await Group.create(newGroup);
  // Redirect
  res.redirect(req.baseUrl);
});

// Delete sprint route
issuesRouter.delete('/sprint/:groupId', isAuthenticated, async (req, res) => {
  await Group.findByIdAndDelete(req.params.groupId);
  res.redirect(req.baseUrl);
});

// Export
export default issuesRouter;
