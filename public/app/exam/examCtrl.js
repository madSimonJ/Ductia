angular.module('ductia').controller('examCtrl', function($scope, examFactory) {
  $scope.Exams = examFactory.query();
});
