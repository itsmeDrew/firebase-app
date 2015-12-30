'use strict';

define(
  [
    'angular'
  ],
  function(angular) {
    angular
      .module('App.Controller.Sets', [])
      .controller('SetController', SetController);

    function SetController($stateParams, $state, $scope) {
      var vm = this;
      vm.setName = $stateParams.setName;

      console.log($stateParams);
    }

  }
);
