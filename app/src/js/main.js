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
require('./controllers/HeaderCtrl');
require('./controllers/NavCtrl');
require('./controllers/CategoryCtrl');
require('./controllers/SetsCtrl');
require('./controllers/DashboardCtrl');

//DIRECTIVES
require('./directives/logo');
require('./directives/routeClassnames');
require('./directives/confirmClick');
require('./directives/nav/nav-main');
require('./directives/nav/profile');
require('./directives/nav/hamburger');

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
  'App.Controller.Header',
  'App.Controller.Category',
  'App.Controller.Sets',
  'App.Controller.Dashboard',
  'App.Directive.Logo',
  'App.Directive.RouteClassnames',
  'App.Directive.ngConfirmClick',
  'App.Directive.Nav.Profile',
  'App.Directive.Nav.Hamburger',
  'App.Directive.Nav.Main',
  'App.Service.Sets',
  'App.Service.Users'
]);

app.controller('AppCtrl', require('./controllers/AppCtrl'));

app.constant('config', window.config);

app.config(require('./on_config'));
