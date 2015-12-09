'use strict';

var falcorExpress = require('falcor-express');
var falcorModel = require('./falcorModel');
var Router = require('falcor-router');
var _ = require('underscore');

var examRepository = require('../repositories/examRepository');

exports.GetDataSourceRoute = function() {

  var dataSourceRoute = falcorExpress.dataSourceRoute(function(req, res) {
    return falcorModel.GetModel().asDataSource();
  });

  return dataSourceRoute;

};

exports.GetRouter = function() {
  var dataSourceRoute = falcorExpress.dataSourceRoute(function(req, res) {
    return new Router(
      [{
        //route: "bookCoverageByExamDesc['examBoards'][{keys:boards}]instruments'][{keys: instrument}]grades[{integer:grades}].booksWithMostPieces[{integers:howManyBooks}]",
        route: "booksByCoverage",
        get: function(pathset) {
          var results = [];
          console.log("doing stuff now");
          var listOfRequestedExams;

          examRepository.getExamQuery('abrsm', 'flute', 1)
            .then(function(data) {
              listOfRequestedExams = data;

              var listOfPieces = new Array();
              listOfPieces = _.union(listOfRequestedExams.lists.A, listOfRequestedExams.lists.B, listOfRequestedExams.lists.C);
              console.log("********** " + JSON.stringify(listOfPieces));
            });


          // retrieve results

          return results;
        }
      }]);
  });

  return dataSourceRoute;
};
