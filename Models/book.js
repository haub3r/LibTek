// LibTek/Models/book.js

// Load required packages
var mongoose = require('mongoose');

// Define our book schema
var BookSchema   = new mongoose.Schema({
  name: String,
  type: String,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Book', BookSchema);