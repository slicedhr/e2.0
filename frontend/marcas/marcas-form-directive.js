(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name marcas.directive:marcasForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="marcas">
       <file name="index.html">
        <marcas-form></marcas-form>
       </file>
     </example>
   *
   */
  angular
    .module('marcas')
    .directive('marcasForm', marcasForm);

  function marcasForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'marcas/marcas-form-directive.tpl.html',
      replace: false,
      controllerAs: 'marcasForm',
      controller: function ($scope, $rootScope, AppService) {
        
        var self = this;
          
        this.data = JSON.parse($scope.data) || {}

        this.source = AppService.dataModels.marcas.info.source

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
