'use strict';

var app = angular.module('App.Directive.Nav.Hamburger', []);

app.directive('hamburger', hamburger);

function hamburger() {
  return {
    restrict: 'E',
    templateUrl: 'partials/nav/_hamburger.html',
    link: function (scope, element, attr) {
      var vm = this;

    }
  }

}

module.exports = hamburger;
