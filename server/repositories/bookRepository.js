'use strict';

var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');
var q = require('q');

var bookCollectionName = 'book';

exports.getBooks = function(searchParameters) {

  if((!!searchParameters) && (!!searchParameters.isbn) && (typeof searchParameters.isbn !== "string")) {
    throw new Error('The ISBN number provided was not a valid string');
  }

  var deferred = q.defer();
  var query = assembleQuery(searchParameters);
  db.Find(bookCollectionName, query)
    .then(function(data) {
      deferred.resolve(data);
    })
    .catch(function(error) {
      deferred.reject(new Error("There was an error getting the requested Exam data: " + error.message));
    });

    return deferred.promise;
}

function assembleQuery(searchParameters) {
  var returnValue = {};
  if((!!searchParameters) && (!!searchParameters.isbn)) {
      returnValue._id = searchParameters.isbn;
  }
  return returnValue;
}
