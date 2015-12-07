var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');

var examCollectionName = 'exam';

exports.getExam = function(req, res) {

  var query = {};

  var board = req.params.board;

  if(!!board) {
    query.examBoard = board;
  }

  var instrument = req.params.instrument;

  if(!!instrument) {
    query.instrument = instrument.toLowerCase();
  }

  var grade = parseInt(req.params.grade);

  if((!!grade) && (grade !== NaN))  {
    query.grade =grade;
  }
  console.log("query = " + JSON.stringify(query));
  routeResponses.SendDocumentIfFound(req, res, db.Find(examCollectionName, query));
}

exports.getExamQuery = function(board, instrument, grade) {

  var deferred = Q.defer();
  var query = {examBoard: board, instrument: instrument, grade: grade};

  db.FindOne(examCollectionName, query)
    .then(function(data) {
      deferred.resolve(results);
    });
}

exports.getAllExams = function(req, res) {
  var query = {};
  console.log("get all exams");
  routeResponses.SendDocumentIfFound(req, res, db.Find(examCollectionName, query));
}
