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
                if (typeof html !== 'undefined') {
                    // trying to get rid of things that break the compile, such as []
                    html = html.replace(/ *\[[^)]*\] */g, ""); 
                    
                    element[0].innerHTML = html;
                    try {
                        $compile(element.contents())(scope);
                    } catch (err) {
                        console.info(err);
                    }
                }
            });
        }
    }
});