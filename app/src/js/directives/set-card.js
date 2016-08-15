'use strict';

var app = angular.module('App.Directive.SetCard', []);

app.directive('setCard', setCard);

function setCard($stateParams, $firebaseArray) {
  return {
    restrict: 'E',
    templateUrl: 'partials/_set-card.html',
    controller: function($scope, $stateParams, $state) {
      var vm = this;
      var user = $scope.$parent.user;
      var _userSetsRef = new Firebase(usersDataURL + '/' + user.uid + '/sets/');

      vm.userSets = $firebaseArray(_userSetsRef);
      vm.countCards = countCards;
      vm.getPercent = getPercent;
      $scope.Math = Math;

      function countCards(cardsObj) {
        return Object.keys(cardsObj).length;
      }

      function getPercent(valOne, valTwo) {
        return Math.round(valOne / valTwo);
      }
    },
    controllerAs: 'setCard'
  };
}

module.exports = setCard;
