// routes.js


// dependencies
var express    = require('express');

var book 	= require('./models/book');
var user = require('./models/user');

var bookController = require('./controllers/book');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// ROUTES FOR OUR API
// =============================================================================
module.exports = function(app) {
	var router = express.Router(); 				// get an instance of the express Router

	// middleware to use for all requests
	router.use(function(req, res, next) {
		// do logging
		console.log('Something is happening.');
		next(); // make sure we go to the next routes and don't stop here
	});


	// main route
	router.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load our index.html file
	});

		
	// Create endpoint handlers for /books
	router.route('/books')
	  .post(authController.isAuthenticated, bookController.postBooks)
	  .get(authController.isAuthenticated, bookController.getBooks);

	// Create endpoint handlers for /books/:book_id
	router.route('/books/:book_id')
	  .get(authController.isAuthenticated, bookController.getBook)
	  //.put(authController.isAuthenticated, bookController.putBook)		//put not working yet
	  .delete(authController.isAuthenticated, bookController.deleteBook);

	// Create endpoint handlers for /users
	router.route('/users')
	  .post(userController.postUsers)
	  .get(authController.isAuthenticated, userController.getUsers);
	
	
		// frontend routes 
	// --------------------------------------------------
	// route to handle all angular requests
		router.get('*', function(req, res) {
			res.sendfile('./public/index.html'); // load our index.html file
		});

	
	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /libtek
	app.use('/libtek', router);
	
	
};
