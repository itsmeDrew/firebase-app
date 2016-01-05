'use strict';

var app = angular.module('App.Service.Sets', []);

app.service('sets', SetsCtrl);

function SetsCtrl () {
  var vm = this;

  vm.setCardData = setCardData;
  vm.genCardData = genCardData;

  function setCardData(ref) {
    var _setsRef = ref.child('setsAvailable');

    _setsRef.set({});

    genSetData('150', 'flashfire', '2015', _setsRef);
    genSetData('200', 'legendary treasures', '2013', _setsRef);
    genSetData('98', 'roaring skies', '2014', _setsRef);
    genSetData('146', 'furious fists', '2014', _setsRef);
    genSetData('99', 'plasma blast', '2012', _setsRef);
    genSetData('99', 'breakthrough', '2015', _setsRef);
  }

  function genSlug(data) {
    return data
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'')
      ;
  }

  function genSetData(numberofcards, name, releaseDate, ref) {
    var _newSetRef = ref.push();

    _newSetRef.set({
      name: name,
      id: _newSetRef.key(),
      numberofcards: numberofcards,
      slug: genSlug(name),
      releasedate: releaseDate,
      cards: {
        '01': {
          name: 'charizard',
          cardnumber: '01',
          slug: genSlug('charizard')
        }
      }
    });
  }

  function genCardData(id, cardnumber, name) {
    var ref = new Firebase('https://mypokemonclub.firebaseio.com/setsAvailable/' + id);
    var _newCardRef = ref.push();

    console.log('setting card');

    _newCardRef.set({
      cardnumber: cardnumber,
      name: name,
      id: _newCardRef.key()
    })
  }

};

module.exports = SetsCtrl;
