(function () {
  'use strict';

  angular
    .module('cotizaciones')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('cotizaciones', {
        url: '/cotizaciones',
        templateUrl: 'cotizaciones/cotizaciones.tpl.html',
        controller: 'CotizacionesCtrl',
        controllerAs: 'cotizaciones'
      })
      .state('generar', {
        url: '/generar-cotizacion',
        templateUrl: 'cotizaciones/generar.tpl.html',
        controller: 'CotizacionesCtrl',
        controllerAs: 'cotizaciones'
      })
      .state('generar.contacto', {
        url: '/contacto/:cliente',
        templateUrl: 'cotizaciones/generar.contacto.tpl.html',
        controller: 'CotizacionesCtrl',
        controllerAs: 'cotizaciones',
      })
      .state('generar.detalle', {
        url: '/detalle/:cliente/:contacto',
        templateUrl: 'cotizaciones/generar.detalle.tpl.html',
        controller: 'CotizacionesCtrl',
        controllerAs: 'cotizaciones',
      })
      ;
  }
}());
