angular.module('ductia', ['ngRoute', 'ngResource']);

angular.module("ductia").config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.when('/', {
    templateUrl: '/partials/main/main',
    controller: 'mainCtrl'
  });

  $routeProvider.when('/exams/:board?/:instrument?/:grade?', {
    templateUrl: '/partials/exam/examList',
    controller: 'examCtrl'
  });

  $routeProvider.when('/books/:isbn', {
    templateUrl: '/partials/book/bookDetails',
    controller: 'bookCtrl'
  });

  $routeProvider.when('/books', {
    templateUrl: '/partials/book/books',
    controller: 'bookCtrl'
  });

  $routeProvider.when('/instruments', {
    templateUrl: '/partials/instrument/instruments',
    controller: 'instrumentCtrl'
  });


    $routeProvider.when('/pieces', {
      templateUrl: '/partials/piece/pieces',
      controller: 'pieceCtrl'
    });

  $routeProvider.when('/pieces/:pieceId', {
    templateUrl: '/partials/piece/pieceDetails',
    controller: 'pieceCtrl'
  });



});
