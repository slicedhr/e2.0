'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:defaultFooter
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <default-footer></default-footer>
       </file>
     </example>
   *
   */
  angular.module('enterprise').directive('defaultFooter', defaultFooter);

  function defaultFooter() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'partials/default-footer-directive.tpl.html',
      replace: false,
      controllerAs: 'defaultFooter',
      controller: function controller() {

        this.currentYear = new Date().getFullYear();
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=default-footer-directive.js.map
