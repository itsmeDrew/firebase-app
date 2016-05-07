'use strict';

var app = angular.module('App.Directive.Logo', []);

app.directive('logo', logo);

function logo($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'partials/_logo.html',
    link: function (scope, element, attr) {
      var vm = this;

    }
  };
}

module.exports = logo;
