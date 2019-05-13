//require express and router and models
const express = require('express');
const router = express.Router();
const Article = require('../models/article')
const superagent = require('superagent')
// const apiKey = require('./apiKey')

// article index route

router.get('/', async (req,res,next) => {
	console.log(req.body, 'this is the user article index route');
	try {
		const foundArticles = await Article.find()
		res.json({
			status: 200,
			data: foundArticles
		})
	} catch(err) {
		next(err)
	}
}) //end of article index route

router.post('/', async (req,res,next) => {
	console.log('this is the article create route');
	const newArticle = {
		title: req.body.title,
		description: req.body.description,
		category: req.body.category
		// user: req.session.username
	}
	try {
		const createdArticle = await Article.create(newArticle)
		res.json({
			status: 200,
			data: createdArticle
		})

	} catch(err) {
		next(err)
	}


}) //end of article creation route

// article show route

router.get('/:id', async (req,res,next) => {
	try {
		const foundArticle = await 
		Article.findById(req.params.id)
		// Article.populate({ 
		// 	path: 'comments',
		// 	populate: {
		// 		path: 'user'
		// 	}

		// })
		res.json({
			status: 200,
			data: foundArticle
		})
	} catch(err){
		next(err)
	}
}) //end of article show route

//article delete route
router.delete('/:id', async (req,res,next) => {
	//need to add req.session.userDBId == null when I set up the user
	try {
		//need to add foundUser by findById 
		const deletedArticle = await Article.findByIdAndRemove(req.params.id)
		//need to remove the article from the user's posts
		//need to update the user's db info
		res.json({
			status: 200,
			data: deletedArticle
		})
	} catch(err) {
		next(err)
	}
})





// // export router

module.exports = router;