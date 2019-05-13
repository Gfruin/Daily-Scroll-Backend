//require mongoose
const mongoose = require('mongoose')
//define the article schema
const articleSchema = new mongoose.Schema({
	title: String,
	description: String,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	category: {
	business: Boolean,
	entertainment: Boolean,
	health: Boolean,
	science: Boolean,
	sports: Boolean,	
	technology: Boolean,
	local: Boolean }
})
//define the model
const Article = new mongoose.model('Post', articleSchema)
//export the module

module.exports = Article;