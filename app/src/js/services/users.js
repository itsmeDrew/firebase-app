'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Service.Users', ['firebase'])
      .service('Users', UserController);

    function UserController() {
      var vm = this;
      vm.getName = getName;

      function getName() {
        console.log('getting name');
      }
    }

  }
);
