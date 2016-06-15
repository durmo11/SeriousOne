var express = require('express');
var app = express();
var port = process.env.PORT || 8000; 				// set the port
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// viewed at http://localhost:8000
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

require('./server/routes/routes.js')(app);
app.listen(port);
console.log("Server runing on "+port);
