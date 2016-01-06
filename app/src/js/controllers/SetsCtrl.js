'use strict';

var app = angular.module('App.Controller.Sets', []);

app.controller('SetsCtrl', SetsCtrl);

function SetsCtrl ($stateParams, $state, $scope, $firebaseObject, $firebaseArray, sets) {
  var vm = this;
  var ref = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/');
  var _user = $scope.$parent.user ;

  ref.orderByChild("slug").equalTo($stateParams.setSlug).on("value", function(snapshot) {
    for (var key in snapshot.val()) {
      if (snapshot.val().hasOwnProperty(key)) {
        vm.currentSet = snapshot.val()[key];
        vm.addCardToUser = addCardToUser;

        var userSetsRef = new Firebase('https://mypokemonclub.firebaseio.com/users/facebook:' + _user.id + '/sets/' + vm.currentSet.slug + '/cards/' );

        vm.userCards = $firebaseObject(userSetsRef);

        function addCardToUser(newCard) {
          userSetsRef.push({
            cardnumber: newCard.cardnumber,
            name: newCard.name,
            slug: newCard.slug
          });
        }

        break;
      }
    }
  });

};

module.exports = SetsCtrl;
