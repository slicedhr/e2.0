'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name tiemposdeentrega.directive:tiemposdeentregaForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="tiemposdeentrega">
       <file name="index.html">
        <tiemposdeentrega-form></tiemposdeentrega-form>
       </file>
     </example>
   *
   */
  angular.module('tiemposdeentrega').directive('tiemposdeentregaForm', tiemposdeentregaForm);

  function tiemposdeentregaForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'tiemposdeentrega/tiemposdeentrega-form-directive.tpl.html',
      replace: false,
      controllerAs: 'tiemposdeentregaForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.tiemposdeentrega.info.source;

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
//# sourceMappingURL=tiemposdeentrega-form-directive.js.map
