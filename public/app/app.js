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

  $routeProvider.when('/exams', {
    templateUrl: '/partials/exam/exams',
    controller: 'examCtrl'
  });

  $routeProvider.when('/books', {
    templateUrl: '/partials/book/books',
    controller: 'bookCtrl'
  });

  $routeProvider.when('/instruments', {
    templateUrl: '/partials/instrument/instruments',
    controller: 'instrumentCtrl'
  });


});
