
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, mongoose = require('mongoose')
, bodyParser = require('body-parser')
, methodOverride = require('method-override')
, serveStatic = require('serve-static')
, errorHandler = require('errorhandler');

//mongoose.connect(process.env.MONGOLAB_URI || "mongodb://birthdayworld_admin:9fpG7Ln9ez93@ds011271.mlab.com:11271/heroku_1ptkn26d");

var mongodbUri = 'mongodb://bday:abc123@ds011271.mlab.com:11271/heroku_1ptkn26d';
mongoose.connect(mongodbUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express(); //module.exp = express.createServer();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(__dirname + '/public'));

// Routes

app.get('/', routes.index);

// load errorHandler after routes

if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
} else {
  app.use(errorHandler());
}


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
});
