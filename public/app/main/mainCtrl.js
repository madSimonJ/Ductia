angular.module('ductia').controller('mainCtrl', function($scope, examFactory) {

  $scope.Exams = examFactory.query();

});
