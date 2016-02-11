var pieceRepository = require('../repositories/pieceRepository');
var routeResponses = require('../routes/routeResponses');

exports.handlePieceGetRequest = function(req, res) {
  var query = {
    pieceid: req.params.pieceid
  };
  routeResponses.SendDocumentIfFound(req, res, pieceRepository.getPieces(query));
}
