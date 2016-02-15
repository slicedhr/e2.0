(function () {
  'use strict';

  angular
    .module('categoriasproductos')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('categoriasproductos', {
        url: '/categoriasproductos',
        templateUrl: 'categoriasproductos/categoriasproductos.tpl.html',
        controller: 'CategoriasproductosCtrl',
        controllerAs: 'categoriasproductos'
      });
  }
}());
