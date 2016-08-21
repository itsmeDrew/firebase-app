'use strict';

var app = angular.module('App.Controller.Category', []);

app.controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl ($stateParams, $firebaseArray, $state, $scope, sets) {
  var vm = this;

};

module.exports = CategoryCtrl;
