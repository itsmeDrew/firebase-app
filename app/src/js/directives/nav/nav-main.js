'use strict';

var app = angular.module('App.Directive.Nav.Main', []);

app.directive('navMain', navMain);

function navMain() {
  return {
    restrict: 'E',
    templateUrl: 'partials/nav/_nav-main.html',
    link: function (scope, element, attr) {
      var vm = this;

    }
  }

}

module.exports = navMain;
