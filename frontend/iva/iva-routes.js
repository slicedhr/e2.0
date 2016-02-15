(function () {
  'use strict';

  angular
    .module('iva')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('iva', {
        url: '/iva',
        templateUrl: 'iva/iva.tpl.html',
        controller: 'IvaCtrl',
        controllerAs: 'iva'
      });
  }
}());
