'use strict';

var app = angular.module('App.Controller.Sets', []);

app.controller('SetsCtrl', SetsCtrl);

function SetsCtrl ($stateParams, $state, $scope, $firebaseArray, $firebaseObject, config, sets) {
  var vm = this;
  var usersDataURL = config.usersDataURL;
  var setsRef = new Firebase(config.setsDataURL);
  var user = $scope.$parent.user;

  sets.getSetBySlug($stateParams.setSlug, function(setData) {
    var _currentSet = setData;
    var _userSetsRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + _currentSet.slug + '/cards/' );

    vm.currentSet = _currentSet;
    vm.setsService = sets;
    vm.userCards = $firebaseArray(_userSetsRef);
    vm.updateQty = updateQty;
    vm.updated = false;

    function updateQty(e, set, user, card, newQty) {
      vm.setsService.updateQty(e, set, user, card, newQty, function() {
        $scope.$emit('state.reload');
      });
    }
  });
};

module.exports = SetsCtrl;
