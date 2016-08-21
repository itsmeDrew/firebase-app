'use strict';

var app = angular.module('App.Controller.App', []);

app.controller('AppCtrl', AppCtrl);

function AppCtrl ($scope, $firebaseObject, $state, users, sets, config) {
  var vm = this;
  var setsRef = new Firebase(config.baseDataURL);


  vm.loginWithFacebook = loginWithFacebook;
  vm.loginWithGoogle = loginWithGoogle;
  vm.logout = logout;
  $scope.user = '';

  sets.getSets().$bindTo($scope, 'sets');
  console.log($scope);
  setsRef.onAuth(function(authData) {
    setUser();
  });

  if (!$scope.user) {
    $state.go("app", {}, {reload: true});
  }

  $scope.$on('state.reload', function() {
    reloadState();
  });

  function loginWithFacebook() {
    users.loginWithFacebook(reloadState);
  }

  function loginWithGoogle() {
    users.loginWithGoogle(reloadState);
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
      if (authData.provider === 'facebook') {
        $scope.user = authData.facebook;
      } else if (authData.provider === 'google') {
        $scope.user = authData.google;
      }

      $scope.user.uid = authData.uid;

      var _user = $scope.user;
      var userRef = new Firebase(usersDataURL + '/' + _user.uid + '/role');

      userRef.once("value", function(snapshot) {
        _user.role = snapshot.val();
      })
    }
  }

};

module.exports = AppCtrl;
