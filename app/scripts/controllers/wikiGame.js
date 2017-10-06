'use strict';

/**
 * @ngdoc function
 * @name urbnApp.controller:WikiGameCtrl
 * @description
 * # WikiGameCtrl
 * Controller of the urbnApp
 */
angular.module('urbnApp').controller('WikiGameCtrl', function ($scope, $window, WikiPage, $compile, $location, Config) {

    /**
     * 1. you will get given a random article on wikipedia. 
     * 2. your objective is to get to the target article in the fewest clicks possible.
     * 3. you must use the links in each article to progress to the end.
     */
    
    var list = null; // handles the saved history list before displaying on screen.
    
    $scope.getPage = function (titleParm) {
        // empty list, need to init
        if (list === null) {
            // if we have a session saved, lets try and load it.
            if (angular.isDefined($window.sessionStorage.history)) {
                list = JSON.parse($window.sessionStorage.history);
            } else {
                list = [];
            }
        }

        $scope.article = {};
        $scope.article.title = titleParm;
        WikiPage.get({
            title: titleParm
        }).$promise.then(function (response) {
            $scope.article.html = response.html;
            
            if (list.length === 0 || (list.length > 0 && list[list.length-1].title !== titleParm)) {
                // the if statement above prevents a duplicate article on a page refresh
                list.push({
                    title: titleParm
                });
            } 
            $scope.history = list;
            $window.sessionStorage.history = JSON.stringify($scope.history); // save updated list in storage
            
        }, function (response) {
            window.location.href = '404.html';
            console.error(response);
        });
    }
    
    function lookupQuery() {
        var query = $location.search();
        if(angular.isDefined(query.title)){
            // decoding the encoded title
            $scope.getPage(atob(query.title));
        } else {
            $location.path('#/')
        }
    }
    
    $scope.goal = Config.targetArticle;
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