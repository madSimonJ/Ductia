var falcorExpress = require('falcor-express');
var falcorModel = require('./falcorModel');

exports.GetDataSourceRoute = function() {

  var dataSourceRoute = falcorExpress.dataSourceRoute(function(req, res) {
    return falcorModel.GetModel().asDataSource();
  });

  return dataSourceRoute;

}
