var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');

var examCollectionName = 'exam';

exports.getExam = function(req, res) {

  var board = req.params.board;
  var instrument = req.params.instrument;
  var grade = req.params.grade;

  var query = {examBoard: board, instrument: instrument, grade: parseInt(grade)};

  routeResponses.SendDocumentIfFound(req, res, db.FindOne(examCollectionName, query));
}

exports.getAllExams = function(req, res) {
  var query = {};

  routeResponses.SendDocumentIfFound(req, res, db.Find(examCollectionName, query));
}
