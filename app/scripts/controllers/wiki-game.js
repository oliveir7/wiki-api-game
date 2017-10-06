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
    var list = null;
    
    $scope.getPage = function (titleParm) {
        // empty list, need to init
        if (list === null) {
            // if we have a session cached, lets try and load it.
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
            // TODO: handle error
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
    
    

//            TODO: bind ng model. listen for added nodes. check for win. update node colors.
//            TODO: rename title parm to id
            
            // for every article we need:
            // the title
            // a hover handler, to make the call.
            // check if its the game winning article.
//            
//            for(var i=0, len=10; i<len; i++){
//                var article = {};
//                article.title = 'WOOOOO #';
//                $scope.history.push(article);
//            }

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