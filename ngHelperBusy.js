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
        template: '<div id="ngHelperBusyLayer"><div class="wrapper"><div class="loader"></div><div class="message">{{busyMessage}}</div></div></div>',
        restrict: 'CEA',
        scope: true,
        controller: 'NgHelperBusyCtrl'
    };
}]);

/**
 * @ngdoc controller
 * @name ngHelperBusy.controller:ngHelperBusy
 * @description
 * # ngHelperBusy
 */
ngHelperBusy.controller('NgHelperBusyCtrl', ['$scope', '$rootScope', '$busy', function($scope, $rootScope, $busy) {
    var defaultMessage = "Please stay tuned...";

    $scope.busyMessage = defaultMessage;

    $rootScope.$on('$busy.setMessage', function() {
        $scope.busyMessage = $busy.getBusyMessage();
    });

    $rootScope.$on('$busy.resetMessage', function() {
        $scope.busyMessage = defaultMessage;
    })

    if( $busy.busyOnLoading ){
      $scope.busyMessage = $busy.getBusyMessage();
      $busy.beBusy();
    }
}]);

/**
 * @ngdoc service
 * @name ngHelperBusy.service:ngHelperBusy
 * @description
 * # ngHelperBusy
 */
ngHelperBusy.service('$busy', [ '$q', '$rootScope', function($q, $rootScope) {
    var self = this;
    var currentMessage = null;

    self.busyOnLoading = false;

    self.getBusyMessage = function() {
        return currentMessage;
    };

    self.setMessage = function(message) {
        currentMessage = message;
        $rootScope.$emit("$busy.setMessage");
    };

    self.resetMessage = function() {
        currentMessage = null;
        $rootScope.$emit("$busy.resetMessage");
    };

    self.during = function(promise) {

        // generate a promise
        var deferred = $q.defer();

        // make us busy
        self.beBusy();

        // wait until the given promise is done
        $q.when(promise).then(function(data) {

            // make us free
            self.beFree();

            // just call the then method of the original promise
            deferred.resolve(data);

        }, function(reason) {
            self.beFree();
            deferred.reject(reason)
        }, function(update) {
            deferred.notify(update)
        });

        // return our promise
        return deferred.promise;
    };

    self.beBusy = function() {
        // bring up the busy layer
        var busyElement = document.getElementById("ngHelperBusyLayer");
        if (busyElement !== null && busyElement !== undefined) {
            busyElement.classList.add("busy");
        }

        // lock the body
        var bodyElement = document.getElementsByTagName("body")[0];
        if (bodyElement !== null && bodyElement !== undefined) {
            bodyElement.classList.add("ngHelperBusyLayerNoScroll");
        }
    };

    self.beFree = function() {

        // hide the busy layer when done
        var busyElement = document.getElementById("ngHelperBusyLayer");
        var bodyElement = document.getElementsByTagName("body")[0];

        if (busyElement !== null && busyElement !== undefined) {
            busyElement.classList.remove("busy");
        }

        if (bodyElement !== null && bodyElement !== undefined) {
            bodyElement.classList.remove("ngHelperBusyLayerNoScroll");
        }

        // reset the message
        self.resetMessage();
    }
}]);
