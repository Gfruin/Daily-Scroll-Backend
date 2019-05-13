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
})

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


})





// // export router

module.exports = router;