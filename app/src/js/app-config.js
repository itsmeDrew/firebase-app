'use strict';

define(
  [
    'angular'
  ],
  function(angular) {
    angular
      .module('App.Config', [])
      .constant('config', window.config)
      .config(appConfig);

    function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          views: {
            'header': {
              templateUrl: 'partials/_header.html'
            },
            'nav@home': {
              templateUrl: 'partials/_nav.html',
              controller: 'NavController'
            },
            'content': {
              templateUrl: 'templates/home.tpl.html',
              controller: 'HomeController',
              controllerAs: 'home'
            },
            'footer': {
              templateUrl: 'partials/_footer.html'
            }
          }
        });
    }

  }
);
