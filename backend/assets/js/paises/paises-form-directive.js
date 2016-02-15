'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name paises.directive:paisesForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="paises">
       <file name="index.html">
        <paises-form></paises-form>
       </file>
     </example>
   *
   */
  angular.module('paises').directive('paisesForm', paisesForm);

  function paisesForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'paises/paises-form-directive.tpl.html',
      replace: false,
      controllerAs: 'paisesForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.paises.info.source;

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
//# sourceMappingURL=paises-form-directive.js.map
