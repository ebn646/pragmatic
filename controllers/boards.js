// Dependencies
import express from 'express';
import Board from '../models/boards.js';
import Group from '../models/groups.js';
import Issue from '../models/issues.js';
import issuesRouter from './issues.js';

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
router
	.route('/')
	.get(isAuthenticated, async (req, res) => {
		// Find all boards of the current user
		const boards = await Board.find({
			userId: req.session.user._id,
		});
		// Render page
		res.render('boards/index.ejs', {boards: boards, title: 'Boards'});
	})
	.post(isAuthenticated, async (req, res) => {
		// Create new board
		req.body.userId = req.session.user._id;
		const board = await Board.create(req.body).catch(err =>
			console.log(err.message)
		);
		// Create backlog group in new board
		Group.create({boardId: board._id});
		// Redirect
		res.redirect('/boards');
	});

router.get('/new', isAuthenticated, (req, res) => {
	res.render('boards/new.ejs');
});

router.delete('/:boardId', async (req, res) => {
	const boardId = req.params.boardId;
	// Delete issues associated with board
	await Issue.deleteMany({boardId: boardId}).catch(err =>
		console.log(err.message)
	);
	// Delete groups associated with board
	await Group.deleteMany({boardId: boardId});
	// Delete board
	await Board.findByIdAndDelete(boardId).catch(err => console.log(err.message));
	// Redirect
	res.redirect('/boards');
});

// Router for '/boards/_:key'
router.use(
	'/_:boardKey',
	async (req, res, next) => {
		req.board = await Board.findOne({
			userId: req.session.user._id,
			key: req.params.boardKey,
		});
		if (req.board) {
			next();
		} else {
			res.send('404');
		}
	},
	issuesRouter
);

// Export router
export default router;
