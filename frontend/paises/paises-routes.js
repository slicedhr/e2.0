(function () {
  'use strict';

  angular
    .module('paises')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('paises', {
        url: '/paises',
        templateUrl: 'paises/paises.tpl.html',
        controller: 'PaisesCtrl',
        controllerAs: 'paises'
      });
  }
}());
