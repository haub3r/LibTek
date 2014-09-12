// routes.js


// dependencies
var express    = require('express');
var Book 	= require('./Models/book');

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


	// test route to make sure everything is working (accessed at GET http://localhost:8080/libtek)
	router.get('/', function(req, res) {
		res.json({ message: 'LibTek index!' });
	});

	// more routes for our API will happen here

	router.route('/books')

		// create a book (accessed at POST http://localhost:8080/libtek/books)
		.post(function(req, res) {
			
			var book = new Book(); 		// create a new instance of the Book model
			book.name = req.body.name;  // set the book name (comes from the request)

			// save the book and check for errors
			book.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Book ' + book.name + ' created!' });
			});		
		})
		
		//get all books (accessed at GET http://localhost:8080/libtek/books)
		.get(function(req, res) {
			Book.find(function(err, books) {
				if (err)
					res.send(err);

				res.json(books);
			});
		});

	// on routes that end in /books/:book_id
	// ----------------------------------------------------
	router.route('/books/:book_id')

		// get the book with that id (accessed at GET http://localhost:8080/api/books/:book_id)
		.get(function(req, res) {
			Book.findById(req.params.book_id, function(err, book) {
				if (err)
					res.send(err);
				
				res.json(book);
			});
		})
		
		// update the book with this id (accessed at PUT http://localhost:8080/api/books/:book_id)
		.put(function(req, res) {

			// use our book model to find the book we want
			Book.findById(req.params.book_id, function(err, book) {

				if (err)
					res.send(err);

				book.name = req.body.name; 	// update the books info

				// save the book
				book.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'Book updated!' });
				});

			});
		})
		
		// delete the book with this id (accessed at DELETE http://localhost:8080/api/books/:book_id)
		.delete(function(req, res) {
			Book.remove({
				_id: req.params.book_id
			}, function(err, book) {
				if (err)
					res.send(err);

				res.json({ message: 'Book deleted.' });
			});
		});
		
		// frontend routes 
		// --------------------------------------------------
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./views/index.html'); // load our index.html file
		});
		
	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /libtek
	app.use('/libtek', router);
};
