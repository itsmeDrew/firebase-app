'use strict';

var app = angular.module('App.Service.Sets', []);

app.service('sets', SetsCtrl);

function SetsCtrl ($firebaseArray, config) {
  var vm = this;
  var setsDataURL = config.setsDataURL;
  var usersDataURL = config.usersDataURL;
  var setsRef = new Firebase(setsDataURL);

  vm.updated = false;

  vm.addNewSet = function (name, numberofcards, releaseDate) {
    var _newSetRef = setsRef.push();
    var _todaysDate = Date();

    _newSetRef.set({
      name: name,
      id: _newSetRef.key(),
      numberofcards: numberofcards,
      slug: vm.genSlug(name),
      releasedate: releaseDate,
      dateadded: _todaysDate
    });
  }

  vm.removeSet = function (set) {
    var _ref = new Firebase(setsRef + '/' + set.id );

    _ref.remove();
  }

  vm.updateSetName = function (set, newName) {
    var _ref = new Firebase(setsRef + '/' + set.id );

    _ref.update({ name: newName });
  }

  vm.genSlug = function (data) {
    return data
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'')
      ;
  }

  vm.getSets = function () {
    var cardSets = $firebaseArray(setsRef);

    return cardSets;
  }

  vm.checkIfCardExists = function (cardnumber, set, callback) {
    var _ref = new Firebase(setsRef + '/' + set.id + '/cards' );

    _ref.orderByChild("cardnumber").equalTo(cardnumber).on("value", function(snapshot) {
      callback(snapshot);
    });
  }

  vm.addNewCard = function (name, cardnumber, set, rarity, typeOne, typeTwo, mega, callback) {
    var ref = new Firebase(setsDataURL + '/' + set.id + '/cards');
    var _newCardRef = ref.push();

    _newCardRef.set({
      name: name,
      cardnumber: cardnumber,
      id: _newCardRef.key(),
      slug: vm.genSlug(name),
      rarity: rarity,
      mega: mega ||  false,
    }, function () {
      if (typeOne) {
        vm.addVariantCard(set.id, _newCardRef.key(), typeOne);
      }

      if (typeTwo) {
        vm.addVariantCard(set.id, _newCardRef.key(), typeTwo);
      }

      callback();
    });

  }

  vm.addVariantCard = function (setId, cardId, variant) {
    var _cardRef = new Firebase(setsDataURL + '/' + setId + '/cards/' + cardId + '/variants').push();

    _cardRef.set({
      name: variant
    });
  }

  vm.getSetBySlug = function (slug, callback) {
    setsRef.orderByChild("slug").equalTo(slug).on("value", function(snapshot) {
      for (var key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          callback(snapshot.val()[key]);
        }
      }
    });
  }

  vm.addCardToUser = function (set, user, newCard, userCard) {
    if (userCard) {
      var _userCardRef = new Firebase(usersDataURL + '/' + user.uid + '/sets/' + set.id + '/cards/' + newCard.id);

      _userCardRef.update({
        qty: userCard.qty + 1
      });
    } else {
      var _userSetsRef = new Firebase(usersDataURL + '/' + user.uid + '/sets/' + set.id + '/cards/' + newCard.id);

      _userSetsRef.set({
        cardnumber: newCard.cardnumber,
        name: newCard.name,
        slug: newCard.slug,
        qty: 1,
        id: newCard.id
      });
    }
  }

  vm.removeUserCard = function (set, user, userCard) {
    var _userCard = userCard;
    var _userCardRef = new Firebase(usersDataURL + '/' + user.uid + '/sets/' + set.id + '/cards/' + _userCard.id);

    _userCardRef.update({
      qty: _userCard.qty - 1
    });

    if (_userCard.qty < 1) {
      _userCardRef.remove();
    }
  }

  vm.updateQty = function (e, set, user, card, newQty, callback) {
    var _userCardRef = new Firebase(usersDataURL + '/' + user.uid + '/sets/' + set.id + '/cards/' + card.id);
    vm.updated = false;

    if (e.keyCode == 13) {
      _userCardRef.update({
        qty: parseInt(newQty)
      }, callback());
    }
  }
};

module.exports = SetsCtrl;
