'use strict';

/**
 * @ngdoc function
 * @name urbnApp.controller:FinishCtrl
 * @description
 * # FinishCtrl
 * Controller of the urbnApp
 */
angular.module('urbnApp').controller('FinishCtrl', function ($window, Config, $scope, $location) {

    if (angular.isDefined($window.sessionStorage.history)) {
        var list = JSON.parse($window.sessionStorage.history);
        if (list[list.length - 1].title === Config.targetArticle) {
            $scope.solution = list;
        } else {
            $location.path('/');
        }
    } else {
        $location.path('/');
    }

});