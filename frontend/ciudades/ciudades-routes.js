(function () {
  'use strict';

  angular
    .module('ciudades')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('ciudades', {
        url: '/ciudades',
        templateUrl: 'ciudades/ciudades.tpl.html',
        controller: 'CiudadesCtrl',
        controllerAs: 'ciudades'
      });
  }
}());
