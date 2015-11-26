angular.module('ductia').controller('bookCtrl', function($scope, bookFactory) {
  $scope.Books = bookFactory.query();
});
