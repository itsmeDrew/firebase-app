'use strict';

var app = angular.module('App.Directive.CategorySet', []);

app.directive('categorySet', categorySet);

function categorySet($stateParams, $firebaseArray) {
  return {
    restrict: 'E',
    templateUrl: 'partials/_category-set.html',
    controller: function($scope, $stateParams, $state) {
      var vm = this;
      var user = $scope.$parent.user;
      var _userSetsRef = new Firebase(usersDataURL + '/' + user.uid + '/sets/');

      vm.userSets = $firebaseArray(_userSetsRef);
      vm.countCards = countCards;
      vm.getPercent = getPercent;
      vm.recentSetAdded = recentSetAdded;
      $scope.Math = Math;
      $scope.Date = new Date();

      function recentSetAdded(dateAdded) {
        var _date1 = new Date(dateAdded);
        var _calcDifference = Math.abs(_date1.getTime() - $scope.Date.getTime());
        var _howManyDays = _calcDifference / (1000 * 60 * 60 * 24);

        if (_calcDifference && _howManyDays.toFixed() < 30) {
          return true;
        } else {
          return false;
        }
      };

      function countCards(cardsObj) {
        return Object.keys(cardsObj).length;
      }

      function getPercent(valOne, valTwo) {
        return Math.round(valOne / valTwo);
      }
    },
    controllerAs: 'categorySet'
  };
}

module.exports = categorySet;
