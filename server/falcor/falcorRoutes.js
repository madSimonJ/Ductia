var falcorExpress = require('falcor-express');
var falcorModel = require('./falcorModel');
var Router = require('falcor-router');

exports.GetDataSourceRoute = function() {

  var dataSourceRoute = falcorExpress.dataSourceRoute(function(req, res) {
    return falcorModel.GetModel().asDataSource();
  });

  return dataSourceRoute;

};

exports.GetRouter = function(){
  return new Router(
    [{
          route: "examBoard[{keys:boards}][{keys: instrument}]grades[{integer:grades}].booksWithMostPieces[{integers:howManyBooks}]",
          get: function(pathset){
            var results = [];

          //  var listOfRequestedExams =


            // retrieve results

            return results;
          }
        }]
  );
}
