const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res, next) => {
	console.log(req.body, 'this is the session')
	try {
		const createdUser = await User.create(req.body)
		req.session.logged = true;
		req.session.username = req.body.username;
		res.json({
			status: 200,
			data: 'login was successful'
		})
	} catch(err) {
		console.log(err);
		res.send(err)
	}


})





module.exports = router; 