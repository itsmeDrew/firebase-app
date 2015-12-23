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
  'controllers/home'
  ],
  function(angular) {
    angular
    .module('App', [
      'ui.router',
      'ngSanitize',
      'App.Templates',
      'App.Config',
      'App.Controller.Home'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $rootScope) {
      var vm = this;
    }
  }

);
