(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name clientes.directive:listReferidos
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="clientes">
       <file name="index.html">
        <list-referidos></list-referidos>
       </file>
     </example>
   *
   */
  angular
    .module('clientes')
    .directive('listReferidos', listReferidos);

  function listReferidos() {
    return {
      restrict: 'EA',
      scope: {
        referidos: '='
      },
      templateUrl: 'clientes/list-referidos-directive.tpl.html',
      replace: false,
      controllerAs: 'listReferidos',
      controller: function () {
        var vm = this;
        vm.name = 'listReferidos';
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
