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

// Routes
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

issuesRouter.get('/issues/new', isAuthenticated, (req, res) => {
	res.render('issues/new.ejs', {
		boardKey: req.board.key,
		baseUrl: req.baseUrl
	});
});

issuesRouter.route('/issues/:id')
	.get(isAuthenticated, async (req, res) => {
		const issue = await Issue.findById(req.params.id);
		res.render('issues/show.ejs', {
			issue: issue,
			baseUrl: req.baseUrl
		});
	})
	.put(isAuthenticated, async (req, res) => {
		const id = req.params.id;
		await Group.findByIdAndUpdate(id, req.body);
		res.redirect(req.baseUrl);
	})
	.delete(isAuthenticated, async (req, res) => {
		await Group.findByIdAndRemove(req.params.id, {
			useFindAndModify: false
		});
		res.redirect(req.baseUrl);
	});

issuesRouter.get('/issues/:id/edit', isAuthenticated, async (req, res) => {
	const issue = await getIssue(req.params.id);
	res.render('issues/edit.ejs', {
		issue: issue,
		baseUrl: req.baseUrl
	});
});

// Export issuesRouter
export default issuesRouter;
