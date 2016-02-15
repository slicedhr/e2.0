'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name terminosdepago.directive:terminosdepagoForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="terminosdepago">
       <file name="index.html">
        <terminosdepago-form></terminosdepago-form>
       </file>
     </example>
   *
   */
  angular.module('terminosdepago').directive('terminosdepagoForm', terminosdepagoForm);

  function terminosdepagoForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'terminosdepago/terminosdepago-form-directive.tpl.html',
      replace: false,
      controllerAs: 'terminosdepagoForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.terminosdepago.info.source;

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
//# sourceMappingURL=terminosdepago-form-directive.js.map
