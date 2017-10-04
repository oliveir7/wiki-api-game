angular.module('urbnApp.services', []).factory('WikiRandomCached', function ($resource) {
    return $resource('https://en.wikipedia.org/api/rest_v1/page/random/title', {}, {
        get: {
            cache: true,
            method: 'get'
        }
    });
}).factory('WikiRandom', function ($resource) {
    return $resource('https://en.wikipedia.org/api/rest_v1/page/random/title', {}, {
        get: {
//            cache: true,
            method: 'get'
        }
    });
});