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
  'controllers/login',
  'controllers/nav'
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
      'App.Controller.Login',
      'App.Controller.Nav'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $rootScope, $firebaseArray) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var dataSets = new Firebase(baseDataURL + 'setsAvailable/');

      $scope.sets = $firebaseArray(dataSets);

    }
  }

);
