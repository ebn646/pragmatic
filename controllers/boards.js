// Dependencies
const express = require('express');
const Board = require('../models/boards.js');
const issuesRouter = require('./issues.js');

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
router.route('/')
	.get(isAuthenticated, async (req, res) => {
		const boards = await Board.find({
			userId: req.session.user._id
		});
		res.render('boards/index.ejs', {
			boards: boards,
			title: 'Boards'
		});
	})
	.post(isAuthenticated, async (req, res) => {
		req.body.userId = req.session.user._id;
		await Board.create(req.body).catch(err => console.log(err.message));
		res.redirect('/boards');
	});

router.get('/new', isAuthenticated, (req, res) => {
	res.render('boards/new.ejs');
});

router.use(
	'/key/:boardKey', async (req, res, next) => {
		req.board = await Board.findOne({
			userId: req.session.user._id,
			key: req.params.boardKey
		});
		if (req.board) {
			next();
		} else {
			res.send('404');
		}
	}, issuesRouter
);

// Export router
module.exports = router;