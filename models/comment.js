//require mongoose
const mongoose = require('mongoose');
//define the comment schema
const commentSchema = new mongoose.Schema({
	date: {
		type: Data,
		default: Date.now
	},
	text: {
		type: String,
		required: true
	},
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})
//define the model
const Comment = new.mongoose.model('Comment', commentSchema)
//export the module
module.export = Comment;