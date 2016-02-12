'use strict';

exports.SendDocumentIfFound = function(req, res, promise) {
promise
  .then(function(data) {
    res.status(200).send(data);
  })
  .catch(function(err) {
    res.status(500).send({
      error: err.message
    });
  })
};

exports.SendFileNotFoundResponse = function(req, res) {
  res.sendStatus(404);
}

exports.redirectToIndex = function(req, res) {
  res.render('index');
}
