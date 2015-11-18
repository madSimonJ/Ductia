var express = require('express');
var stylus = require('stylus');
var morgan = require('morgan');
var bodyParser = require("body-parser");
//var passport = require('passport');
//var cookieParser = require('cookie-parser');
var session = require("express-session");

module.exports = function(app, config) {

  function compile(str, path) {
    return stylus(str).set('filname', path);
  }

  app.set('views', config.rootPath + '/server/views');
  app.set('view engine','jade');
  app.use(stylus.middleware(
    {
      src: config.rootPath + '/public',
      compile: compile
    }
  ));
  app.use(morgan('dev'));
  //app.use(cookieParser());
  //app.use(session({secret: 'multi vision unicorns', resave: true, saveUninitialized: true}));
  //app.use(passport.initialize());
  //app.use(passport.session());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static(config.rootPath + '/public'));

}
