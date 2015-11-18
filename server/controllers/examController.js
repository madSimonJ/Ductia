var mongodb = require('../config/mongodb');
var routeResponses = require('../utilities/routeResponses');

var examCollectionName = 'exam';

exports.getExam = function(req, res) {

  var board = req.params.board;
  var instrument = req.params.instrument;
  var grade = req.params.grade;

  var query = {examBoard: board, instrument: instrument, grade: parseInt(grade)};

  routeResponses.SendDocumentIfFound(req, res, mongodb.FindOne(examCollectionName, query));
}

exports.getAllExams = function(req, res) {
  var query = {};

  routeResponses.SendDocumentIfFound(req, res, mongodb.Find(examCollectionName, query));
}
