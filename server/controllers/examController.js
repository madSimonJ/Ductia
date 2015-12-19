var examRepository = require('../repositories/examRepository');
var routeResponses = require('../routes/routeResponses');

exports.handleExamGetRequest = function(req, res) {
  var query = {
    board: req.params.board,
    instrument: req.params.instrument,
    grade: req.params.grade
  };
  routeResponses.SendDocumentIfFound(req, res, examRepository.getExams(query));
}
