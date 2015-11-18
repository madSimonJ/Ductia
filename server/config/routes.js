var examController = require('../controllers/examController');
var bookController = require('../controllers/bookController');
var pieceController = require('../controllers/pieceController')

module.exports = function(app) {

  app.get('/api', function(req, res) {
    res.status(404).send({
      error: "no route selected"
    });
  });

  app.get('/api/exams', examController.getAllExams)
  app.get('/api/exams/:board/:instrument/:grade', examController.getExam);
  app.get('/api/books/:isbn', bookController.getBook);
  app.get('/api/pieces/:pieceId', pieceController.getPiece);

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.get('/', function(req, res) {
    res.render('index');
  });
  app.get('*', function(req, res) {
    res.sendStatus(404);
  });


}
