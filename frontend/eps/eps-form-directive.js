(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name eps.directive:epsForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="eps">
       <file name="index.html">
        <eps-form></eps-form>
       </file>
     </example>
   *
   */
  angular
    .module('eps')
    .directive('epsForm', epsForm);

  function epsForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'eps/eps-form-directive.tpl.html',
      replace: false,
      controllerAs: 'epsForm',
      controller: function ($scope, $rootScope, AppService) {
        
        var self = this;
          
        this.data = JSON.parse($scope.data) || {}

        this.source = AppService.dataModels.eps.info.source

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
