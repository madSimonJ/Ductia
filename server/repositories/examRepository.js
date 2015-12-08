var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');
var Q = require('q');

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
console.log("hello.  is it me you're looking for?");
console.log("board = " + board + ", instrument = " + instrument + ", grade = " + grade);
  var deferred = Q.defer();
console.log("hello. 2");
  var query = {examBoard: board, instrument: instrument, grade: grade};
  console.log("db query = " + JSON.stringify(query));
  db.FindOne(examCollectionName, query)
    .then(function(data) {
      deferred.resolve(results);
    });

    return deferred.promise;
}

exports.getAllExams = function(req, res) {
  var query = {};
  console.log("get all exams");
  routeResponses.SendDocumentIfFound(req, res, db.Find(examCollectionName, query));
}
