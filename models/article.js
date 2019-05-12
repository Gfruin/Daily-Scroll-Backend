//require mongoose
const mongoose = require('mongoose')
//define the article schema
const articleSchema = new mongoose.Schema({
	title: String,
	description: String,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
	user: {type: mongooseSchema.Types.ObjectId, ref: "User"}
})
//define the model
const Article = new mongoose.model('Post', postSchema)
//export the module

module.exports = Article;