'use strict';

define(
  [
    'angular'
  ],
  function(angular) {
    angular
      .module('App.Controller.Nav', [])
      .controller('NavController', NavController);

    function NavController($stateParams, $state, $scope, Firebase) {
      var vm = this;
      console.log('nav ctrl here');

      Firebase.getData();
    }

  }
);
