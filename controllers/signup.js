// Dependencies
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/users.js';

// Config
const signupRouter = express.Router();

// Routers
signupRouter.route('/')
	.get((req, res) => {
		res.render('signup/signup.ejs');
	})
	.post(async (req, res) => {
		req.body.password = bcrypt.hashSync(
			req.body.password, bcrypt.genSaltSync(10)
		);
		await User.create(req.body).catch(err => console.log(err.message));
		res.redirect('/');
	});

// Export
export default signupRouter;