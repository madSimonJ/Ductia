var bookRepository = require('../repositories/bookRepository');
var pieceRepository = require('../repositories/pieceRepository');
var routeResponses = require('../routes/routeResponses');
var _ = require('lodash');
var q = require('q');

exports.handleBookGetRequest = function(req, res) {
  var query = {
    isbn: req.params.isbn
  };

  var deferred = q.defer();
  var bookRecord;
  var pieceRecords;
  bookRepository.getBooks(query)
    .then(function(data) {
      bookRecord = data;
      var pieceIdList = _.map(bookRecord.piecesInBook, function(value, index) {
        return value.piece_id;
      });
      pieceRepository.getPieceList(pieceIdList)
        .then(function(data) {
          pieceRecords = data;
          var joinedData = joinObjectResults(bookRecord, pieceRecords);
          bookRecord.piecesInBook = joinedData;
          deferred.resolve(bookRecord)
        })
        .catch(function(error) {
          deferred.reject('An error occured fetching details of the Book\'s pieces: "' + error.message + '"');
        });
    })
    .catch(function(error) {
      deferred.reject('An error occured fetching details of the Book: "' + error.message + '"');
    });
  routeResponses.SendDocumentIfFound(req, res, deferred.promise);
}

function joinObjectResults(bookRecord, pieceRecords) {
  return _.map(bookRecord.piecesInBook, function(pieceInBook) {
    var relatedPieceRecord = _.find(pieceRecords, function(pieceRecord) {
      return pieceRecord._id == pieceInBook.piece_id;
    });
    var extendedPieceInBook = _.extend(pieceInBook, relatedPieceRecord);
    return _.omit(extendedPieceInBook, '_id');
  });
}
