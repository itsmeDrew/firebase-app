'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('app', {
      url: '/',
      views: {
        'header': {
          templateUrl: 'partials/_header.html'
        },
        'nav@app': {
          templateUrl: 'partials/_nav.html',
          controller: 'NavCtrl',
          controllerAs: 'nav'
        },
        'content': {
          templateUrl: 'templates/home.tpl.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        },
        'footer': {
          templateUrl: 'partials/_footer.html'
        }
      }
    })
    .state('app.category', {
      url: 'sets',
      data : {
        cssClassnames : 'sets'
      },
      views: {
        'content@': {
          templateUrl: 'templates/category.tpl.html',
          controller: 'CategoryCtrl',
          controllerAs: 'cat'
        }
      }
    })
    .state('app.set', {
      url: 'sets/:setSlug',
      data : {
        cssClassnames : 'set'
      },
      views: {
        'content@': {
          templateUrl: 'templates/set.tpl.html',
          controller: 'SetsCtrl',
          controllerAs: 'set'
        }
      },
      params : { setId: null, },
    })
    .state('app.dashboard', {
      url: 'dashboard',
      data : {
        cssClassnames : 'dashboard'
      },
      views: {
        'content@': {
          templateUrl: 'templates/dashboard.tpl.html',
          controller: 'DashboardCtrl',
          controllerAs: 'dashboard'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
