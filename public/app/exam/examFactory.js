angular.module('ductia').factory('examFactory', function($resource) {
  var examResource = $resource('/api/exams/:board/:instrument/:grade', {board: '@board', instrument: '@instrument', grade: '@grade'});
  return examResource;
});
