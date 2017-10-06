'use strict';

/**
 * @ngdoc function
 * @name urbnApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urbnApp
 */
angular.module('urbnApp').controller('AboutCtrl', function ($window, Config, $scope, $location) {

    if (angular.isDefined($window.sessionStorage.history)) {
        var list = JSON.parse($window.sessionStorage.history);
        if (list[list.length - 1].title === Config.targetArticle) {
            $scope.solution = list;
//            alert('you won!')
        } else {
            alert('cheater!')
        }
    } else {
        $location.path('#/');
    }

});