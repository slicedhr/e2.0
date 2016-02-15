'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name home.filter:slug
   *
   * @description
   *
   * @param {Array} input The array to filter
   * @returns {Array} The filtered array
   *
   */
  angular.module('home').filter('slug', slug);

  function slug() {
    return function (input) {

      return input.replace(' ', '-');
    };
  }
})();
//# sourceMappingURL=slug-filter.js.map
