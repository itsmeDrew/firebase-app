'use strict';

var app = angular.module('App.Controller.Sets', []);

app.controller('SetsCtrl', SetsCtrl);

function SetsCtrl ($stateParams, $scope, $firebaseArray, config, sets) {
  var vm = this;
  var usersDataURL = config.usersDataURL;
  var setsRef = new Firebase(config.setsDataURL);
  var user = $scope.$parent.user ;

  sets.getSetBySlug($stateParams.setSlug, function(setData) {
    var _currentSet = setData;
    var _userSetsRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + _currentSet.slug + '/cards/' );

    vm.currentSet = _currentSet;
    vm.addCardToUser = addCardToUser;
    vm.removeUserCard = removeUserCard;
    vm.updateQty = updateQty;
    vm.userCards = $firebaseArray(_userSetsRef);

    function addCardToUser(newCard, userCard) {
      if (userCard) {
        var _userCardRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + vm.currentSet.slug + '/cards/' + userCard.id);

        _userCardRef.update({
          qty: userCard.qty + 1
        });
      } else {
        var _newCardRef = _userSetsRef.push();

        _newCardRef.set({
          cardnumber: newCard.cardnumber,
          name: newCard.name,
          slug: newCard.slug,
          qty: 1,
          id: _newCardRef.key()
        });
      }
    }

    function removeUserCard(userCard) {
      var _userCard = userCard;
      var _userCardRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + vm.currentSet.slug + '/cards/' + _userCard.id);

      _userCardRef.update({
        qty: _userCard.qty - 1
      });

      if (_userCard.qty < 1) {
        _userCardRef.remove();
      }

    }

    function updateQty(newQty) {
      if (e.keyCode == 13) {
        console.log('updating to ', newQty);
      }
    }
  });

};

module.exports = SetsCtrl;
