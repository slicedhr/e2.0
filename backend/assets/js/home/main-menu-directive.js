'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:mainMenu
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <main-menu></main-menu>
       </file>
     </example>
   *
   */
  angular.module('home').directive('mainMenu', mainMenu);

  function mainMenu() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'home/main-menu-directive.tpl.html',
      replace: false,
      controllerAs: 'mainMenu',
      controller: function controller() {
        var vm = this;
        vm.name = 'mainMenu';
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=main-menu-directive.js.map
