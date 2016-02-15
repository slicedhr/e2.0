(function () {
  'use strict';

  /* @ngdoc object
   * @name enterprise
   * @description
   *
   */
  angular
  .module('enterprise')
  .config(config)
  .service('CancelableHttpService', httpService)
  .factory('CancelableHttpInterceptor', httpInterceptor)


  function config ($httpProvider) {

    $httpProvider.interceptors.push('CancelableHttpService');

  }

  function httpService ($q) {

    var cancelablePromises = [];

    var CancelableHttpService = {};

    CancelableHttpService.cancelablePromise = function () {

      var cancelablePromise = $q.defer();

      cancelablePromises.push(cancelablePromise);

      return cancelablePromise.promise;

    };

    CancelableHttpService.cancelAll = function () {

      angular.forEach(cancelablePromises, function (cancelPromise) {

        cancelPromise.resolve();

      });

      cancelablePromises = [];

    };

    return CancelableHttpService;
  };

  function httpInterceptor ($q, CancelableHttpService) {

    return {

      request: function (config) {

        if (config && config.timeout === undefined)
          config.timeout = CancelableHttpService.cancelablePromise();
        

        return config;
        
      }
    };
  };

}());