//require mongoose
const mongoose = require('mongoose');
//make connection string?
// const connectionString = 'mongodb://localhost/'
//connect mongoose
mongoose.connect('mongodb://localhost/news', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})
//connection.on connect
mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
})
//connection.on disconnect
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected');
})

//connection.on error
mongoose.connnection.on('error', (err) => {
	console.log('mongoose hit an error', err);
})	