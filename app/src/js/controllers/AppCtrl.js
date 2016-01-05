'use strict';

var app = angular.module('App.Controller.App', []);

app.controller('AppCtrl', AppCtrl);

function AppCtrl ($scope, $state, $firebaseObject, $firebaseAuth, users, sets) {
  var vm = this;
  var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
  var ref = new Firebase(baseDataURL);
  var setsURL = new Firebase(baseDataURL + 'setsAvailable/');
  var cardSets = $firebaseObject(setsURL);
  var auth = $firebaseAuth(ref);

  vm.login = login;
  vm.logout = logout
  $scope.user = '';
  vm.setCards = true; //dev

  cardSets.$bindTo($scope, 'sets');

  if (vm.setCards) {
    sets.setCardData(ref);
  }

  ref.onAuth(function(authData) {
    setUser();
  });

  function login() {
    users.loginWithFacebook(auth, ref);
  }

  function logout() {
    ref.unauth();
    $scope.user = '';
    $state.go($state.current, {}, {reload: true});
  }

  function setUser() {
    var authData = users.checkAuth(ref);

    if (authData) {
      $scope.user = authData.facebook;
    }
  }

};

module.exports = AppCtrl;
