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

    function appCtrl($scope, $state, $rootScope, $firebaseArray, Users) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var dataSets = new Firebase(baseDataURL + 'setsAvailable/');

      vm.login = login;

      function login() {
        Users.login();
      }

     $scope.sets = $firebaseArray(dataSets);


    }
  }

);
