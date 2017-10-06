angular.module("urbnApp").directive('progressTracker', function () {
    /**
     * Manages the sidebar, tracks viewed articles.
     */
    return {
//        require: 'ngModel', 
        restrict: 'E',
        scope: {
            stack: '='
        },
        templateUrl: 'views/progressTracker.html',
        link: function (scope, element, attrs) {
            
        },
        controller: function($scope, Config){
            
//            $scope.$watch($scope.stack, function () {
//                console.info($scope.stack.pop());
//
//                if ($scope.stack.pop().title === $scope.goal) {
//                    $scope.finished = true;
//                    console.log('we are done!')
//                } else {
//                    console.log('we are not done!')
//                }
//
//            });
            
            $scope.goal = Config.targetArticle;
            console.log(btoa($scope.goal))

        }
    }
});