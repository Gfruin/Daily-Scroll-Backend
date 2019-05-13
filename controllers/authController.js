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

	try {
		const password = req.body.password;
		console.log(password);
		const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		console.log(passwordHash);
		const userDBEntry = {};
		userDBEntry.username = req.body.username;
		userDBEntry.password = passwordHash
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




module.exports = router;