'use strict';

var app = angular.module('App.Controller.Dashboard', []);

app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl ($stateParams, $state, $scope, sets, config) {
  var vm = this;
  var setsDataURL = config.setsDataURL;

  vm.cardSubmitted = false;
  vm.addNewCard = addNewCard;
  vm.checkIfCardExists = checkIfCardExists;
  vm.cardTypes = [
    {name: 'standard set', value: 'standard-set'},
    {name: 'standard set foil', value: 'standard-set-foil'},
    {name: 'parallel set', value: 'parallel-set'}
  ];
  vm.updateSetName = updateSetName;
  vm.addSet = addSet;
  vm.removeSet = removeSet;

  function addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega) {
    sets.addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega, function() {
      vm.cardSubmitted = true;
    });

    $scope.card = {};
    vm.cardExists = false;
  }

  function checkIfCardExists(cardnumber, set) {
    sets.checkIfCardExists(cardnumber, set, function(snapshot) {
      if (snapshot.val()) {
        vm.cardExists = true;
      } else {
        vm.cardExists = false;
      }
    });
  }

  function updateSetName(set, newName) {
    sets.updateSetName(set, newName);
  }

  function addSet(name, cards, date) {
    sets.addNewSet(name, cards, date);
    $scope.newSet = '';
  }

  function removeSet(set) {
    sets.removeSet(set);
  }

};

module.exports = DashboardCtrl;
