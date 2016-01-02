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

    function SetController($stateParams, $state, $scope, $firebaseObject, Sets) {
      var vm = this;
      var ref = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/');
      // var setData = $firebaseObject(ref);

      ref.orderByChild("slug").equalTo($stateParams.setSlug).on("value", function(snapshot) {
        for (var key in snapshot.val()) {
          if (snapshot.val().hasOwnProperty(key)) {
            console.log(snapshot.val()[key]);
            vm.currentSet = snapshot.val()[key];

            break;
          }
        }
      });

    }

  }
);
