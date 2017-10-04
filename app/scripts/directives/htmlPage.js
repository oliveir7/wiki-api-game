angular.module("urbnApp.directives", []).directive('dynamicElement', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            message: "="
        },
        replace: true,
        link: function (scope, element, attrs) {
            console.log(scope.message);
            var template = $compile(scope.message)(scope);
            element.replaceWith(template);
        },
        controller: function ($scope) {
            $scope.clickMe = function () {
                console.log("hi");
            };
        }
    }
});