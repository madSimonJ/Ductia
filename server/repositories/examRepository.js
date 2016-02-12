'use strict';

var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');
var Q = require('q');
var _ = require('underscore');

var examCollectionName = 'exam';

exports.getExams = function(searchParameters) {

  if(!searchParameters) {
    searchParameters = {};
  }
  var board = searchParameters.board;
  var instrument = searchParameters.instrument;
  var grade = searchParameters.grade;

  if(!!board && typeof board !== "string") {
    throw new Error("the Exam Board provided was not a valid string");
  } else if(!!instrument && typeof instrument !== "string") {
    throw new Error("the instrument provided was not a valid string");
  } else if(!!grade && isNaN(grade) && !Array.isArray(grade)) {
    throw new Error("the grade provided was not a valid integer");
  } else if(!!grade && Array.isArray(grade)) {
    _.each(grade, function(g) {
      if(isNaN(g)) {
        throw new Error("one or more of the grades provided was not a valid integer");
      }
    });
  }


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

  if (!!grade) {
    if(Array.isArray(grade)) {
      query.grade = {$in: grade};
    } else {
      query.grade = grade;
    }
  }

  return query;
}
