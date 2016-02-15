'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name iva.directive:ivaForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="iva">
       <file name="index.html">
        <iva-form></iva-form>
       </file>
     </example>
   *
   */
  angular.module('iva').directive('ivaForm', ivaForm);

  function ivaForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'iva/iva-form-directive.tpl.html',
      replace: false,
      controllerAs: 'ivaForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.iva.info.source;

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
//# sourceMappingURL=iva-form-directive.js.map
