'use strict';

/**
 * @ngdoc function
 * @name urbnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urbnApp
 */
angular.module('urbnApp').controller('MainCtrl', function ($scope, WikiRandom, Config) {
    $scope.gameName = Config.appName;
    $scope.goal = Config.targetArticle;

    function setStartingPoint() {
        $scope.ready = false; // once ready, the play btn is enabled
        $scope.playBtnUrl = '#/'; // default url is home until the starting point is calculated

        // make api call that fetches a random wikipedia page, then set as starting url.
        WikiRandom.get().$promise.then(function (data) {
            // encode title to deter cheating a bit. (typing in the destination in the url and instantly winning)
            try {
                $scope.playBtnUrl = '#/play?title=' + btoa(data.items[0].title);
            } catch (err) {
                console.error(data.items[0].title);
                setStartingPoint(); // try again, above breaks for non latin characters.
            }
            $scope.ready = true;

        }, function (error) {
            console.error(error);
        });
    }

    setStartingPoint();
});