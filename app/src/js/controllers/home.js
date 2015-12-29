'use strict';

define(
  [
    'angular'
  ],
  function(angular) {
    angular
      .module('App.Controller.Home', [])
      .controller('HomeController', HomeController);

    function HomeController($stateParams, $state, $scope) {
      var vm = this;
    }

  }
);
