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
    template: '<div class="bar"><div class="bar-progress" style="width:{{ currentCount / totalCount * 100 }}%"></div></div>',
    link: function (scope, element, attr) {
      var vm = this;

    }
  };
}

module.exports = progressBar;
