'use strict';

define(
  [
  'angular',
  'ngSanitize',
  'uiRouter',
  'jquery',
  'slick',
  'app-config',
  'templates',
  'controllers/home',
  'controllers/nav',
  'services/firebase'
  ],
  function(angular) {
    angular
    .module('App', [
      'ui.router',
      'ngSanitize',
      'App.Templates',
      'App.Config',
      'App.Controller.Home',
      'App.Controller.Nav',
      'App.Service.Firebase'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $rootScope) {
      var vm = this;
    }
  }

);
