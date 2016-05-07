'use strict';

var app = angular.module('App.Directive.Nav.Profile', []);

app.directive('navProfile', navProfile);

function navProfile() {
  return {
    restrict: 'E',
    templateUrl: 'partials/nav/_profile.html',
    controller: ['$scope', function ($scope) {
      var vm = this;
      vm.toggleProfile = toggleProfile;

      function toggleProfile() {
        $scope.$emit('profile.toggle');
      }
    }],
    controllerAs: 'profile'
  }

}

module.exports = navProfile;
