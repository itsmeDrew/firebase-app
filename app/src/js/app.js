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
  'services/dex-data'
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
      'App.Service.DexData'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $rootScope, $firebaseArray) {
      var vm = this;

      var dataSets = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/');

     $scope.sets = $firebaseArray(dataSets);

     console.log($scope.sets[0]);

    }
  }

);
