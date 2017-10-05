angular.module('urbnApp').directive('a', function () {
    /**
     * Whenever an anchor is clicked, we need to hijack it.
     */
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            // for all article links, add a click listener
            if (attrs.rel === 'mw:WikiLink') {
                elem.addClass('WikiLink');
                elem.on('click', function (e) {
                    console.log('We should be going here now: ' + attrs.href);
                    e.preventDefault(); // do not load the page
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