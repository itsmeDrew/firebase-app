'use strict';

var app = angular.module('App.Controller.Header', []);

app.controller('headerCtrl', headerCtrl);

function headerCtrl ($scope) {
  var vm = this;

  vm.menuOpen = false;
  vm.profileOpen = false;
  vm.closeNav = closeNav;
  vm.toggleNav = toggleNav;
  vm.toggleProfile = toggleProfile;

  function toggleNav() {
    vm.menuOpen = ! vm.menuOpen;

    if (vm.profileOpen) {
      vm.profileOpen = ! vm.profileOpen;
    }
  }

  function toggleProfile() {
    vm.profileOpen = ! vm.profileOpen;

    if (vm.menuOpen) {
      vm.menuOpen = ! vm.menuOpen;
    }
  }

  function closeNav(clickEvent) {
    var _parentClass = clickEvent.target.offsetParent.className;

    if (vm.menuOpen === true && _parentClass !== 'menu ng-scope' && _parentClass !== 'site-nav__nav ng-scope'&& _parentClass !== 'ng-scope menu-active') {
      $scope.$emit('nav.toggle');
    }
  }
};

module.exports = headerCtrl;
