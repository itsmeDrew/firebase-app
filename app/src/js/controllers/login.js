'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Controller.Login', ['firebase'])
      .controller('LoginController', LoginController);

    function LoginController($stateParams, $state, $scope, Login, $firebaseAuth) {
      var vm = this;

      vm.login = login;
      vm.loggedIn = false;

      function login() {
        Login.loginWithFacebook();
        vm.loggedIn = true;
      }
    }

  }
);
