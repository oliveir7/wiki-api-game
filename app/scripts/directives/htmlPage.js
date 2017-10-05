angular.module("urbnApp").directive('dynamicHtml', function ($compile) {
    /**
     * ng-bind-html does not $compile when added to the DOM.
     * hence the existence of this directive.
     */
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, element, attrs) {
            // whenever a new html string is loaded, compile it with angular.
            scope.$watch(attrs.dynamicHtml, function (html) {
                element[0].innerHTML = html;
                $compile(element.contents())(scope);
            });
        }
    }
});