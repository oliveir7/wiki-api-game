angular.module('urbnApp.services', []).factory('API', function () {
    return {
        baseURL: function () {
            return 'https://en.wikipedia.org/api/rest_v1';
        }
    }
}).factory('WikiRandomCached', function ($resource, API) {
    return $resource(API.baseURL() + '/page/random/title', {}, {
        get: {
            cache: true,
            method: 'get'
        }
    });
}).factory('WikiRandom', function ($resource, API) {
    return $resource(API.baseURL() + '/page/random/title', {}, {
        get: {
            method: 'get'
        }
    });
}).factory('WikiPage', function ($resource, API) {
    return $resource(API.baseURL() + '/page/html/:title', {}, {
        get: {
            cache: true,
            method: 'get',
            transformResponse: function(data){
                var page = {};
                page.html = data;
                return page;
            }
        }
    });
});