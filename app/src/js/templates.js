'use strict'; module.exports = angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("partials/_footer.html","<footer>\n  <h2>footer here!</h2>\n</footer>\n");
$templateCache.put("partials/_header.html","<header class=\"header\">\n  <img class=\"header-logo\" src=\"assets/img/logo.png\" alt=\"logo\">\n  <div class=\"nav\" ui-view=\"nav\"></div>\n  <div class=\"header-login\">\n    <div class=\"header-login__profile-img--wrapper\">\n      <img class=\"header-login__profile-img\" src=\"{{ user.profileImageURL }}\" alt=\"\">\n    </div>\n    <div class=\"header-login__content\">\n      <p class=\"header-login__message\" ng-show=\"user\">Welcome, {{ user.displayName }}</p>\n      <button class=\"header-login__btn btn btn-solid\" ng-show=\"user\" ng-click=\"app.logout()\">logout</button>\n    </div>\n  </div>\n</header>\n");
$templateCache.put("partials/_nav.html","<nav>\n  <ul>\n    <li>\n      <a class=\"nav-item__link\" ui-sref=\".category()\">View Sets</a>\n      <a class=\"nav-item__link\" ui-sref=\".dashboard()\">Dashboard</a>\n    </li>\n  </ul>\n</nav>\n");
$templateCache.put("templates/category.tpl.html","<section class=\"set-cards\" ng-if=\"sets\">\n  <h2>Sets Available</h2>\n  <slick infinite=true slides-to-show=4 slides-to-scroll=4 settings=\"cat.slickConfig\" arrows=false>\n    <div class=\"set-card\" ng-repeat=\"set in sets\">\n      <div class=\"set-card__content\">\n        <div class=\"set-card__header\">\n          <strong>{{ set.name }}</strong>\n        </div>\n        <a class=\"set-card__btn btn-solid--primary\" ui-sref=\"app.set({ setSlug: set.slug, setId: set.id })\">go to set</a>\n      </div>\n    </div>\n  </slick>\n</section>\n\n<!-- USER LOGGED IN -->\n");
$templateCache.put("templates/dashboard.tpl.html","<h2>SUBMIT A CARD</h2>\n\n<div class=\"step\">\n  <select ng-options=\"set as set.name for set in sets\" ng-model=\"card.set\"></select>\n</div>\n<div class=\"step\" ng-show=\"card.set\">\n  <input type=\"text\" placeholder=\"card number\" ng-model=\"card.pokemon.cardnumber\" ng-change=\"dashboard.checkIfCardExists(card.pokemon.cardnumber, card.set)\" ng-class=\"{ error: dashboard.cardExists }\">\n  <input type=\"text\" placeholder=\"pokemon name\" ng-model=\"card.pokemon.name\">\n  <select ng-model=\"card.pokemon.rarity\">\n    <option value=\"rare-holo-ex\">rare-holo-ex</option>\n    <option value=\"rare-ultra\">rare-ultra</option>\n    <option value=\"rare-holo\">rare-holo</option>\n    <option value=\"rare\">rare</option>\n    <option value=\"uncommon\">uncommon</option>\n    <option value=\"common\">common</option>\n  </select>\n  <select ng-model=\"card.pokemon.type.one\" ng-options=\"dashboard.cardTypes.value as type.name for type in dashboard.cardTypes\">\n  </select>\n  <label ng-if=\"card.pokemon.rarity === \'rare-holo-ex\'\">\n    MEGA\n    <input ng-model=\"card.pokemon.mega\" type=\"checkbox\">\n  </label>\n  <select ng-model=\"card.pokemon.type.two\" ng-if=\"card.pokemon.rarity !== \'rare-holo-ex\'\" ng-options=\"dashboard.cardTypes.value as type.name for type in dashboard.cardTypes\">\n  </select>\n</div>\n<a href=\"#\" class=\"btn\" ng-if=\"!dashboard.cardExists\"\n    ng-click=\"dashboard.addNewCard(\n      card.pokemon.name,\n      card.pokemon.cardnumber,\n      card.set,\n      card.pokemon.rarity,\n      card.pokemon.type.one,\n      card.pokemon.type.two,\n      card.pokemon.mega\n    )\">\nsubmit</a>\n");
$templateCache.put("templates/home.tpl.html","<div class=\"login__content\" ng-if=\"!user\">\n  <img class=\"login__logo\" src=\"assets/img/logo.png\" alt=\"pokemonlist logo\">\n  <h2 class=\"login__heading\">A simple online checklist.</h2>\n  <h2 class=\"login__heading\">Always free.</h2>\n  <a class=\"login__btn btn-solid--primary\" ng-click=\"app.login()\">login with facebook</a>\n  <img class=\"login__character hidden--md\" src=\"assets/img/charmander.png\" />\n</div>\n");
$templateCache.put("templates/set.tpl.html","<h4>Setname: {{set.currentSet.name}}</h4>\n\n<div ng-if=\"set.currentSet.name\">\n  <h4>cards available</h4>\n\n\n  <ul>\n    <li ng-repeat=\"card in set.currentSet.cards\" style=\"margin: 10px 0;\">\n      {{card.cardnumber}} {{card.name}}\n      <div ng-if=\"user\">\n        <!-- IF USER DOES NOT HAVE CARD -->\n        <button ng-show=\"!card.hasCard && user\" ng-click=\"set.addCardToUser(card)\">Add Card</button>\n      </div>\n\n      <!-- IF USER HAS CARD -->\n      <div\n        ng-repeat=\"userCard in set.userCards\"\n        ng-if=\"card.cardnumber === userCard.cardnumber\"\n        ng-init=\"userCard.qty >= 1 ? card.hasCard = true : card.hasCard = false\"\n      >\n          <input class=\"\" placeholder=\"{{ userCard.qty }}\" type=\"text\" ng-model=\"updatedQty\" ng-keypress=\"set.updateQty(updatedQty)\">\n          <button ng-click=\"set.removeUserCard(userCard); userCard.qty >= 1 ? card.hasCard = true : card.hasCard = false\">-</button>\n          <button ng-click=\"set.addCardToUser(card, userCard); userCard.qty >= 1 ? card.hasCard = true : card.hasCard = false\">+</button>\n      </div>\n      <!-- END IF -->\n\n    </li>\n  </ul>\n</div>\n<div ng-if=\"!set.currentSet.name\">\n  <h2>click a set to continue!</h2>\n</div>\n\n<!-- USER LOGGED IN -->\n");}]);