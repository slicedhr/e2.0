'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name clientes.directive:listContactos
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="clientes">
       <file name="index.html">
        <list-contactos></list-contactos>
       </file>
     </example>
   *
   */
  angular.module('clientes').directive('listContactos', listContactos);

  function listContactos() {
    return {
      restrict: 'EA',
      scope: {
        contactos: '='
      },
      templateUrl: 'clientes/list-contactos-directive.tpl.html',
      replace: false,
      controllerAs: 'listContactos',
      controller: function controller($scope, AppService, $filter) {

        var vm = this;

        vm.name = 'listContactos';

        vm.form = function ($event, row) {

          $scope.data = row;

          var dialog = {

            scope: $scope,

            targetEvent: $event,

            title: 'Contacto',

            source: 'contactos',

            template: 'contactos-form',

            dataToForm: row

          };

          AppService.showFormDialog(dialog).then(function (data) {

            if (!data) return;

            console.log($filter('filter')($scope.contactos, { id: data.id })[0]);

            $scope.contactos[$scope.contactos.indexOf($filter('filter')($scope.contactos, { id: data.id })[0])] = data;
          })['catch'](function (err) {});
        };
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=list-contactos-directive.js.map
