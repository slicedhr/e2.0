'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name mediosdepago.directive:mediosdepagoForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="mediosdepago">
       <file name="index.html">
        <mediosdepago-form></mediosdepago-form>
       </file>
     </example>
   *
   */
  angular.module('mediosdepago').directive('mediosdepagoForm', mediosdepagoForm);

  function mediosdepagoForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'mediosdepago/mediosdepago-form-directive.tpl.html',
      replace: false,
      controllerAs: 'mediosdepagoForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.mediosdepago.info.source;

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
//# sourceMappingURL=mediosdepago-form-directive.js.map
