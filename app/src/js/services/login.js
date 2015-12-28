'use strict';

define(
  [
    'angular',
    'firebase',
    'uiRouter',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Service.Login', ['firebase'])
      .service('Login', Login);

      function Login($firebaseAuth) {
        

      }

  }
);
