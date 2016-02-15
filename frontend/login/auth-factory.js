(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name login.factory:Auth
   *
   * @description
   *
   */
  angular
    .module('login')
    .factory('AuthService', AuthService);

  function AuthService($rootScope, $mdDialog, $http, AppService) {

    var AuthBase = {}

    AuthBase.login = function (data) {

      var config = {

        method: 'POST', 

        skipAuthorization: true,

        data: data,

        url: AppService.setPrefix('auth/login')

      }

      return $http(config)

    }

    AuthBase.verify = function(){

      var config = {

        method: 'POST', 

        skipAuthorization: true,

        data: { token: sessionStorage['JWT'] },

        url: AppService.setPrefix('auth/verify')

      }

      return $http(config)
      
    }

    AppService.clearSession = function(){

      $rootScope.auth = {}

      delete sessionStorage['JWT']

    }

    AuthBase.logout = function () {

      $rootScope.$broadcast('loading', false);

        var confirm = $mdDialog.confirm()

        .title('Confirmación')

        .content('¿Realmente deseas salir?')

        .ok('Confirmar')

        .cancel('Cancelar')

        $mdDialog.show(confirm).then(function() {
          
        }, function() {
          
        });

    }

    return AuthBase;
  }
}());
