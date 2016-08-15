'use strict';

var app = angular.module('App.Directive.Progress.Bar', []);

app.directive('progressBar', progressBar);

function progressBar($rootScope) {
  return {
    restrict: 'E',
    scope: {
      currentCount: '=currentCount',
      totalCount: '=totalCount'
    },
    templateUrl: 'partials/_progress-bar.html',
    link: function (scope, element, attr) {
      var vm = this;

    }
  };
}

module.exports = progressBar;
