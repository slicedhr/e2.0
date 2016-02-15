'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name categoriasproductos.directive:categoriasproductosForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="categoriasproductos">
       <file name="index.html">
        <categoriasproductos-form></categoriasproductos-form>
       </file>
     </example>
   *
   */
  angular.module('categoriasproductos').directive('categoriasproductosForm', categoriasproductosForm);

  function categoriasproductosForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'categoriasproductos/categoriasproductos-form-directive.tpl.html',
      replace: false,
      controllerAs: 'categoriasproductosForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.source = AppService.dataModels.categoriasproductos.info.source;

        this.optionsWYSIWYG = AppService.defaultWYSIWYGConfig;

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
//# sourceMappingURL=categoriasproductos-form-directive.js.map
