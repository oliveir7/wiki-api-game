'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('urbnApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('should load Config constants', function () {
        expect(scope.goal).toEqual('Helicopter');
        expect(scope.gameName).toEqual('Get to the Chopper!');
        console.info(scope.playBtnUrl)
    });

});
