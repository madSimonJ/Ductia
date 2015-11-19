var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8080;
var app = express();

console.log("");
console.log("Importing Config Settings...");
var environmentVariables = require('./server/config/environmentVariables')[env];
console.log("Config settings imported");

console.log("");
console.log("configuring express...");
require('./server/config/expressConfig')(app, environmentVariables);
console.log("Express configured.");

console.log("");
console.log("Configuring database connection");
var dbConfig = require('./server/config/databaseConfig');
dbConfig.connect(environmentVariables);
console.log("database configured");

console.log("");
console.log("configuring routes...");
require('./server/config/routeConfig')(app, environmentVariables);
console.log("routes configured.");

console.log("listening on port " + port + "...");
app.listen(port);
