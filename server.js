var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8080;
var app = express();

console.log("");
console.log("Importing Config Settings...");
var config = require('./server/config/config')[env];
console.log("Config settings imported");

console.log("");
console.log("configuring express...");
require('./server/config/expressConfig')(app, config);
console.log("Express configured.");

console.log("");
console.log("Configuring database connection");
var mongoDBConfig = require('./server/config/mongodb');
mongoDBConfig.connect(config);
console.log("database configured");

console.log("");
console.log("configuring routes...");
require('./server/config/routes')(app, config);
console.log("routes configured.");

console.log("listening on port " + port + "...");
app.listen(port);
