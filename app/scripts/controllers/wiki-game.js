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
    
//    function getTarget() {
//        WikiRandomCached.get().$promise.then(function (data) {
//            $scope.target = data.items.pop();
//            $window.localStorage.target = JSON.stringify($scope.target);
//        }, function () {
//            $scope.target = 'Exceeded API calls.';
//        });
//    }
//
//    if (angular.isUndefined($window.localStorage.target)) { // check if in storage
//        getTarget(); // get new target
//    } else {
//        try {
//            $scope.target = JSON.parse($window.localStorage.target); // load from storage.
//        } catch (err) {
//            console.log('Could not parse cached target.');
//            console.error(err);
//            $window.localStorage.removeItem('target'); // clear bad value
//            getTarget(); // get new value
//        }
//    }

    $scope.getRandomPage = function () {
        console.log('Fetching a random page! Good luck!');
        WikiRandom.get().$promise.then(function (data) {
            $location.search('title', data.items[0].title);
        }, function (error) {
            $scope.article.html = error;
        });
    };
    
    $scope.getPage = function (titleParm) {
        $scope.article = {};
        $scope.article.title = titleParm;
        WikiPage.get({
            title: titleParm
        }).$promise.then(function (response) {
            $scope.article.html = response.html;
//            $scope.target = response.html;
        }, function (response) {
            // $scope.targetPage = $sce.trustAsHtml(response);
        });
    }
    
    function lookupQuery() {
        var query = $location.search();
        if(angular.isDefined(query.title)){
            $scope.getPage(query.title);
        } else {
            $scope.getRandomPage()
        }
    }
    
    lookupQuery();
    
    $scope.$on('$routeUpdate', function () {
        lookupQuery();
    });

}).filter('pretty', function () {
    // Easy way to replace underscores with spaces
    // {{ 'my_title' | pretty }} --> 'my title'
    
    return function (uglyTitle) {
        if (typeof uglyTitle !== 'undefined') {
            var prettyTitle = uglyTitle.replace(/_/g, ' ');
            return prettyTitle;
        } else {
            return uglyTitle;
        }
    }
});