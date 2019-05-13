const express = require('express');
const router = express.Router();
const User = require('../models/user');

//user index route
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
}) //end of user index route


//user create route
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


}) //end of user create route

//user show route
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
}) //end of user show route


//user delete route
router.delete('/:id', async (req,res,next) => {
	try {
		const deletedUser = await User.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedUser
		})

	} catch(err) {
		next(err)
	}
}) //end of user delete route

//user edit route

router.get('/:id/edit', async (req,res,next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		res.json({
			status: 200,
			data: foundUser
		})

	} catch(err) {
		next(err)
	}

}) //end of user edit route

//user update route

router.put('/:id', async (req,res,next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
		res.json({
			status: 200,
			data: updatedUser
		})
	} catch(err) {
		next(err)
	}
})






module.exports = router; 