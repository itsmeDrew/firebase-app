'use strict';

var app = angular.module('App.Controller.Dashboard', []);

app.controller('DashboardCtrl', DashboardCtrl);

function DashboardCtrl ($stateParams, $state, $scope, sets) {
  var vm = this;

  vm.addNewCard = addNewCard;
  vm.checkIfCardExists = checkIfCardExists;
  vm.cardTypes = [{name: 'standard set', value: 'standard-set'}, {name: 'standard set foil', value: 'standard-set-foil'}, {name: 'parallel set', value: 'parallel-set'} ];

  console.log('Dashboard CTRL here');

  function addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega) {
    sets.addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega);
    $scope.card = {};
    vm.cardExists = false;
  }

  function checkIfCardExists(cardnumber, set) {
    var ref = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/' + set.id + '/cards' );

    ref.orderByChild("cardnumber").equalTo(cardnumber).on("value", function(snapshot) {
      if(snapshot.val()) {
        vm.cardExists = true;
      } else {
        vm.cardExists = false;
      }
    });
  }

};

module.exports = DashboardCtrl;
