'use strict';

var app = angular.module('App.Controller.Category', []);

app.controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl ($stateParams, $state, $scope) {
  var vm = this;
  vm.setSlug = $stateParams.setSlug;
  vm.setId = $stateParams.setId;
};

module.exports = CategoryCtrl;
