// Load required packages
var Book = require('../models/book');

// Create endpoint /libtek/books for POSTS
exports.postBooks = function(req, res) {
  // Create a new instance of the Book model
  var book = new Book();

  // Set the book properties that came from the POST data
  book.name = req.body.name;
  book.type = req.body.type;
  book.userId = req.user._id;

  // Save the book and check for errors
  book.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Book added to the library!', data: book });
  });
};

// Create endpoint /libtek/books for GET
exports.getBooks = function(req, res) {
  // Use the Book model to find all books
  Book.find({ userId: req.user._id }, function(err, books) {
    if (err)
      res.send(err);

    res.json(books);
  });
};

// Create endpoint /libtek/books/:book_id for GET
exports.getBook = function(req, res) {
  // Use the Book model to find a specific book
  Book.find({ userId: req.user._id, _id: req.params.book_id }, function(err, book) {
    if (err)
      res.send(err);

    res.json(book);
  });
};

/* Create endpoint /libtek/books/:book_id for PUT
exports.putBook = function(req, res) {
  // Use the Book model to find a specific book
  Book.update({ userId: req.user._id, _id: req.params.book_id }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};
*/

// Create endpoint /libtek/books/:book_id for DELETE
exports.deleteBook = function(req, res) {
  // Use the Book model to find a specific book and remove it
  Book.remove({ userId: req.user._id, _id: req.params.book_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Book removed from the library!' });
  });
};