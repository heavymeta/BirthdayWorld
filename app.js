
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

var mongodbUri = 'mongodb://bday:abc123@ds011271.mlab.com:11271/heroku_1ptkn26d';
mongoose.connect(mongodbUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express(); //module.exp = express.createServer();
var handlebars = require('express3-handlebars').create({
	defaultLayout:'main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine);

// Configuration

app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(__dirname + '/public'));

// Routes

app.get('/', routes.index);
app.get('/faq', routes.faq);
app.post('/callback', routes.success);
app.get('/success', routes.success);

// load errorHandler after routes

if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
} else {
  app.use(errorHandler());
}


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port 3000 in %s mode", process.env.PORT, app.settings.env);
});
