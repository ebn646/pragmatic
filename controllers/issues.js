// Dependencies
import express from 'express';
import Group from '../models/groups.js';

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
	const groups = await Group.find({
		boardId: req.board.id
	});
	const boardKey = req.board.key.toUpperCase();
	res.render('issues/index.ejs', {
		groups: groups,
		baseUrl: req.baseUrl,
		title: `${boardKey} board`,
		boardKey: boardKey
	});
});

issuesRouter.post('/issues', isAuthenticated, async (req, res) => {
	console.log(req.board.id);
	console.log('Body: ', req.body);
	await Group.updateOne({
		boardId: req.board.id,
		name: 'Backlog'
	}, {
		$push: {
			issues: req.body
		}
	});
	res.redirect(`${req.baseUrl}`);
});

issuesRouter.get('/issues/new', isAuthenticated, (req, res) => {
	res.render('issues/new.ejs', {
		boardKey: req.board.key,
		baseUrl: req.baseUrl
	});
});

issuesRouter.route('/issues/:id')
	.get(isAuthenticated, async (req, res) => {
		const issue = await Group.findById(req.params.id);
		res.render('issues/show.ejs', {
			issue: issue,
			baseUrl: req.baseUrl
		});
	})
	.put(isAuthenticated, async (req, res) => {
		const id = req.params.id;
		await Group.findByIdAndUpdate(id, req.body);
		res.redirect(`${req.baseUrl}/issues/${id}`);
	})
	.delete(isAuthenticated, async (req, res) => {
		await Group.findByIdAndRemove(req.params.id, {
			useFindAndModify: false
		});
		res.redirect(req.baseUrl);
	});

issuesRouter.get('/issues/:id/edit', isAuthenticated, async (req, res) => {
	res.render('issues/edit.ejs', {
		id: req.params.id,
		baseUrl: req.baseUrl
	});
});

// Export issuesRouter
export default issuesRouter;
