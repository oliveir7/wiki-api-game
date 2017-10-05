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
    'ui.bootstrap',
    'urbnApp.services',
    'ngAnimate',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix(''); // https://stackoverflow.com/questions/41211875/angularjs-1-6-0-latest-now-routes-not-working
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/start', {
        templateUrl: 'views/wiki-game-start.html',
        controller: 'WikiGameCtrl',
        reloadOnSearch: false // do not leave page when a query parameter is added
      })
      .otherwise({
        redirectTo: '/'
      });
  });
