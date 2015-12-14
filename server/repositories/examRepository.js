'use strict';

var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');
var Q = require('q');

var examCollectionName = 'exam';

exports.getExam = function(req, res) {
  var query = assembleQuery(req.params.board, req.params.instrument, parseInt(req.params.grade));
  routeResponses.SendDocumentIfFound(req, res, db.Find(examCollectionName, query));
}

exports.getExamQuery = function(board, instrument, grade) {
  var deferred = Q.defer();
  var query = assembleQuery(board, instrument,grade);
  db.FindOne(examCollectionName, query)
    .then(function(data) {

      deferred.resolve(data);
    })
    .catch(function(error) {
      throw new Error("An error occured querying the database for exams: " + error.message);
    });
  return deferred.promise;
}

exports.getAllExams = function(req, res) {
  var query = {};
  console.log("get all exams");
  routeResponses.SendDocumentIfFound(req, res, db.Find(examCollectionName, query));
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
