'use strict';

require.config({
  paths: {
    angular: '../../../bower_components/angular/angular',
    almond: '../../../bower_components/almond/almond',
    jquery: '../../../bower_components/jquery/dist/jquery',
    uiRouter: '../../../bower_components/angular-ui-router/release/angular-ui-router',
    ngSanitize: '../../../bower_components/angular-sanitize/angular-sanitize',
    slick: '../../../bower_components/slick-carousel/slick/slick',
  },
  shim: {
    slick: [ 'jquery' ],
    angular: {
      exports: 'angular',
      deps: [ 'jquery' ]
    },
    ngSanitize: [ 'angular' ],
    uiRouter: [ 'angular' ]
  },
  deps: [
    'angular',
    'app'
  ],
  callback: function(angular) {
    angular.bootstrap(document, [ 'App' ]);
  }
});
