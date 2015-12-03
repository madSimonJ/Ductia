angular.module('ductia').controller('pieceCtrl', function($scope, $routeParams, pieceFactory) {
  $scope.Piece = {title: 'piece not found'}
  $scope.Pieces = [];

    console.log("calling Falcor");

  if(!!$routeParams.pieceId) {

    var model = new falcor.Model({source: new falcor.HttpDataSource('/model.json') });

    model.
      get('pieces["' + $routeParams.pieceId + '"].["title", "composer"]').
      then(function(response) {
          console.log($scope.Piece);
          var pId = $routeParams.pieceId;
          alert(pId);
          console.log(response.json.pieces[pId]);
          $scope.Piece = response.json.pieces[pId];
          console.log($scope.Piece);
      });

    // $scope.Piece = pieceFactory.get({pieceId: $routeParams.pieceId});
  } else {
    $scope.Pieces = pieceFactory.query({});
  }
});
