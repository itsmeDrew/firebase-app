'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
    .module('App.Service.Sets', ['firebase'])
    .service('Sets', SetController);

    function SetController() {
      var vm = this;

      vm.setCardData = setCardData;

      function setCardData(ref) {
        var _setRef = ref.child('setsAvailable');

        _setRef.set({});

        genData('150', 'flashfire', '2015', _setRef);
        genData('200', 'legendary treasures', '2013', _setRef);
        genData('98', 'roaring skies', '2014', _setRef);
        genData('146', 'furious fists', '2014', _setRef);
      }

      function genSlug(data) {
        return data
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
      }

      function genData(cardNumber, name, releaseDate, ref) {
        ref.push({
          name: name,
          cardnumber: cardNumber,
          slug: genSlug(name),
          releasedate: releaseDate
        });
      }

    }

  }
);
