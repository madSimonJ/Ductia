'use strict';

var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');
var q = require('q');

var pieceCollectionName = 'piece';

exports.getPieces = function(searchParameters) {

  if((!!searchParameters) && (!!searchParameters.pieceid) && (typeof searchParameters.pieceid !== "string")) {
    throw new Error('The Piece Id provided was not a valid string');
  }

  var deferred = q.defer();
  var query = assembleSearchQuery(searchParameters);
  db.Find(pieceCollectionName, query)
    .then(function(data) {
      deferred.resolve(data);
    })
    .catch(function(error) {
      deferred.reject(new Error("There was an error getting the requested Piece data: " + error.message));
    });

    return deferred.promise;
}

exports.getPieceList = function(listOfIds) {
  var query = assemblePieceListQuery(listOfIds);
  var deferred = q.defer();
  db.Find(pieceCollectionName, query)
    .then(function(data) {
      deferred.resolve(data);
    })
    .catch(function(error) {
      deferred.reject(new Error("There was an error getting the requested Piece data: " + error.message));
    });
    return deferred.promise;
}

function assemblePieceListQuery(listOfIds) {
  var returnValue = {_id: { $in: listOfIds }};
  return returnValue;
}

function assembleSearchQuery(searchParameters) {
  var returnValue = {};
  if((!!searchParameters) && (!!searchParameters.pieceid)) {
      returnValue._id = searchParameters.pieceid;
  }
  return returnValue;
}
