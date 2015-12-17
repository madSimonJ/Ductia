'use strict';

var examRepository = require('../repositories/examRepository');
var bookRepository = require('../repositories/bookRepository');
var pieceRepository = require('../repositories/pieceRepository');

var routeResponses = require('./routeResponses');

exports.ConfigureApiRoutes = function(app) {
  app.get('/api', routeResponses.SendFileNotFoundResponse);

  app.get('/api/exams/:board?/:instrument?/:grade?', examRepository.getExams);

  app.get('/api/books', bookRepository.getAllBooks);
  app.get('/api/books/:isbn', bookRepository.getBook);

  app.get('/api/pieces', pieceRepository.getAllPieces);
  app.get('/api/pieces/:pieceId', pieceRepository.getPiece);

  app.all('/api/*', routeResponses.SendFileNotFoundResponse);
}
