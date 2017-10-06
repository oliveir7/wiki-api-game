angular.module("urbnApp").directive('progressTracker', function () {
    /**
     * Manages the sidebar, tracks viewed articles.
     */
    return {
        restrict: 'E',
        scope: {
            stack: '='
        },
        templateUrl: 'views/progressTracker.html',
//        link: function (scope, element, attrs) {
//            
//        },
        controller: function($scope, Config, $location){
            $scope.finished = function(){
                $scope.atFinish = true;
                $location.path('/finish');
                $location.search({}); // clear query params
            }
            
            $scope.goal = Config.targetArticle;
            console.log('Psst... here\'s a cheat code: ' + btoa($scope.goal));
        }
    }
});