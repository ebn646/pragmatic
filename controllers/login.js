// Dependencies
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/users.js';

// Config
const loginRouter = express.Router();

// Routers
loginRouter
	.route('/')
	.get((req, res) => {
		res.render('login/login.ejs', {title: 'Login'});
	})
	.post(async (req, res) => {
		const user = await User.findOne({email: req.body.email}).catch(err =>
			console.log(err.message)
		);
		const passwordMatches = user
			? bcrypt.compareSync(req.body.password, user.password)
			: false;

		if (user && passwordMatches) {
			req.session.user = user;
			res.redirect('/boards');
		} else {
			res.send('Invalid email or password');
		}
	});

// Export
export default loginRouter;
