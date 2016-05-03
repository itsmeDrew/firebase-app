'use strict';

var app = angular.module('App.Service.Sets', []);

app.service('sets', SetsCtrl);

function SetsCtrl ($firebaseObject, config) {
  var vm = this;
  var setsRef = new Firebase(config.setsDataURL);

  vm.addNewCard = addNewCard;
  vm.addNewSet = addNewSet;
  vm.getSets = getSets;
  vm.getSetBySlug = getSetBySlug;

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
    var ref = new Firebase(config.setsDataURL + '/' + set.id + '/cards');
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

};

module.exports = SetsCtrl;
