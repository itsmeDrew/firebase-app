'use strict';

var app = angular.module('App.Controller.Category', []);

app.controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl ($stateParams, $firebaseArray, $state, $scope, sets) {
  var vm = this;
  var user = $scope.$parent.user;
  var _userSetsRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/');

  $scope.Math=Math;

  vm.setSlug = $stateParams.setSlug;
  vm.setId = $stateParams.setId;
  vm.userSets = $firebaseArray(_userSetsRef);
  vm.countCards = countCards;
  vm.getPercent = getPercent;

  function countCards(cardsObj) {
    return Object.keys(cardsObj).length;
  }

  function getPercent(valOne, valTwo) {
    console.log(valOne / valTwo);
    return Math.round(valOne / valTwo);
  }

  vm.slickConfig = {
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }
};

module.exports = CategoryCtrl;
