(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name clientes.directive:timeline
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="clientes">
       <file name="index.html">
        <timeline></timeline>
       </file>
     </example>
   *
   */
  angular
    .module('clientes')
    .directive('timeline', timeline);

  function timeline($filter) {
    return {
      restrict: 'EA',
      scope: {
        seguimientos: '=',
        categorias: '=',
        estados: '='
      },
      templateUrl: 'clientes/timeline-directive.tpl.html',
      replace: false,
      controllerAs: 'timeline',
      controller: function ($scope, $sce) {
        
        var vm = this;

        vm.name = 'timeline';

        vm.search = (where, condition) =>  $filter('filter')($scope[where], condition);

        console.log($scope.parent)

      },
      link: function (scope, element, attrs) {

        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());

