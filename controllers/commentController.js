const express = require('express');
const router = express.Router();
const Article = require('../models/article')
const User = require('../models/user')
const Comment = require('../models/comment')

//need to build a create route that creates comments and assigns 
//them to their specific user with a specific article

router.post('/:articleId', async (req,res,next) => {
	console.log('below is the req.body in the comment creation route');
	console.log('----------vvvvvvvvvv');
	console.log(req.body);
	const user = await User.findById(req.session.userDBId)
		console.log('\n here is the user we found in the comment creation route');
		console.log(user);
	const createdComment = await Comment.create({
		text: req.body.text,
		user: user
	})
	const foundArticle = await Article.findById(req.params.articleId)
		foundArticle.comments.push(createdComment);
		console.log(foundArticle);

	const savedFoundArticle = await foundArticle.save((err) => {
		if(err) {
			next(err)
		} else {
			console.log("\n here's the datat in save");
			console.log(data);
			res.json({
				status: 200,
				data: foundArticle._id
			})
		}
	})
})

//export the router

module.exports = router;