'use strict';

var app = angular.module('App.Controller.App', []);

app.controller('AppCtrl', AppCtrl);

function AppCtrl ($scope, $state, $firebaseObject, $firebaseAuth, users, sets) {
  var vm = this;
  var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
  var ref = new Firebase(baseDataURL);
  var auth = $firebaseAuth(ref);

  vm.login = login;
  vm.logout = logout
  $scope.user = '';

  sets.getSets().$bindTo($scope, 'sets');

  ref.onAuth(function(authData) {
    setUser();
  });

  if (!$scope.user) {
    $state.go("app", {}, {reload: true});
  }

  function login() {
    users.loginWithFacebook(auth, ref, reloadState);
  }

  function logout() {
    ref.unauth();
    $scope.user = '';
    $state.go("app", {}, {reload: true});
  }

  function reloadState() {
    $state.go($state.current, {}, {reload: true});
  }

  function setUser() {
    var authData = users.checkAuth(ref);

    if (authData) {
      console.log('scope', $scope);
      $scope.user = authData.facebook;
    }
  }

};

module.exports = AppCtrl;
