angular.module('urbnApp.directives', []).directive('a', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.rel === 'mw:WikiLink') {
                console.log(attrs);
                elem.on('click', function (e) {
                    e.preventDefault();
                    console.log('we should be going here now: ' + attrs.href);
                });
            } else {
//                console.log(attrs);
            }
        }
    };
});