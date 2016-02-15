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
      scope: {
        data: '@'
      },
      templateUrl: 'arp/arp-form-directive.tpl.html',
      replace: false,
      controllerAs: 'arpForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.arp.info.source;

        this.save = function () {

          var data = self.data,
              url = self.source;

          AppService.save(data, url).then(function (success) {

            AppService.broadcastDialog(success.data);

            $rootScope.$broadcast('saved:' + self.source, success.data);
          })['catch'](function (err) {

            AppService.broadcastError(err);
          });
        };
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=arp-form-directive.js.map
