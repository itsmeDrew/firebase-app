'use strict'; module.exports = angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("partials/_footer.html","<footer>\n  <h2>footer here!</h2>\n</footer>\n");
$templateCache.put("partials/_header.html","<header class=\"header\" ng-class=\"{\'menu-active\': header.menuOpen}\">\n  <logo class=\"header__logo\"></logo>\n  <div class=\"nav\" ui-view=\"nav\"></div>\n  <nav-profile class=\"header__profile-menu\"\n    ng-if=\"user\" ng-click=\"header.toggleProfile\" ng-class=\"{\'profile-is-open\': header.profileOpen}\">\n    <!-- partials/nav/_profile.html -->\n  </nav-profile>\n</header>\n");
$templateCache.put("partials/_logo.html","<img class=\"site-logo\" src=\"http://www.placehold.it/500x400\" alt=\"logo\">\n");
$templateCache.put("partials/_nav.html","<nav-main>\n  <!-- partials/nav/_nav-main.html -->\n</nav-main>\n<hamburger>\n  <!-- partials/nav/_hamburger.html -->\n</hamburger>\n");
$templateCache.put("templates/category.tpl.html","<section class=\"set-cards\" ng-if=\"sets\">\n  <h2>Sets Available</h2>\n  <slick infinite=true slides-to-show=4 slides-to-scroll=4 settings=\"cat.slickConfig\" arrows=false>\n    <div class=\"set-card\" ng-repeat=\"set in sets\">\n      <div class=\"set-card__content\">\n        <div class=\"set-card__header\" ng-init=\"cat.getSet(set.slug)\">\n          <strong>{{ set.name }}</strong>\n            <div ng-repeat=\"userCard in cat.userSets\" ng-if=\"userCard.$id === set.slug\">\n              <div class=\"bar\">\n                <div\n                class=\"bar-progress\"\n                style=\"width:{{ Math.round( cat.countCards(userCard.cards)) / set.numberofcards * 100 }}%\"\n                ></div>\n              </div>\n              <small>{{ cat.countCards(userCard.cards) }} / {{ set.numberofcards }}</small>\n            </div>\n        </div>\n        <a class=\"set-card__btn btn-solid--primary\" ui-sref=\"app.set({ setSlug: set.slug, setId: set.id })\">go to set</a>\n      </div>\n    </div>\n  </slick>\n</section>\n\n<!-- USER LOGGED IN -->\n");
$templateCache.put("templates/dashboard.tpl.html","<section class=\"submit-card\">\n  <!-- <h2>SUBMIT A CARD</h2> -->\n  <div class=\"step\">\n    <select ng-options=\"set as set.name for set in sets\" ng-model=\"card.set\"></select>\n  </div>\n  <div class=\"step\" ng-show=\"card.set\">\n    <input type=\"text\" placeholder=\"card number\" ng-model=\"card.pokemon.cardnumber\" ng-change=\"dashboard.checkIfCardExists(card.pokemon.cardnumber, card.set)\" ng-class=\"{ error: dashboard.cardExists }\">\n    <input type=\"text\" placeholder=\"pokemon name\" ng-model=\"card.pokemon.name\">\n    <select ng-model=\"card.pokemon.rarity\">\n      <option value=\"rare-holo-ex\">rare-holo-ex</option>\n      <option value=\"rare-ultra\">rare-ultra</option>\n      <option value=\"rare-holo\">rare-holo</option>\n      <option value=\"rare\">rare</option>\n      <option value=\"uncommon\">uncommon</option>\n      <option value=\"common\">common</option>\n    </select>\n    <select ng-model=\"card.pokemon.type.one\" ng-options=\"dashboard.cardTypes.value as type.name for type in dashboard.cardTypes\">\n    </select>\n    <label ng-if=\"card.pokemon.rarity === \'rare-holo-ex\'\">\n      MEGA\n      <input ng-model=\"card.pokemon.mega\" type=\"checkbox\">\n    </label>\n    <select ng-model=\"card.pokemon.type.two\" ng-if=\"card.pokemon.rarity !== \'rare-holo-ex\'\" ng-options=\"dashboard.cardTypes.value as type.name for type in dashboard.cardTypes\">\n    </select>\n  </div>\n  <a class=\"btn\" ng-if=\"!dashboard.cardExists\"\n      ng-click=\"dashboard.addNewCard(\n        card.pokemon.name,\n        card.pokemon.cardnumber,\n        card.set,\n        card.pokemon.rarity,\n        card.pokemon.type.one,\n        card.pokemon.type.two,\n        card.pokemon.mega\n      )\">\n  submit</a>\n  <strong ng-if=\"dashboard.cardSubmitted\">success</strong>\n</section>\n<section class=\"submit-sets\">\n  <div class=\"edit-sets\">\n    <ul class=\"set-list\">\n      <li class=\"set-list__listing\" ng-repeat=\"set in sets\">\n        {{set.name}}\n        <a ng-click=\"editName = ! editName\">edit</a>\n        <div class=\"edit\" ng-show=\"editName\">\n          <form ng-submit=\"dashboard.submit(name, set); editName = ! editName\">\n            <input ng-model=\"name\" placeholder=\"new set name\" type=\"text\">\n            <input type=\"submit\" id=\"submit\" value=\"Submit\" />\n          </form>\n          <a confirmed-click=\"dashboard.removeSet(set);\" ng-confirm-click=\"Are You Sure? This cannot be undone.\">remove set</a>\n        </div>\n      </li>\n    </ul>\n  </div>\n  <div class=\"add-sets\">\n    <a class=\"btn-solid--primary\" ng-click=\"addNewSet = ! addNewSet\">add set</a>\n    <form ng-submit=\"dashboard.addSet(newSet.name, newSet.cards, newSet.date); addNewSet = ! addNewSet\" ng-show=\"addNewSet\">\n      <input ng-model=\"newSet.name\" placeholder=\"set name\" type=\"text\">\n      <input ng-model=\"newSet.cards\" placeholder=\"card number\" type=\"text\">\n      <input ng-model=\"newSet.date\" placeholder=\"release date\" type=\"text\">\n      <input type=\"submit\" id=\"submit\" value=\"Submit\" />\n    </form>\n  </div>\n</section>\n");
$templateCache.put("templates/home.tpl.html","<div class=\"login__content\" ng-if=\"!user\">\n  <img class=\"login__logo\" src=\"assets/img/logo.png\" alt=\"pokemonlist logo\">\n  <h2 class=\"login__heading\">A simple online checklist.</h2>\n  <h2 class=\"login__heading\">Always free.</h2>\n  <a class=\"login__btn btn-solid--primary\" ng-click=\"app.login()\">login with facebook</a>\n  <img class=\"login__character hidden--md\" src=\"assets/img/charmander.png\" />\n</div>\n");
$templateCache.put("templates/set.tpl.html","<h4>Setname: {{set.currentSet.name}}</h4>\n\n<div ng-if=\"set.currentSet.name\">\n  <h4>cards available</h4>\n\n\n  <ul>\n    <li ng-repeat=\"card in set.currentSet.cards\" style=\"margin: 10px 0;\">\n      {{card.cardnumber}} {{card.name}}\n      <div ng-if=\"user\">\n        <!-- IF USER DOES NOT HAVE CARD -->\n        <button ng-show=\"!card.hasCard && user\" ng-click=\"set.setsService.addCardToUser(set.currentSet, user, card)\">Add Card</button>\n      </div>\n\n      <!-- IF USER HAS CARD -->\n      <div\n        ng-repeat=\"userCard in set.userCards\"\n        ng-if=\"card.cardnumber === userCard.cardnumber\"\n        ng-init=\"userCard.qty >= 1 ? card.hasCard = true : card.hasCard = false\"\n      >\n          <input class=\"\" placeholder=\"{{ userCard.qty }}\" type=\"text\" ng-model=\"updatedQty\" ng-keypress=\"set.updateQty($event, set.currentSet, user, userCard, updatedQty)\">\n          <button ng-click=\"set.setsService.removeUserCard(set.currentSet, user, userCard); userCard.qty >= 1 ? card.hasCard = true : card.hasCard = false\">-</button>\n          <button ng-click=\"set.setsService.addCardToUser(set.currentSet, user, card, userCard); userCard.qty >= 1 ? card.hasCard = true : card.hasCard = false\">+</button>\n      </div>\n      <!-- END IF -->\n\n    </li>\n  </ul>\n</div>\n<div ng-if=\"!set.currentSet.name\">\n  <h2>click a set to continue!</h2>\n</div>\n\n<!-- USER LOGGED IN -->\n");
$templateCache.put("partials/nav/_hamburger.html","<div class=\"menu\">\n  <a class=\"site-nav__hamburger\" ng-click=\"header.toggleNav()\"><span></span></a>\n</div>\n");
$templateCache.put("partials/nav/_nav-main.html","<nav class=\"site-nav__nav\">\n  <a class=\"site-nav__link\" ui-sref=\".category()\" ui-sref-active=\"active\">View Sets</a>\n  <a class=\"site-nav__link\" ui-sref=\".dashboard()\" ui-sref-active=\"active\" ng-if=\"user.role === 99\">Dashboard</a>\n</nav>\n");
$templateCache.put("partials/nav/_profile.html","<div class=\"profile-menu\">\n  <div class=\"profile-menu__dropdown-menu\">\n    <div class=\"profile-menu__dropdown-content\">\n      <span class=\"profile-menu__display-name\">{{ user.displayName }}</span>\n      <button class=\"profile-menu__btn btn-solid--primary\" ng-show=\"user\" ng-click=\"app.logout()\">logout</button>\n    </div>\n  </div>\n  <div class=\"profile-menu__img--wrapper\" ng-click=\"header.toggleProfile();\">\n    <user-profile-pic class=\"profile-menu__img\"></user-profile-pic>\n  </div>\n</div>\n");
$templateCache.put("partials/user/_profile-pic.html","<img class=\"user__profile-pic\" src=\"{{ user.profileImageURL }}\" alt=\"logo\">\n");}]);