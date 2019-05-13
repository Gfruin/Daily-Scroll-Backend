const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', async (req,res,next) => {
	console.log(req.body, 'this is all the users');
	try {
		const allUsers = await User.find();
		res.json({
			status: 200,
			data: allUsers
		})
	} catch(err) {
		next(err)
	}
})



router.post('/', async (req, res, next) => {
	console.log(req.body, 'this is the session')
	try {
		const createdUser = await User.create(req.body)
		req.session.logged = true;
		req.session.username = req.body.username;
		res.json({
			status: 200,
			data: createdUser
		})
	} catch(err) {
		console.log(err);
		next(err)
	}


})

router.get('/:id', async (req,res,next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		res.json({
			status: 200,
			data: foundUser
		})
	} catch(err) {
		console.log(err);
		next(err)
	}
})

router.delete('/:id')




module.exports = router; 