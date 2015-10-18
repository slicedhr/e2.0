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
  angular
    .module('areas')
    .directive('areasForm', areasForm);

  function areasForm() {
    return {
      restrict: 'EA',
      scope: {
        area: '=',
      },
      templateUrl: 'areas/form-directive.tpl.html',
      replace: false,
      controllerAs: 'areasForm',
      controller: function ($scope, AppService) {
        
        var self = this;
          
        self.area = $scope.$parent.defaultTemplate.dataToForm || {}

        self.save = () => {

          var data = self.area, 

              url = 'areas'

          AppService
            .save(data, url)
            .then(success => {

                AppService.broadcastDialog(success.data)

            })
            .catch(err => {

              AppService.broadcastError(err)

            })

        }

      },
      link: function (scope, element, attrs) {

      }
    };
  }
}());
