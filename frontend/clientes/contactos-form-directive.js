(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name contactos.directive:contactosForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="contactos">
       <file name="index.html">
        <contactos-form></contactos-form>
       </file>
     </example>
   *
   */
  angular
    .module('enterprise')
    .directive('contactosForm', contactosForm);

  function contactosForm() {

    return {

      restrict: 'EA',

      scope: {

        data: '@'

      },

      templateUrl: 'clientes/contactos-form-directive.tpl.html',

      replace: false,

      controllerAs: 'contactosForm',

      controller: function ($scope, $rootScope, $mdToast, $filter, AppService) {
        
        var self = this;

        this.data = JSON.parse($scope.data) || { } 

        console.log(self)

        this.source = 'contactos'

        this.user = $rootScope.auth.user

        AppService
          .http(AppService.setConfig({

              url: AppService.setPrefix('usuarios'),

              method: 'GET'

          }))
          .then( success => {

              self.vendedores = success.data.results
        
          })

        //save form
        this.save = () => {

          $rootScope.loading = true

          var data = self.data,
              url = 'contactos'

          AppService
            .save(data, url)
            .then(success => {

              self.data = success.data
              
              AppService.broadcastDialog(self.data)

              $rootScope.$broadcast('saved:contacto', self.data)


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
