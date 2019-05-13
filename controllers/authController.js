const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


//GET route

router.get('/login', async (req,res,next) => {
	try {
		res.json({
			status: 200,
			data: 'you are not logged in'
		})
	} catch(err) {
		next(err)
	}
}); //end of get route


//create registration with bcrypt

router.post('/register', async (req,res,next) => {
	console.log('you are hitting the register route');
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSalt(10));
	const userDBEntry = {};
	userDBEntry.username = req.body.username;
	userDBEntry.password = passwordHash

	try {
		const createdUser = await User.create(userDBEntry);
		console.log(createdUser);
		req.session.logged = true;
		req.session.userDBId = createdUser._id;
		req.session.username = createdUser.username
		res.json({
			status: 200,
			data: createdUser
		})

	} catch(err) {
		next(err)
	}
})