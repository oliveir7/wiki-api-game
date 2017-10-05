'use strict';

/**
 * @ngdoc function
 * @name urbnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urbnApp
 */
angular.module('urbnApp').controller('WikiGameCtrl', function ($scope, WikiRandomCached, WikiRandom, $window, WikiPage, $compile, $location) {

    /**
     * The wikipedia adventure game.
     * 1. you will get given a random article on wikipedia. This is your target article.
     * 2. you will then be thrown onto another random article.
     * 3. your objective is to get to the target article in the fewest clicks possible.
     * 4. you must use the links in each article to progress to the end.
     * 5. good luck!
     */

    function getTarget() {
        WikiRandomCached.get().$promise.then(function (data) {
            $scope.target = data.items.pop();
            $window.localStorage.target = JSON.stringify($scope.target);
        }, function () {
            $scope.target = 'Exceeded API calls.';
        });
    }

    if (angular.isUndefined($window.localStorage.target)) { // check if in storage
        getTarget(); // get new target
    } else {
        try {
            $scope.target = JSON.parse($window.localStorage.target); // load from storage.
        } catch (err) {
            console.log('Could not parse cached target.');
            console.error(err);
            $window.localStorage.removeItem('target'); // clear bad value
            getTarget(); // get new value
        }
    }

    $scope.getRandomPage = function () {
        $scope.currentPage = "Loading...";
        WikiRandom.get().$promise.then(function (data) {
            $scope.currentPage = data.items[0];
            $window.localStorage.targetTitle = data.items[0].title;
        }, function (error) {
            $scope.currentPage = error;
        });
    };
    
    $scope.getPage = function (titleParm) {
        $scope.article = {};
        $scope.article.title = titleParm;
        WikiPage.get({
            title: titleParm
        }).$promise.then(function (response) {
            $scope.article.html = response.html;
        }, function (response) {
            // $scope.targetPage = $sce.trustAsHtml(response);
        });
    }
    
    function lookupQuery() {
        var query = $location.search();
        if(angular.isDefined(query.title)){
            $scope.getPage(query.title);
        }
    }
    
    lookupQuery();
    
    $scope.$on('$routeUpdate', function () {
        lookupQuery();
    });

});