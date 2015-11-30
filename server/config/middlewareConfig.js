var express = require('express');
var stylus = require('stylus');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var falcor = require('falcor');
var falcorExpress = require('falcor-express');
var falcorRouter = require('falcor-router');
//var passport = require('passport');
//var cookieParser = require('cookie-parser');
var session = require("express-session");


var model = new falcor.Model({
  cache:{
    pieces:{
      "piece1" : { composer: "Hook", title: "Minuetto: 2nd movt from Sonata in Eb, Op. 99 No. 3, arr. Wastall" },
      "piece2" : { composer: "Purcell", title: "Rigaudon, Z. 653, arr. Stuart" },
      "piece3" : { composer: "Trad. Irish", title: "The Rakes o’ Mallow, arr. Denley" },
      "piece4" : { composer: "Keith Amos", title: "Lupin, the Pot-Bellied Pig: No. 9" },
      "piece5" : { composer: "Ros Stephen", title: "Guanabara Bay" }
    }
  }
});


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
//  app.use(express.static(config.rootPath + '/public'));

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  return model.asDataSource();
}));
}
