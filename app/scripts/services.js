"use strict";

angular.module('urbnApp.services', [])
    .factory('WikiRandom', function ($resource, Config) {
        return $resource(Config.apiUrl + '/page/random/title', {}, {
            get: {
                method: 'get'
            }
        });
    })
    .factory('WikiPage', function ($resource, Config) {
        return $resource(Config.apiUrl + '/page/html/:title', {}, {
            get: {
                cache: true,
                method: 'get',
                transformResponse: function (data) {
                    var page = {}; 
                    page.html = data;
                    return page;
                }
            }
        });
    });