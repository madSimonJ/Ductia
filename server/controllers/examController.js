var examRepository = require('../repositories/examRepository');
var pieceRepository = require('../repositories/pieceRepository');
var routeResponses = require('../routes/routeResponses');
var q = require('q');
var _ = require('lodash');

exports.handleExamGetRequest = function(req, res) {

  var query = {
    board: req.params.board,
    instrument: req.params.instrument,
    grade: req.params.grade
  };

  var examData;
  var pieceData;

  var deferred = q.defer();
  var queryIsValid = true;
  if (!query.board) {
    deferred.reject(new Error('There was an issue with the parameters supplied: no board was specified'));
    queryIsValid = false;
  } else if(!query.instrument) {
    deferred.reject(new Error('There was an issue with the parameters supplied: no instrument was specified'));
    queryIsValid = false;
  } else if(!query.grade) {
    deferred.reject(new Error('There was an issue with the parameters supplied: no grade was specified'));
    queryIsValid = false;
  } else if(!_.isNumber(query.grade)) {
      deferred.reject(new Error('There was an issue with the parameters supplied: the specified grade was not a number'));
      queryIsValid = false;
  }

  if (queryIsValid) {
    examRepository.getExams(query)
      .then(function(data) {
        examData = data;
        var listOfIds = _.union(data.lists.A, data.lists.B, data.lists.C);
        pieceRepository.getPieceList(listOfIds)
          .then(function(data) {
            pieceData = data;
            examData.lists.A = joinObjectResults(examData.lists.A, pieceData);
            examData.lists.B = joinObjectResults(examData.lists.B, pieceData);
            examData.lists.C = joinObjectResults(examData.lists.C, pieceData);
            deferred.resolve(examData);
          })
          .catch(function(error) {
            deferred.reject('An error occured getting piece data: ' + error.message);
          });
      })
      .catch(function(error) {
        deferred.reject('An error occured getting exam data: ' + error.message);
      });
  }

  routeResponses.SendDocumentIfFound(req, res, deferred.promise);
}

function joinObjectResults(list, pieceRecords) {
  return _.map(list, function(pieceId) {
    var relatedPieceRecord = _.find(pieceRecords, function(pieceRecord) {
      return pieceRecord._id == pieceId;
    });
    relatedPieceRecord.pieceId = pieceId;
    return _.omit(relatedPieceRecord, '_id');
  });
}
