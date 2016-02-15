(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name enterprise.directive:progressCount
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="enterprise">
       <file name="index.html">
        <progress-count></progress-count>
       </file>
     </example>
   *
   */
  angular
    .module('enterprise')
    .directive('progressCount', progressCount);

  function progressCount() {
    return {
      restrict: 'EA',
      scope: {
        total: '@',
        duration: '@',
        idElement: '@'
      },
      templateUrl: 'partials/progress-count-directive.tpl.html',
      replace: false,
      controllerAs: 'progressCount',
      controller: function ($scope) {
        
        var self = this

        this.currentStep = 0

        var idElement = $scope.idElement

        $scope.$on('step:'+idElement, function($event, step){

          self.currentStep = step

        })

      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
