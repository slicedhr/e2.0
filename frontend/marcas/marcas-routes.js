(function () {
  'use strict';

  angular
    .module('marcas')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('marcas', {
        url: '/marcas',
        templateUrl: 'marcas/marcas.tpl.html',
        controller: 'MarcasCtrl',
        controllerAs: 'marcas'
      });
  }
}());
