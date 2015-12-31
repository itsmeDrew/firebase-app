'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Controller.Admin', [])
      .controller('AdminController', AdminController);

    function AdminController($stateParams, $state, $scope) {
      var vm = this;
      vm.setSlug = $stateParams.setSlug;
    }

  }
);
