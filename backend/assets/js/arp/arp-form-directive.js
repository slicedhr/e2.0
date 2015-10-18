'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name arp.directive:arpForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="arp">
       <file name="index.html">
        <arp-form></arp-form>
       </file>
     </example>
   *
   */
  angular.module('arp').directive('arpForm', arpForm);

  function arpForm() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'arp/arp-form-directive.tpl.html',
      replace: false,
      controllerAs: 'arpForm',
      controller: function controller() {
        var vm = this;
        vm.name = 'arpForm';
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=arp-form-directive.js.map
