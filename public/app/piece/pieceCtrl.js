angular.module('ductia').controller('pieceCtrl', function($scope, $routeParams, pieceFactory) {
  $scope.Piece = {title: 'piece not found'}
  $scope.Pieces = [];

    console.log("calling Falcor");

  if(!!$routeParams.pieceId) {

    var model = new falcor.Model({source: new falcor.HttpDataSource('/model.json') });

    model.
      get('pieces["' + $routeParams.pieceId + '"].["title", "composer"]').
      then(function(response) {
          var pId = $routeParams.pieceId;
          $scope.$apply(function() {
            $scope.Piece = response.json.pieces[pId];
          });
      });
  } else {
    $scope.Pieces = pieceFactory.query({});
  }
});
