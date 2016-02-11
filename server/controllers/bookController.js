var bookRepository = require('../repositories/bookRepository');
var routeResponses = require('../routes/routeResponses');

exports.handleBookGetRequest = function(req, res) {
  var query = {
    isbn: req.params.isbn
  };
  routeResponses.SendDocumentIfFound(req, res, bookRepository.getBooks(query));
}
