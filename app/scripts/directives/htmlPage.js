angular.module("urbnApp").directive('dynamicHtml', function ($compile, $window) {
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
                if (typeof html !== 'undefined') {
                    try {
                        $compile(element.contents())(scope);
                    }catch(e){
                        alert('Error. Could not render this page.');
                        $window.history.back();
                    }
                }
            });
        }
    }
});