angular.module('ductia').factory('pieceFactory', function($resource) {
  var pieceResource = $resource('/api/pieces/:pieceId', {pieceId: '@pieceId'});
  return pieceResource;
});
