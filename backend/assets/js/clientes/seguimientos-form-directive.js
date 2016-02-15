'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name seguimientos.directive:seguimientosForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="seguimientos">
       <file name="index.html">
        <seguimientos-form></seguimientos-form>
       </file>
     </example>
   *
   */
  angular.module('clientes').directive('seguimientosForm', seguimientosForm);

  function seguimientosForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'clientes/seguimientos-form-directive.tpl.html',
      replace: false,
      controllerAs: 'seguimientosForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        var scopedata = JSON.parse($scope.data);

        this.contactos = scopedata.contactos;

        this.estados = scopedata.estados;

        this.categoriasproductos = scopedata.categoriasproductos;

        this.data = {

          general: true,

          cliente: scopedata.cliente

        };

        this.source = 'minuta';

        this.optionsWYSIWYG = AppService.defaultWYSIWYGConfig;

        // this.today = moment().add(1,'day').format()

        this.myDate = new Date();

        this.today = new Date(this.myDate.getFullYear(), this.myDate.getMonth(), this.myDate.getDate() + 1);

        this.save = function () {

          var data = self.data,
              url = self.source;

          AppService.save(data, url).then(function (success) {

            success.data.programarseguimiento = self.data.programar;

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
//# sourceMappingURL=seguimientos-form-directive.js.map
