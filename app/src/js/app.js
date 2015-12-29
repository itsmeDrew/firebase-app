'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire',
    'ngSanitize',
    'uiRouter',
    'jquery',
    'slick',
    'app-config',
    'templates',
    'controllers/home',
    'controllers/nav',
    'services/users'
  ],
  function(angular) {
    angular
    .module('App', [
      'ui.router',
      'ngSanitize',
      'firebase',
      'App.Templates',
      'App.Config',
      'App.Controller.Home',
      'App.Controller.Nav',
      'App.Service.Users'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $stateParams, $rootScope, $firebaseObject, $firebaseArray, $firebaseAuth, Users) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var ref = new Firebase(baseDataURL);
      var setsURL = new Firebase(baseDataURL + 'setsAvailable/');
      var cardSets = $firebaseObject(setsURL);
      var auth = $firebaseAuth(ref);

      vm.login = login;
      vm.logout = logout
      vm.user = '';

      cardSets.$bindTo($scope, 'sets');

      ref.onAuth(function(authData) {
        setUser();
      });

      function login() {
        Users.loginWithFacebook(auth, ref);
      }

      function logout() {
        ref.unauth();
        vm.user = '';
        $state.go($state.current, {}, {reload: true});
      }

      function setUser() {
        var authData = Users.checkAuth(ref);

        if (authData) {
          vm.user = authData.facebook;
        }
      }


    }
  }

);
