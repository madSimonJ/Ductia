angular.module('ductia').controller('pieceCtrl', function($scope, $routeParams, pieceFactory) {
  $scope.Piece = {title: 'piece not found'}
  $scope.Pieces = [];

  if(!!$routeParams.pieceId) {
    $scope.Piece = pieceFactory.get({pieceId: $routeParams.pieceId});
  } else {
    $scope.Pieces = pieceFactory.query({});
  }
});
