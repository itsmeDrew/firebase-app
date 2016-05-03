'use strict';

var app = angular.module('App.Service.Sets', []);

app.service('sets', SetsCtrl);

function SetsCtrl ($firebaseObject, config) {
  var vm = this;
  var setsDataURL = config.setsDataURL;
  var usersDataURL = config.usersDataURL;
  var setsRef = new Firebase(setsDataURL);

  vm.updated = false;
  vm.addNewCard = addNewCard;
  vm.addNewSet = addNewSet;
  vm.getSets = getSets;
  vm.getSetBySlug = getSetBySlug;
  vm.addCardToUser = addCardToUser;
  vm.removeUserCard = removeUserCard;
  vm.updateQty = updateQty;

  function addNewSet(name, numberofcards, releaseDate) {
    var _newSetRef = setsRef.push();

    _newSetRef.set({
      name: name,
      id: _newSetRef.key(),
      numberofcards: numberofcards,
      slug: genSlug(name),
      releasedate: releaseDate
    });
  }

  function genSlug(data) {
    return data
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'')
      ;
  }

  function getSets() {
    var cardSets = $firebaseObject(setsRef);

    return cardSets;
  }

  function addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega, callback) {
    var ref = new Firebase(setsDataURL + '/' + set.id + '/cards');
    var _newCardRef = ref.push();

    _newCardRef.set({
      name: name,
      cardnumber: cardnumber,
      id: _newCardRef.key(),
      slug: genSlug(name),
      rarity: rarity,
      mega: mega ||  false,
      typeOne: typeOne || null,
      typeTwo: typeTwo || null
    }, callback());
  }

  function getSetBySlug(slug, callback) {
    setsRef.orderByChild("slug").equalTo(slug).on("value", function(snapshot) {
      for (var key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          callback(snapshot.val()[key]);
        }
      }
    });
  }

  function addCardToUser(set, user, newCard, userCard) {
    if (userCard) {
      var _userCardRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + set.slug + '/cards/' + userCard.id);

      _userCardRef.update({
        qty: userCard.qty + 1
      });
    } else {
      var _userSetsRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + set.slug + '/cards/');
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

  function removeUserCard(set, user, userCard) {
    var _userCard = userCard;
    var _userCardRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + set.slug + '/cards/' + _userCard.id);

    _userCardRef.update({
      qty: _userCard.qty - 1
    });

    if (_userCard.qty < 1) {
      _userCardRef.remove();
    }
  }

  function updateQty(e, set, user, card, newQty, callback) {
    var _userCardRef = new Firebase(usersDataURL + '/facebook:' + user.id + '/sets/' + set.slug + '/cards/' + card.id);
    vm.updated = false;

    if (e.keyCode == 13) {
      _userCardRef.update({
        qty: parseInt(newQty)
      }, callback());
    }
  }
};

module.exports = SetsCtrl;
