angular.module('ductia').controller('examCtrl', function($scope, examFactory, $routeParams) {
  $scope.SelectedInstrument = $routeParams.instrument;
  $scope.SelectedGrade = $routeParams.grade;
  $scope.SelectedBoard = $routeParams.board;
  var queryParameters = {};

  if(!!$scope.SelectedBoard) {



    var model = new falcor.Model({source: new falcor.HttpDataSource('/model.json') });

    model.
      get(
        'exams["' + $routeParams.board + '"].["instrument", "grade","dateValidTo","examBoard"]',
        'exams["' + $routeParams.board + '"].["lists"]["A"][1..10].["title", "composer"]'
      ).
      then(function(response) {
        alert(JSON.stringify(response,null,3));
      });

    queryParameters.board = $scope.SelectedBoard;
  }

  if (!!$scope.SelectedInstrument) {
    queryParameters.instrument = $scope.SelectedInstrument;
  }
  if(!!$scope.SelectedGrade) {
    queryParameters.grade = $scope.SelectedGrade;
  }
  $scope.Exams = examFactory.query(queryParameters);
});
