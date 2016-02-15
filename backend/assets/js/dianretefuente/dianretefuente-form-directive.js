'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name dianretefuente.directive:dianretefuenteForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="dianretefuente">
       <file name="index.html">
        <dianretefuente-form></dianretefuente-form>
       </file>
     </example>
   *
   */
  angular.module('dianretefuente').directive('dianretefuenteForm', dianretefuenteForm);

  function dianretefuenteForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'dianretefuente/dianretefuente-form-directive.tpl.html',
      replace: false,
      controllerAs: 'dianretefuenteForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.dianretefuente.info.source;

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
//# sourceMappingURL=dianretefuente-form-directive.js.map
