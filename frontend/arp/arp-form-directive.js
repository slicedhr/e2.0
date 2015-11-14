(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name arp.directive:arpForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="arp">
       <file name="index.html">
        <arp-form></arp-form>
       </file>
     </example>
   *
   */
  angular
    .module('arp')
    .directive('arpForm', arpForm);

  function arpForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'arp/arp-form-directive.tpl.html',
      replace: false,
      controllerAs: 'arpForm',
      controller: function ($scope, $rootScope, AppService) {
        
        var self = this;
          
        this.data = JSON.parse($scope.data) || {}

        this.source = AppService.dataModels.arp.info.source

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
