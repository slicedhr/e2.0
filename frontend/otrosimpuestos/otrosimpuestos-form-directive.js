(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name otrosimpuestos.directive:otrosimpuestosForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="otrosimpuestos">
       <file name="index.html">
        <otrosimpuestos-form></otrosimpuestos-form>
       </file>
     </example>
   *
   */
  angular
    .module('otrosimpuestos')
    .directive('otrosimpuestosForm', otrosimpuestosForm);

  function otrosimpuestosForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'otrosimpuestos/otrosimpuestos-form-directive.tpl.html',
      replace: false,
      controllerAs: 'otrosimpuestosForm',
      controller: function ($scope, $rootScope, AppService) {
        
        var self = this;
          
        this.data = JSON.parse($scope.data) || {}

        this.source = AppService.dataModels.otrosimpuestos.info.source

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
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
