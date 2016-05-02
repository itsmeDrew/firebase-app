'use strict';

require('angular');
require('./templates');
require('jquery');
require('angularfire');
require('firebase');
require('angular-ui-router');
require('angular-slick-carousel');
require('slick-carousel');

// CONTROLLERS
require('./controllers/HomeCtrl');
require('./controllers/NavCtrl');
require('./controllers/CategoryCtrl');
require('./controllers/SetsCtrl');
require('./controllers/DashboardCtrl');

//DIRECTIVES
require('./directives/routeClassnames');

//SERVICES
require('./services/sets');
require('./services/users');

var app = angular.module('App', [
  'ui.router',
  'firebase',
  'templates',
  'slickCarousel',
  'App.Controller.Nav',
  'App.Controller.Home',
  'App.Controller.Category',
  'App.Controller.Sets',
  'App.Controller.Dashboard',
  'App.Directive.RouteClassnames',
  'App.Service.Sets',
  'App.Service.Users'
]);

app.controller('AppCtrl', require('./controllers/AppCtrl'));

app.constant('config', window.config);

app.config(require('./on_config'));
