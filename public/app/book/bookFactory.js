angular.module('ductia').factory('bookFactory', function($resource) {
  var examResource = $resource('/api/books/:isbn', {isbn: '@isbn'});
  return examResource;
});
