var mongodb = require('../config/mongodb');

exports.getBook = function(req, res) {

  var isbn = req.params.isbn;
  var query = {_id: isbn};

  mongodb.FindOne('book', query).then(function(record) {
    res.status(200).send(record);
  }).catch(function(error) {
    console.log(error);
    res.status(500).send({error: error});
  });
}
