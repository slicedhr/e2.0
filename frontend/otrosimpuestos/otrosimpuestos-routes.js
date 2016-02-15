(function () {
  'use strict';

  angular
    .module('otrosimpuestos')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('otrosimpuestos', {
        url: '/otrosimpuestos',
        templateUrl: 'otrosimpuestos/otrosimpuestos.tpl.html',
        controller: 'OtrosimpuestosCtrl',
        controllerAs: 'otrosimpuestos'
      });
  }
}());
