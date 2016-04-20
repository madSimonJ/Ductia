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
  examRepository.getExams(query)
    .then(function(data) {
      examData = data;
      var listOfIds = _.union(data.lists.A, data.lists.B, data.lists.C);
      pieceRepository.getPieceList(listOfIds)
        .then(function(data) {
          console.log('1');
          pieceData = data;
          //var joinedData = joinObjectResults(examData, pieceData);
          examData.lists.A = joinObjectResults(exam.lists.A, pieceData);
          examData.lists.B = joinObjectResults(exam.lists.B, pieceData);
          examData.lists.C = joinObjectResults(exam.lists.C, pieceData);
          console.log('examData = ' + examData);
          deferred.resolve(examData);
        })
        .catch(function(error) {

        });
    })
    .catch(function(error) {

    });

  routeResponses.SendDocumentIfFound(req, res, deferred.promise);
}

function joinObjectResults(examRecord, pieceRecords) {
  return _.map(list, function(pieceId) {
    var relatedPieceRecord = _.find(pieceRecords, function(pieceRecord) {
      return pieceRecord._id == pieceInBook.piece_id;
    });
  });
}
