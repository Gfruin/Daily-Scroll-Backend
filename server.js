//requires here
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config()


const PORT = process.env.PORT

const API_KEY = process.env.API_KEY

require('./db/db');

//middleware here
app.use(session({
	secret: 'fake news',
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// const corsOptions = {
// 	origin: 'http://localhost:3000',
// 	credentials: true,
// 	optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions));

//controllers here

const articleController = require('./controllers/articleController');
const authController = require('./controllers/authController');
const commentController = require('./controllers/commentController');
const userController = require('./controllers/userController');

app.use('/api/v1/articles', articleController)
// app.use('/auth', authController)
app.use('/api/v1/user', userController)
// app listener here

app.listen(process.env.PORT || 9000, () => {
	console.log('listening on PORT 9000');
})






