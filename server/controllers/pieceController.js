var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');

var pieceCollectionName = 'piece';

exports.getPiece = function(req, res) {

  var pieceId = req.params.pieceId;

  var query = {_id: pieceId};

  routeResponses.SendDocumentIfFound(req, res, db.FindOne(pieceCollectionName, query));
}
