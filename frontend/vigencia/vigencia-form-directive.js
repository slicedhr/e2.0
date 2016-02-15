(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name vigencia.directive:vigenciaForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="vigencia">
       <file name="index.html">
        <vigencia-form></vigencia-form>
       </file>
     </example>
   *
   */
  angular
    .module('vigencia')
    .directive('vigenciaForm', vigenciaForm);

  function vigenciaForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'vigencia/vigencia-form-directive.tpl.html',
      replace: false,
      controllerAs: 'vigenciaForm',
      controller: function ($scope, $rootScope, AppService) {
        
        var self = this;
          
        this.data = JSON.parse($scope.data) || {}

        this.source = AppService.dataModels.vigencia.info.source

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
