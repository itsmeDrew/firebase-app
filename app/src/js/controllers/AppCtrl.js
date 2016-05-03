'use strict';

var app = angular.module('App.Controller.App', []);

app.controller('AppCtrl', AppCtrl);

function AppCtrl ($scope, $state, users, sets, config) {
  var vm = this;
  var setsRef = new Firebase(config.baseDataURL);

  vm.login = login;
  vm.logout = logout
  $scope.user = '';

  sets.getSets().$bindTo($scope, 'sets');

  setsRef.onAuth(function(authData) {
    setUser();
  });

  if (!$scope.user) {
    $state.go("app", {}, {reload: true});
  }

  $scope.$on('nav.toggle', function() {
    vm.menuOpen = ! vm.menuOpen;
  });

  $scope.$on('state.reload', function() {
    $state.go($state.current, {}, {reload: true});
  });

  function login() {
    users.login($scope.$emit('state.reload'));
  }

  function logout() {
    users.logout();
    $scope.user = '';
    $state.go("app", {}, {reload: true});
  }

  function setUser() {
    var authData = users.checkAuth();

    if (authData) {
      $scope.user = authData.facebook;
    }
  }

};

module.exports = AppCtrl;
