var examController = require('../controllers/examController');
var bookController = require('../controllers/bookController');
var pieceController = require('../controllers/pieceController');

var routeResponses = require('./routeResponses');

exports.ConfigureApiRoutes = function(app) {
  app.get('/api', routeResponses.SendFileNotFoundResponse);

  app.get('/api/exams', examController.getAllExams)
  app.get('/api/exams/:board/:instrument/:grade', examController.getExam);

  app.get('/api/books/:isbn', bookController.getBook);

  app.get('/api/pieces/:pieceId', pieceController.getPiece);
  
  app.all('/api/*', routeResponses.SendFileNotFoundResponse);
}
