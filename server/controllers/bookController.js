var mongodb = require('../config/mongodb');
var routeResponses = require('../utilities/routeResponses');

var bookCollectionName = 'book';

exports.getBook = function(req, res) {

  var isbn = req.params.isbn;
  var query = {_id: isbn};

  routeResponses.SendDocumentIfFound(req, res, mongodb.FindOne(bookCollectionName, query));
}
