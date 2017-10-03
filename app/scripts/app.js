'use strict';

/**
 * @ngdoc overview
 * @name urbnApp
 * @description
 * # urbnApp
 *
 * Main module of the application.
 */
angular
  .module('urbnApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix(''); // https://stackoverflow.com/questions/41211875/angularjs-1-6-0-latest-now-routes-not-working
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/kuler', {
        templateUrl: 'views/kuler.html',
        controller: 'KulerCtrl',
        controllerAs: 'kuler'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
