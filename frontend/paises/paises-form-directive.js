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
  angular
    .module('paises')
    .directive('paisesForm', paisesForm);

  function paisesForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@',
      },
      templateUrl: 'paises/paises-form-directive.tpl.html',
      replace: false,
      controllerAs: 'paisesForm',
      controller: function ($scope, $rootScope, AppService) {
        
        var self = this;
          
        this.data = JSON.parse($scope.data) || {}

        this.source = AppService.dataModels.paises.info.source

        this.save = () => {

          var data = self.data, 

              url = self.source

          AppService
            .save(data, url)
            .then(success => {

                AppService.broadcastDialog(success.data)

                $rootScope.$broadcast('saved:' + self.source, success.data)


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
