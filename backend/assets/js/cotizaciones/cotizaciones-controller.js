'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name cotizaciones.controller:CotizacionesCtrl
   *
   * @description
   *
   */
  angular.module('cotizaciones').controller('CotizacionesCtrl', CotizacionesCtrl);

  function CotizacionesCtrl($state, $rootScope, AppService) {
    var vm = this;
    vm.ctrlName = 'CotizacionesCtrl';

    vm.currentState = $state.current.name;

    vm.getCliente = function () {

      AppService.http({

        url: AppService.setPrefix('clientes/' + $state.params.cliente + '?populate=false'),

        method: 'GET'

      }).then(function (success) {

        vm.cliente = success.data;

        vm.contactosData = JSON.stringify({
          vendedor_asignado: vm.cliente.vendedor_asignado
        });
      });
    };

    vm.getContacto = function () {

      AppService.http({

        url: AppService.setPrefix('contactos/' + $state.params.contacto + '?populate=false'),

        method: 'GET'

      }).then(function (success) {

        vm.contacto = success.data;
      });
    };

    switch ($state.current.name) {

      case 'generar.contacto':

        if (!$state.params.cliente) $state.transitionTo('generar');else vm.getCliente();

        break;

      case 'generar.detalle':

        if ($state.params.cliente && $state.params.contacto) {

          vm.getCliente();

          if ($state.params.contacto != 'none') vm.getContacto();
        } else $state.transitionTo('generar');

        break;

      default:

        $state.transitionTo('generar');

        break;
    }

    $rootScope.$on('saved:cliente', function ($event, data) {

      vm.cliente = data;

      vm.contactosData = JSON.stringify({
        vendedor_asignado: vm.cliente.vendedor_asignado
      });

      $state.transitionTo('generar.contacto', { cliente: data.id });
    });

    $rootScope.$on('saved:contacto', function ($event, data) {

      vm.contacto = data;

      $state.transitionTo('generar.detalle', { cliente: vm.cliente.id, contacto: data.id });
    });
  }
})();
//# sourceMappingURL=cotizaciones-controller.js.map
