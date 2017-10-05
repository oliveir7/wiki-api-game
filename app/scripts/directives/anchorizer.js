angular.module('urbnApp').directive('a', function ($location) {
    /**
     * Whenever an anchor is clicked, we need to hijack it.
     */
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            // for all article links, add a click listener
            // links with a colon break things... for now.
            if (attrs.rel === 'mw:WikiLink' && attrs.href.indexOf(':') < 0) {
                elem.addClass('WikiLink');
                elem.on('click', function (e) {
//                    console.log(attrs);
                    e.preventDefault(); // do not load the url
                    var title = attrs.href.replace(/(\.\/)/g, ''); // delete './' from url, just need the title
                    $location.search('title', title); // add query parameter for our app
                    scope.$apply(); // $apply() is used to execute an expression in angular from outside of the angular framework 
                });
            } else {
                if (attrs.href === '#/' || attrs.href === '#/start' || attrs.ngHref === '#/' || attrs.ngHref === '#/start') {
                    // do not interfere with anchors with these values
                } else {
                    // disable all other links
                    elem.addClass('deactivated');
                }
            }
        }
    };
});