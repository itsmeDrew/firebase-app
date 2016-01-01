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
        .state('app', {
          url: '/',
          views: {
            'header': {
              templateUrl: 'partials/_header.html'
            },
            'nav@app': {
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
        })
        .state('app.category', {
          url: 'sets',
          views: {
            'content@': {
              templateUrl: 'templates/category.tpl.html',
              controller: 'CategoryController',
              controllerAs: 'cat'
            }
          }
        })
        .state('app.set', {
          url: 'sets/:setSlug',
          views: {
            'content@': {
              templateUrl: 'templates/set.tpl.html',
              controller: 'SetController',
              controllerAs: 'set'
            }
          },
          params : { setId: null, },
        });
    }

  }
);
