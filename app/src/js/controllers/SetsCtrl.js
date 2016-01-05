'use strict';

var app = angular.module('App.Controller.Sets', []);

app.controller('SetsCtrl', SetsCtrl);

function SetsCtrl ($stateParams, $state, $scope, $firebaseObject, sets) {
  var vm = this;
  var ref = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/');
  var _user = $scope.$parent.user ;

  ref.orderByChild("slug").equalTo($stateParams.setSlug).on("value", function(snapshot) {
    for (var key in snapshot.val()) {
      if (snapshot.val().hasOwnProperty(key)) {
        vm.currentSet = snapshot.val()[key];
        vm.saveUserCard = saveUserCard;


        var userSetsRef = new Firebase('https://mypokemonclub.firebaseio.com/users/facebook:' + _user.id + '/sets/' + vm.currentSet.slug + '/cards/' );


        function cardExistsCallback(card, exists) {
          if (exists) {
            //remove the card
            return true;
          } else {
            addCardToUser(card);
          }
        }

        function checkIfCardExists(card) {
          userSetsRef.orderByChild("cardnumber").equalTo(card.cardnumber).once("value", function(snapshot) {
            var _cardExists = snapshot.val() !== null;

            cardExistsCallback(card, _cardExists)
          });
        }

        function saveUserCard(card) {
          checkIfCardExists(card);
        }

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
