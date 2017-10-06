angular.module('urbnApp').directive('a', function ($location) {
    /**
     * Whenever an anchor is clicked, we need to hijack it.
     * TODO: rename this file to the anchorLabeler
     */
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            /**
             * This link function will go through all anchors in the DOM.
             * For all wiki link anchors, we add visual feedback.
             * For all anchors used for navigating within this webapp, leave alone.
             * For all other anchors, disable. We dont want the user's session interrupted.
             */
            
            var url = attrs.href;
            
            // TODO: make a regex for this
            // for all wiki links without a ':' or '#' and start with './'
            if (attrs.rel === 'mw:WikiLink' && url.indexOf(':') < 0 && url.indexOf('#') < 0 && url.substr(0, 2) === './') {
                 // add bootstrap label class so all clickable links have clear visual feedback
                elem.addClass('label label-primary fixed-font');
                // add click event listener to this anchor
                elem.on('click', clickHandler);
                
            } else if (typeof url !== 'undefined' && url.substring(0, 2) === '#/') {
                // do not interfere with anchors with these values
//                console.log('Native href:->');
//                console.log(attrs);
                
            } else if (typeof attrs.ngHref !== 'undefined' && attrs.ngHref.substring(0, 2) === '#/') {
                // do not interfere with anchors with these values
//                console.log('Native angular href:->');
//                console.log(attrs);
                
            } else {
                // disable all other links
                elem.addClass('deactivated');
            }
            
            function clickHandler(e) {
                // do not load the url
                e.preventDefault();

                // remove first 2 characters, which are "./"
                var title = url.substr(2);

                // add query parameter for our app
                // encoding title to deter cheating a bit. (typing in the destination in the url and instantly winning)
                $location.search('title', btoa(title));

                // $apply() is used to execute an expression in angular from outside of the angular framework 
                scope.$apply();
            }
            
                    
        }
    };
});