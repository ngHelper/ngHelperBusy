'use strict';

/**
 * The module contains everything we need to handle the busy indicator logic
 */
var ngHelperBusy = angular.module('ngHelperBusy', []);

/**
 * @ngdoc directive
 * @name ngHelperBusy.directive:ngHelperBusy
 * @description
 * # ngHelperBusy
 */
ngHelperBusy.directive('ngHelperBusy',['$busy', function ($busy) {
    return {
        template: '<div id="ngHelperBusyLayer"><div class="wrapper"><div class="loader"></div><div class="message">Please stay tuned...</div></div></div>',
        restrict: 'CEA',
        scope: true
    };
}]);

/**
 * @ngdoc service
 * @name ngHelperBusy.service:ngHelperBusy
 * @description
 * # ngHelperBusy
 */
ngHelperBusy.service('$busy', [ '$q', function($q) {
    var self = this;
    var domElement = null;

    self.during = function(promise) {

        // generate a promise
        var deferred = $q.defer();

        // bring up the busy layer
        var busyElement = document.getElementById("ngHelperBusyLayer");
        busyElement.classList.add("busy");

        // lock the body
        var bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.classList.add("ngHelperBusyLayerNoScroll");

        // wait until the given promise is done
        $q.when(promise).then(function(data) {

            // hide the busy layer when done
            busyElement.classList.remove("busy");
            bodyElement.classList.remove("ngHelperBusyLayerNoScroll");

            // just call the then method of the original promise
            deferred.resolve(data);

        }, deferred.reject,  deferred.notify);

        // return our promise
        return deferred.promise;
    }
}]);
