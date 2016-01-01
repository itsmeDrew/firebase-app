'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Controller.Sets', [])
      .controller('SetController', SetController);

    function SetController($stateParams, $state, $scope, $firebaseObject) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/setsAvailable/';
      var ref = new Firebase(baseDataURL + $stateParams.setId);
      var setData = $firebaseObject(ref);

      vm.currentSet = setData;

      console.log('vm.currentSet', vm.currentSet);

    }

  }
);
