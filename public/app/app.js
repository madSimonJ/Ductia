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
});
