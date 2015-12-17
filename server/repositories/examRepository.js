'use strict';

var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');
var Q = require('q');

var examCollectionName = 'exam';

// exports.getExam = function(req, res) {
//   var query = assembleQuery(req.params.board, req.params.instrument, parseInt(req.params.grade));
//   routeResponses.SendDocumentIfFound(req, res, db.Find(examCollectionName, query));
// }

exports.getExams = function(board, instrument, grade) {
  var deferred = Q.defer();
  var query = assembleQuery(board, instrument,grade);
  db.Find(examCollectionName, query)
    .then(function(data) {
      deferred.resolve(data);
    })
    .catch(function(error) {
      deferred.reject(new Error("There was an error getting the requested Exam data: " + error.message));
    });
  return deferred.promise;
}

function assembleQuery(board, instrument, grade) {
  var query = {};

  if (!!board) {
    query.examBoard = board;
  }

  if (!!instrument) {
    query.instrument = instrument.toLowerCase();
  }

  if ((!!grade) && (grade !== NaN)) {
    query.grade = grade;
  }

  return query;
}
