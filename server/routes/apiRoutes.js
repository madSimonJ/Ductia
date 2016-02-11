'use strict';

var examController = require('../controllers/examController');
var bookController = require('../controllers/bookController');
var pieceController = require('../controllers/pieceController');
var routeResponses = require('./routeResponses');

exports.ConfigureApiRoutes = function(app) {

  app.get('/api/exams/:board?/:instrument?/:grade?',   examController.handleExamGetRequest);
  app.get('/api/books/:isbn?', bookController.handleBookGetRequest);
  app.get('/api/pieces/:pieceId?', pieceController.handlePieceGetRequest);

  app.all('/api/*', routeResponses.SendFileNotFoundResponse);
}
