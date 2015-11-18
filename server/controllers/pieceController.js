var mongodb = require('../config/mongodb');

exports.getPiece = function(req, res) {

  var pieceId = req.params.pieceId;

  var query = {_id: pieceId};

  mongodb.FindOne("piece", query).then(function(record) {
    res.status(200).send(record);
  }).catch(function(error) {
    console.log(error);
    res.status(500).send({error: error});
  });
}
