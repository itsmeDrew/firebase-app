'use strict';

var app = angular.module('App.Directive.ngConfirmClick', []);

app.directive('ngConfirmClick', ngConfirmClick);

function ngConfirmClick($rootScope) {
  return {
    link: function (scope, element, attr) {
      var msg = attr.ngConfirmClick || "Are you sure?";
      var clickAction = attr.confirmedClick;
      element.bind('click',function (event) {
        if ( window.confirm(msg) ) {
          scope.$eval(clickAction)
        }
      });
    }
  };
}

module.exports = ngConfirmClick;
