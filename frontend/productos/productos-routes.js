(function () {
  'use strict';

  angular
    .module('productos')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('productos', {
        url: '/productos',
        templateUrl: 'productos/productos.tpl.html',
        controller: 'ProductosCtrl',
        controllerAs: 'productos'
      });
  }
}());
