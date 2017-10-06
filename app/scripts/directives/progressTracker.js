angular.module("urbnApp").directive('progressTracker', function ($compile, $window) {
    /**
     * Manages the sidebar, tracks viewed articles.
     */
    return {
        restrict: 'E',
        templateUrl: 'views/progressTracker.html',
        link: function (scope, element, attrs) {
            
        }
    }
});