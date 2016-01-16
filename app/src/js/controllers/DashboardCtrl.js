'use strict';

var app = angular.module('App.Controller.Dashboard', []);

app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl ($stateParams, $state, $scope, sets) {
  var vm = this;

  vm.submitCard = submitCard;

  console.log('Dashboard CTRL here');

  function submitCard(name, cardnumber, set, rarity, type) {
    sets.addNewCard(name, '01', set, rarity, type);
  }
};

module.exports = DashboardCtrl;
