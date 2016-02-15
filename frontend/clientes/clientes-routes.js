(function () {
  'use strict';

  angular
    .module('clientes')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('clientes', {
        url: '/clientes',
        templateUrl: 'clientes/clientes.tpl.html',
        controller: 'ClientesCtrl',
        controllerAs: 'clientes'
      })
      .state('cliente', {
        url: '/cliente/:id/:razon_social',
        templateUrl: 'clientes/cliente.tpl.html',
        controller: 'ClientesCtrl',
        controllerAs: 'cliente'
      })
      ;
  }
}());
