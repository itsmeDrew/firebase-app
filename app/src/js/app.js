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
    'controllers/category',
    'controllers/sets',
    'services/sets',
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
      'App.Controller.Category',
      'App.Controller.Sets',
      'App.Service.Sets',
      'App.Service.Users'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $firebaseObject, $firebaseAuth, Users, Sets) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var ref = new Firebase(baseDataURL);
      var setsURL = new Firebase(baseDataURL + 'setsAvailable/');
      var cardSets = $firebaseObject(setsURL);
      var auth = $firebaseAuth(ref);

      vm.login = login;
      vm.logout = logout
      vm.user = '';
      vm.setCards = false; //dev

      cardSets.$bindTo($scope, 'sets');

      if (vm.setCards) {
        Sets.setCardData(ref);
      }

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
