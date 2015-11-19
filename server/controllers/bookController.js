var db = require('../config/databaseConfig');
var routeResponses = require('../routes/routeResponses');

var bookCollectionName = 'book';

exports.getBook = function(req, res) {

  var isbn = req.params.isbn;
  var query = {_id: isbn};

  routeResponses.SendDocumentIfFound(req, res, db.FindOne(bookCollectionName, query));
}
