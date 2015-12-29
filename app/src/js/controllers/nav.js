'use strict';

define(
  [
    'angular'
  ],
  function(angular) {
    angular
      .module('App.Controller.Nav', [])
      .controller('NavController', NavController);

    function NavController($stateParams, $state, $scope) {
      var vm = this;
    }

  }
);
