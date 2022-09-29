const express = require('express'); 
const app = express(); 

const bodyparser = require('body-parser');
const users = require('./routes/api/users');
const passport = require('passport');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const path = require('path');

const cors = require('cors')
app.use( cors() )

//Body parser configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//serve static assets when in production

if (process.env.NODE_ENV === 'production'){
 
 	const root = path.join(__dirname, '..', 'frontend', 'build')
	app.use(express.static(root));

	app.get("/*", (req, res) => {
	    res.sendFile( path.join(__dirname, '..', 'frontend', 'build') );
	})
 
}

module.exports = app;
