'use strict';

define(
  [
    'angular',
    'uiRouter',
    'firebase'
  ],
  function(angular) {
    angular
      .module('App.Service.DexData', [])
      .service('dexData', dexData);

      function dexData($scope) {
        console.log('here');
      }

  }
);
