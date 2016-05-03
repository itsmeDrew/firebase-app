'use strict';

var app = angular.module('App.Controller.Dashboard', []);

app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl ($stateParams, $state, $scope, sets, config) {
  var vm = this;

  vm.addNewCard = addNewCard;
  vm.checkIfCardExists = checkIfCardExists;
  vm.cardTypes = [{name: 'standard set', value: 'standard-set'}, {name: 'standard set foil', value: 'standard-set-foil'}, {name: 'parallel set', value: 'parallel-set'} ];
  vm.submit = submit;
  vm.addSet = addSet;
  vm.removeSet = removeSet;

  function addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega) {
    sets.addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega, onComplete);
    $scope.card = {};
    vm.cardExists = false;

    function onComplete() {
      vm.cardSubmitted = true;
    }
  }

  function checkIfCardExists(cardnumber, set) {
    var ref = new Firebase(config.baseDataURL + '/setsAvailable/' + set.id + '/cards' );

    ref.orderByChild("cardnumber").equalTo(cardnumber).on("value", function(snapshot) {
      if(snapshot.val()) {
        vm.cardExists = true;
      } else {
        vm.cardExists = false;
      }
    });
  }

  function submit(newName, set) {
    var ref = new Firebase(config.baseDataURL + '/setsAvailable/' + set.id );

    ref.update({ name: newName });
  }

  function addSet(name, cards, date) {
    sets.addNewSet(name, cards, date);
    $scope.newSet = '';
  }

  function removeSet(set) {
    var ref = new Firebase(config.baseDataURL + '/setsAvailable/' + set.id );

    ref.remove();
  }

};

module.exports = DashboardCtrl;
