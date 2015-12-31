'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Controller.Category', [])
      .controller('CategoryController', CategoryController);

    function CategoryController($stateParams, $state, $scope) {
      var vm = this;
      vm.setSlug = $stateParams.setSlug;
    }

  }
);
