'use strict';

var app = angular.module('App.Controller.App', []);

app.controller('AppCtrl', AppCtrl);

function AppCtrl ($scope, $firebaseObject, $state, users, sets, config) {
  var vm = this;
  var setsRef = new Firebase(config.baseDataURL);


  vm.login = login;
  vm.logout = logout;
  vm.menuOpen = false;
  vm.closeNav = closeNav;
  $scope.user = '';

  sets.getSets().$bindTo($scope, 'sets');

  setsRef.onAuth(function(authData) {
    setUser();
  });

  if (!$scope.user) {
    $state.go("app", {}, {reload: true});
  }

  $scope.$on('state.reload', function() {
    reloadState();
  });

  $scope.$on('nav.toggle', function() {
    vm.menuOpen = ! vm.menuOpen;
  });

  function login() {
    users.login(reloadState);
  }

  function logout() {
    users.logout();
    $scope.user = '';
    $state.go("app", {}, {reload: true});
  }

  function reloadState() {
    $state.go($state.current, {}, {reload: true});
  }

  function setUser() {
    var authData = users.checkAuth();

    if (authData) {
      $scope.user = authData.facebook;

      var user = $scope.user;
      var userRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/role');

      userRef.once("value", function(snapshot) {
        $scope.user.role = snapshot.val();
      })
    }
  }

  function closeNav(clickEvent) {
    var _parentClass = clickEvent.target.offsetParent.className;

    if (vm.menuOpen === true && _parentClass !== 'menu ng-scope' && _parentClass !== 'site-nav__nav ng-scope'&& _parentClass !== 'ng-scope menu-active') {
      $scope.$emit('nav.toggle');
    }
  }

};

module.exports = AppCtrl;
