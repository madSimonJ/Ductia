'use strict';

var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');
var q = require('q');

var bookCollectionName = 'book';

// exports.thisWorks = "true";
//
// exports.getExams = function(searchParameters) {
//   return true;
// }

exports.getBook = function(isbn) {


  var deferred = q.defer();
  var query = assembleQuery(isbn);
  db.Find(bookCollectionName, query)
    .then(function(data) {
      deferred.resolve(data);
    })
    .catch(function(error) {
      deferred.reject(new Error("There was an error getting the requested Exam data: " + error.message));
    });
}

function assembleQuery(isbn) {
  var returnValue = {};

  returnValue._id = isbn;
}

exports.getAllBooks = function(req, res) {
  var query = {};

  routeResponses.SendDocumentIfFound(req, res, db.Find(bookCollectionName, query));
}
