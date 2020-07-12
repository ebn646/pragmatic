// Dependencies
import express from 'express';
import Group from '../models/groups.js';
import Issue from '../models/issues.js';

// Config
const issuesRouter = express.Router();

// Authentication
const isAuthenticated = (req, res, next) => {
	if (req.session.user) {
		return next();
	} else {
		res.redirect('/login');
	}
};

/*
Routes
*/

// Index route
issuesRouter.get('/', isAuthenticated, async (req, res) => {
	// Get relevant variables
	const boardId = req.board.id;
	const groups = await Group.find({ boardId: boardId });
	const issues = await Issue.find({ boardId: boardId });
	const boardKey = req.board.key.toUpperCase();
	// Render
	res.render('issues/index.ejs', {
		groups: groups,
		issues: issues,
		baseUrl: req.baseUrl,
		title: `${boardKey} board`
	});
});

// Create issue route
issuesRouter.post('/issues', isAuthenticated, async (req, res) => {
	// Get relevant variables
	const boardId = req.board.id;
	const backlog = await Group.findOne({name: 'Backlog', boardId: boardId});
	// Add missing required fields
	req.body.boardId = boardId;
	req.body.groupId = backlog._id;
	// Create new issue and assign to backlog group
	await Issue.create(req.body);
	// Redirect
	res.redirect(req.baseUrl);
});

// New route
issuesRouter.get('/issues/new', isAuthenticated, (req, res) => {
	// Render new view
	res.render('issues/new.ejs', {
		boardKey: req.board.key,
		baseUrl: req.baseUrl
	});
});

issuesRouter.route('/issues/:id')
	// Show route
	.get(isAuthenticated, async (req, res) => {
		const issue = await Issue.findById(req.params.id);
		res.render('issues/show.ejs', {
			issue: issue,
			baseUrl: req.baseUrl
		});
	})
	// Update route
	.put(isAuthenticated, async (req, res) => {
		await Issue.findByIdAndUpdate(req.params.id, req.body);
		res.redirect(req.baseUrl);
	})
	// Delete route
	.delete(isAuthenticated, async (req, res) => {
		await Issue.findByIdAndRemove(req.params.id, {
			useFindAndModify: false
		});
		res.redirect(req.baseUrl);
	});

// Edit route
issuesRouter.get('/issues/:id/edit', isAuthenticated, async (req, res) => {
	const issue = await Issue.findById(req.params.id);
	res.render('issues/edit.ejs', {
		issue: issue,
		baseUrl: req.baseUrl
	});
});

// Create sprint route
issuesRouter.post('/sprint', isAuthenticated, async (req, res) => {
	// Get relevant variables
	const boardId = req.board.id;
	// Get current largest index
	const group = await Group.findOne({boardId: boardId}).sort('-index');
	const newIndex = group.index + 1;
	// Create data for new group
	const newGroup = {
		name: `${req.board.key.toUpperCase()} Sprint ${newIndex}`,
		index: newIndex,
		boardId: boardId
	};
	// Create new sprint group
	await Group.create(newGroup);
	// Redirect
	res.redirect(req.baseUrl);
});

issuesRouter.delete('/sprint/:groupId', isAuthenticated, async (req, res) => {
	await Group.findByIdAndDelete(req.params.groupId);
	res.redirect(req.baseUrl);
});

// Export
export default issuesRouter;
