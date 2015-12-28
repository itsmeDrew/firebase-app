'use strict';

define(
  [
    'angular',
    'uiRouter'
  ],
  function(angular) {
    angular
      .module('App.Service.Firebase', [])
      .service('Firebase', Firebase);

      function Firebase($q, $http, config) {
        this.getData = getData;

        function getData() {
          console.log('getting firebase stuff');
        }

      }

  }
);
