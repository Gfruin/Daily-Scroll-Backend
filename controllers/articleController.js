//require express and router and models
const express = require('express');
const router = express.Router();
const Article = require('../models/article')
const User = require('../models/user')
const superagent = require('superagent')
// const apiKey = require('./apiKey')
const API_KEY = process.env.API_KEY
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
	try {
	
		// find user and store user's data in variable foundUser 
		// via req.session.userDbId or w/e
		const foundUser = await User.findById(req.session.userDBId)
		console.log(foundUser, 'here is the user');

		const newArticle = {
			title: req.body.title,
			description: req.body.description,
			category: req.body.category,	
			user: foundUser
		}
	
		console.log(newArticle, 'this is the newArticle');
		const createdArticle = await Article.create(newArticle)
		// res.json({
		// 	status: 200,
		// 	data: createdArticle
		// })
		console.log("this is the created article: ", createdArticle);
		
		foundUser.articles.push(createdArticle);
		
		const savedUser = await foundUser.save((err) => {
			
			console.log(savedUser, 'saved a user');
			
			const dataToSend = {
				newArticle: createdArticle,
				updatedUser: savedUser
			}

			res.json({
				status: 200,
				data: dataToSend
			})
		})

	} catch(err) {
		next(err)
	}


}) //end of article creation route

// article show route

router.get('/:id', async (req,res,next) => {
	try {
		const foundArticle = await 
			Article.findById(req.params.id).populate({
				path: 'comments',
				populate: {
					path: 'user'
				}				
			})
		
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
}) //end of delete route

//article update route

router.put('/:id', async (req,res,next) => {
	try {
		const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.json({
			status: 200,
			data: updatedArticle
		})

	} catch(err) {
		next(err)
	}
}) // end article update route 


//fetch the news api data by search term

router.get('/news-everything/:searchTerm', async (req,res,next) => {
	try {
		


		let allData = await superagent.get(`https://newsapi.org/v2/everything?q=${req.params.searchTerm}&apiKey=${API_KEY}`)
		
		console.log(allData);

		allData = JSON.parse(allData.text)

		const allDataSearches = await allData.articles.map(article => {
		return {
			author: article.author,
			title: article.title,
			url: article.url,
			source: article.source.name,
			description: article.description,
			image: article.urlToImage
		}
	}) 
	res.json({
		status: 200,
		data: allDataSearches
	})
} catch(err) {
	next(err)
}
})

//fetch news from the news api by top-headlines: country

router.get('/news-country/:searchTerm', async (req, res, next) => {
    try {
        let countryNews = await superagent.get(`https://newsapi.org/v2/top-headlines?country=${req.params.search}&apiKey=${API_KEY}`)
        console.log(countryNews);
        countryNews = JSON.parse(countryNews.text)
        const countryNewsSearches = await countryNews.articles.map(article => {
            return {
                author: article.author,
                title: article.title,
                url: article.url,
                source: article.source.name,
                description: article.description
            }
        })
        res.json({
            status: 200,
            data: countryNewsSearches
        })
    } catch (err) {
        next(err)
    }
})

// router.get('/news-source/:searchTerm', async (req,res,next) => {
// 	try {
// 	let allData = await superagent.get(`https://newsapi.org/v2/top-headlines?sources=${req.params.search}&apiKey=${API_KEY}`)
// 	console.log(allData);

// router.get('/news-everything/:searchTerm', async (req,res,next) => {
// 	try {
// 	let allData = await superagent.get(`https://newsapi.org/v2/everything?q=${req.params.search}&apiKey=${API_KEY}`)
// 	console.log(allData);






// // export router

module.exports = router;