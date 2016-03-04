'use strict';

var app = angular.module('App.Controller.Sets', []);

app.controller('SetsCtrl', SetsCtrl);

function SetsCtrl ($stateParams, $state, $scope, $firebaseObject, $firebaseArray) {
  var vm = this;
  var ref = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/');
  var _user = $scope.$parent.user ;

  ref.orderByChild("slug").equalTo($stateParams.setSlug).on("value", function(snapshot) {
    for (var key in snapshot.val()) {
      if (snapshot.val().hasOwnProperty(key)) {
        vm.currentSet = snapshot.val()[key];
        vm.addCardToUser = addCardToUser;
        vm.removeUserCard = removeUserCard;
        vm.updateQty = updateQty;

        var _userSDF = 'https://mypokemonclub.firebaseio.com/users/facebook:' + _user.id;

        console.log(_user);

        var userSetsRef = new Firebase('https://mypokemonclub.firebaseio.com/users/facebook:' + _user.id + '/sets/' + vm.currentSet.slug + '/cards/' );

        vm.userCards = $firebaseArray(userSetsRef);

        function addCardToUser(newCard, userCard) {
          if (userCard) {
            var _userCardRef = new Firebase('https://mypokemonclub.firebaseio.com/users/facebook:' + _user.id + '/sets/' + vm.currentSet.slug + '/cards/' + userCard.id);

            _userCardRef.update({
              qty: userCard.qty + 1
            });
          } else {
            var _newCardRef = userSetsRef.push();

            _newCardRef.set({
              cardnumber: newCard.cardnumber,
              name: newCard.name,
              slug: newCard.slug,
              qty: 1,
              id: _newCardRef.key()
            });
            console.log('added new card', newCard);
          }
        }

        function removeUserCard(userCard) {
          var _userCardRef = new Firebase('https://mypokemonclub.firebaseio.com/users/facebook:' + _user.id + '/sets/' + vm.currentSet.slug + '/cards/' + userCard.id);

          _userCardRef.update({
            qty: userCard.qty - 1
          });

          if (userCard.qty < 1) {
            _userCardRef.remove();
          }

        }

        function updateQty(newQty) {
          if (e.keyCode == 13) {
            console.log('updating to ', newQty);
          }

        }

        break;
      }
    }
  });

};

module.exports = SetsCtrl;
