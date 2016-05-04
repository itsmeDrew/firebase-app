'use strict';

var app = angular.module('App.Controller.Nav', []);

app.controller('NavCtrl', NavCtrl);

function NavCtrl ($rootScope, $scope) {
  var vm = this;

  vm.closeNav = closeNav;
  vm.toggleNav = toggleNav;

  $rootScope.$on("$stateChangeSuccess", function() {
    closeNav();
  })

  function closeNav() {
    if ($scope.$parent && $scope.$parent.$parent.app.menuOpen) {
      vm.toggleNav();
    }
  }

  function toggleNav() {
    $scope.$emit('nav.toggle');
  }
};

module.exports = NavCtrl;
