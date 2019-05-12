//require mongoose
const mongoose = require('mongoose')
//define the user schema
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	articles: [{type: mongoose.Schema.Types.ObjectId, ref: "Article"}]
})
//define the user model
const User = mongoose.model('User', userSchema)
//export the module

module.exports = User;