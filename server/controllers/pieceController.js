var mongodb = require('../config/mongodb');
var routeResponses = require('../utilities/routeResponses');

var pieceCollectionName = 'piece';

exports.getPiece = function(req, res) {

  var pieceId = req.params.pieceId;

  var query = {_id: pieceId};

  routeResponses.SendDocumentIfFound(req, res, mongodb.FindOne(pieceCollectionName, query));
}
