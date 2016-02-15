(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name enterprise.factory:ErrorInterceptor
   *
   * @description
   *
   */
  angular
    .module('enterprise')
    .factory('ErrorInterceptor', ErrorInterceptor);

  function ErrorInterceptor($rootScope, $q, $log) {

    var ErrorInterceptorBase = {};

    // ErrorInterceptorBase.request = function(config) {
    //   return config;
    // }

    // ErrorInterceptorBase.requestError = function(rejection) {
    //   return $q.reject(rejection);
    // }
    
    ErrorInterceptorBase.response = function (response) {

      var status = response.status



      if (response.statusText == 'Unauthorized') {

          $rootScope.$broadcast("AuthError", status);

          return;
      }

      else if ( (status >= 500) && (status < 600) ) {

          $rootScope.$broadcast("ServerError", status);

          return;
      }
      
      return response;

    },

    ErrorInterceptorBase.responseError = function (response) {

      if (response.statusText == 'Unauthorized')

        $rootScope.$broadcast("AuthError", status);
      
      else{
        $log.warn('Error en el server.')
        $log.warn(response)
        $rootScope.$broadcast("ServerError", response);
      }

      return $q.reject(response);

    }

    return ErrorInterceptorBase;
  }
}());
