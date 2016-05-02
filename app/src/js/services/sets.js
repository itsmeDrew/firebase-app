'use strict';

var app = angular.module('App.Service.Sets', []);

app.service('sets', SetsCtrl);

function SetsCtrl ($firebaseObject) {
  var vm = this;

  vm.addNewCard = addNewCard;
  vm.getSets = getSets;

  function genSlug(data) {
    return data
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'')
      ;
  }

  function getSets() {
    var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
    var setsURL = new Firebase(baseDataURL + 'setsAvailable/');
    var cardSets = $firebaseObject(setsURL);

    return cardSets;
  }

  function addNewCard(name, cardnumber, set, rarity, typeOne, typeTwo, mega) {
    var ref = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/' + set.id + '/cards');
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
    });
  }

};

module.exports = SetsCtrl;
