'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name areas.directive:areasForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="areas">
       <file name="index.html">
        <areas-form></areas-form>
       </file>
     </example>
   *
   */
  angular.module('areas').directive('areasForm', areasForm);

  function areasForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'areas/areas-form-directive.tpl.html',
      replace: false,
      controllerAs: 'areasForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.areas.info.source;

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
      link: function link(scope, element, attrs) {}
    };
  }
})();
//# sourceMappingURL=areas-form-directive.js.map
