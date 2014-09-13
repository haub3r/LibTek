// server.js


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose   = require('mongoose');
var methodOverride = require('method-override');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./public')); // set the static files location /public

var port = process.env.PORT || 8080; 		// set our port

// DB connection

// read the username and password from file
var file = './conf/settings.json';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
	
  data = JSON.parse(data);
  
  // connect with the credentials we read
  mongoose.connect("mongodb://" + data.db.username + ":" + data.db.password + "@proximus.modulusmongo.net:27017/Hepawa4z");
 
});

// book model
var Book 	= require('./models/book');


// route file
var routes = require('./routes')(app);
 

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
