'use strict';

var app = angular.module('App.Directive.Progress.Radial', []);

app.directive('radialProgress', radialProgress);

function radialProgress($rootScope) {
  return {
    restrict: 'E',
    scope: {
      progress: '=progress'
    },
    template: '<div class="radial-progress progress-{{ progress }}"></div>',
    link: function (scope, element, attr) {
      var vm = this;

    }
  };
}

module.exports = radialProgress;
