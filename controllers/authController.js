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
}) //end of registration route

//login route

router.post('/login', async (req,res,next) => {
	try{
		const foundUser = await User.findOne({'username': req.body.username});
		if(foundUser) {
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true) {
				req.session.message = '';
				req.session.logged = true;
				req.session.userDBId = foundUser._id;
				req.session.username = foundUser.username
				console.log(req.session, 'You are successfully logged in!');
				res.json({
					status: 200,
					data: foundUser
				})
			} else {
				req.session.message = 'Username or password is incorrect!'
				res.json({
					status: 200,
					data: req.session.message
				})
			}
		}

	} catch(err) {
		next(err)

	}
}) //end of login route

router.get('/logout', async (req,res,next) => {
	req.session.destroy((err) => {
		if(err){
			next(err)
		} else {
			res.json({
				status: 200,
				data: 'logged out!'
			})
		}
	})
})





module.exports = router;