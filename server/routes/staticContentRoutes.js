'use strict';

var routeResponses = require('./routeResponses');
var path = require('path');

var websiteRootDirectory = path.join(__dirname, '../../');
var publicDirectory = path.join(websiteRootDirectory, 'public');
var angularAppDirectory = path.join(publicDirectory, 'app');
var bowerComponentsDirectory = path.join(publicDirectory, 'bower_components');
var nodeModulesDirectory = path.join(websiteRootDirectory, 'node_modules');
var cssDirectory = path.join(publicDirectory, 'css');
var imgDirectory = path.join(publicDirectory, 'img');
var jsFileStaticContentRoutes = {
  'jquery.js': path.join(bowerComponentsDirectory, 'jquery', 'dist', 'jquery.js'),
  'bootstrap.js': path.join(bowerComponentsDirectory, 'bootstrap', 'dist', 'js', 'bootstrap.js'),
  'angular.js': path.join(bowerComponentsDirectory, 'angular', 'angular.js'),
  'angular-resource.js': path.join(bowerComponentsDirectory, 'angular-resource', 'angular-resource.js'),
  'angular-route.js': path.join(bowerComponentsDirectory, 'angular-route', 'angular-route.js'),
  'toastr.js': path.join(bowerComponentsDirectory, 'toastr', 'toastr.js')
}
var cssFileStaticContentRoutes = {
  'html5boilerplate-normalize.css': path.join(bowerComponentsDirectory, "html5-boilerplate", "dist", "css", "normalize.css"),
  'html5boilerplate-main.css': path.join(bowerComponentsDirectory, "html5-boilerplate", "dist", "css", "main.css"),
  'bootstrap.css': path.join(bowerComponentsDirectory, "bootstrap", "dist", "css", "bootstrap.css"),
  'bootstrap.css.map': path.join(bowerComponentsDirectory, "bootstrap", "dist", "css", "bootstrap.css.map"),
  'toastr.css': path.join(bowerComponentsDirectory, "toastr", "toastr.css"),
  'ductia.css' : path.join(cssDirectory, "ductia.css")
}

exports.configureStaticContentRoutes = function(app) {

  app.get('/js/app/*', function(req, res) {
    var filePath = path.join(angularAppDirectory, req.params[0]);
    res.sendFile(filePath);
  });

  app.get('/js/*', function(req, res) {
    if (!!jsFileStaticContentRoutes[req.params[0]]) {
      var filePath = jsFileStaticContentRoutes[req.params[0]];
      res.sendFile(filePath);
    } else {
      res.sendStatus(404);
    }
  });

  app.get('/css/*', function(req, res) {
    if(!!cssFileStaticContentRoutes[req.params[0]]) {
      var filePath = cssFileStaticContentRoutes[req.params[0]];
      res.sendFile(filePath);
    } else {
      res.sendStatus(404);
    }
  });

  app.get('/img/*', function(req, res) {
    filePath = path.join(imgDirectory, req.params[0]);
    res.sendFile(filePath);
  });

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });
}
