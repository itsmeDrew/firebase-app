'use strict';

var app = angular.module('App.Controller.Category', []);

app.controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl ($stateParams, $firebaseArray, $state, $scope, sets) {
  var vm = this;

  vm.slickConfig = {
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
