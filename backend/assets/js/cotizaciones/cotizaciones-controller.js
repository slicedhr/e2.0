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

  function CotizacionesCtrl($state, $rootScope, $filter, $mdToast, $mdDialog, AppService) {

    var vm = this;

    vm.ctrlName = 'CotizacionesCtrl';

    vm.data = {};

    vm.tempProducts = [];

    vm.optionsWYSIWYG = AppService.defaultWYSIWYGConfig;

    vm.currentState = $state.current.name;

    vm.getCliente = function () {

      AppService.http({

        url: AppService.setPrefix('clientes/' + $state.params.cliente + '?populate=categoriascliente'),

        method: 'GET'

      }).then(function (success) {

        vm.cliente = success.data;

        vm.data.cliente = vm.cliente.id;

        vm.load('contactos?cliente=' + vm.cliente.id + '&populate=false', 'contactos');

        vm.load('categoriacliente', 'categoriascliente', function (data) {

          var tempCatClientes = [];

          vm.filteredCategoriasCliente = [];

          for (var i = 0, length1 = vm.cliente.categoriascliente.length; i < length1; i++) {

            var found = $filter('filter')(tempCatClientes, { categoriacliente: vm.cliente.categoriascliente[i].categoriacliente })[0];

            if (!found) if ($filter('filter')(data, { id: vm.cliente.categoriascliente[i].categoriacliente })[0].requireDiscount) tempCatClientes.push(vm.cliente.categoriascliente[i]);
          }

          if (tempCatClientes.length) for (var i = 0, length1 = tempCatClientes.length; i < length1; i++) AppService.http({
            method: 'GET',
            url: AppService.setPrefix('cc2p?categoriacliente=' + tempCatClientes[i].categoriacliente + '&cliente=' + vm.cliente.id + '&populate=categoriasproductos&populate=categoriacliente')

          }).then(function (thesuccess) {

            thesuccess.data.results.forEach(function (element, index) {

              if (element.data) vm.filteredCategoriasCliente.push(element);
            });
          });
        });

        vm.contactosData = JSON.stringify({
          vendedor_asignado: vm.cliente.vendedor_asignado
        });
      });
    };

    vm.getCombinaciones = function () {

      AppService.http({

        url: AppService.setPrefix('combinaciones?limit=99'),

        method: 'GET'

      }).then(function (success) {

        vm.combinaciones = success.data.results;
      });
    };

    vm.getContacto = function () {

      AppService.http({

        url: AppService.setPrefix('contactos/' + $state.params.contacto + '?populate=false'),

        method: 'GET'

      }).then(function (success) {

        vm.contacto = success.data;

        vm.data.contacto = vm.data.contacto;
      });
    };

    vm.validateCliente = function (item) {

      if (item) {
        vm.cliente = item;
        $state.transitionTo('generar.contacto', { cliente: vm.cliente.id });
      }
    };

    vm.validateSelection = function (item) {

      if (item) {
        vm.tempProducts.push(angular.copy(vm.productTemp));

        vm.sumar();

        vm.searchProduct = '';
      } else return false;
    };

    vm.sumar = function () {

      var suma = 0;

      setTimeout(function () {

        for (var i = 0; i < vm.tempProducts.length; i++) suma += (vm.tempProducts[i].precio_de_compra * vm.tempProducts[i].utilidad_bruta / 100 + vm.tempProducts[i].precio_de_compra) * vm.tempProducts[i].cantidad - (vm.tempProducts[i].precio_de_compra * vm.tempProducts[i].utilidad_bruta / 100 + vm.tempProducts[i].precio_de_compra) * vm.tempProducts[i].cantidad * vm.tempProducts[i].descuentoproducto / 100 + ((vm.tempProducts[i].precio_de_compra * vm.tempProducts[i].utilidad_bruta / 100 + vm.tempProducts[i].precio_de_compra) * vm.tempProducts[i].cantidad - (vm.tempProducts[i].precio_de_compra * vm.tempProducts[i].utilidad_bruta / 100 + vm.tempProducts[i].precio_de_compra) * vm.tempProducts[i].cantidad * vm.tempProducts[i].descuentoproducto / 100) * vm.tempProducts[i].iva / 100;

        vm.sumaTotal = suma;
      }, 0);
    };

    vm.removeProduct = function (row) {

      vm.tempProducts.splice(vm.tempProducts.indexOf(row), 1);

      vm.sumar();
    };

    vm.selectCombinacion = function (item) {

      vm.tempProducts = [];

      vm.data.categoria = item.categoria.id;

      vm.tempProducts = angular.copy(item.productos);

      vm.showCombinaciones = false;

      vm.sumar();
    };

    vm.changeDiscount = function () {

      vm.tempProducts[vm.tempIndexToDiscount].descuentoproducto = vm.descuentoTemporal;

      vm.sumar();
    };

    vm.discountToMax = function (producto, catcli) {

      return AppService.http({
        url: AppService.setPrefix('descuentos?producto=' + producto + '&categoriacliente=' + catcli + '&populate=false'),
        method: 'GET'
      });
    };

    vm.selectDiscountFromPanel = function (item) {
      var ordinario = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (ordinario) {

        vm.descuentoMaximo = vm.tempProducts[vm.tempIndexToDiscount].descuento;

        vm.showDiscountPanel = true;

        vm.panelselect = false;

        return;
      }

      if (item.requireProduct) {

        if ($filter('filter')(vm.filteredCategoriasCliente[0].categoriasproductos, { id: vm.data.categoria })[0]) {

          vm.discountToMax(vm.tempProducts[vm.tempIndexToDiscount].id, item.categoriacliente.id).then(function (success) {

            var results = success.data.results;

            if (results.length) vm.descuentoMaximo = results[0].descuento;else {

              vm.descuentoMaximo = vm.tempProducts[vm.tempIndexToDiscount].descuento || 0;

              $mdToast.show($mdToast.simple().textContent('Posiblemente no se han parametrizado descuentos!').position('top right').hideDelay(7000));
            }

            vm.showDiscountPanel = true;

            vm.panelselect = false;
          });
        } else {
          var categoria = $filter('filter')(vm.categorias, { id: vm.data.categoria })[0].nombre_categoria;

          $mdToast.show($mdToast.simple().textContent('El descuento seleccionado no aplica para la categoría ' + categoria).position('bottom right').hideDelay(7000));
        }
      } else {

        vm.discountToMax(vm.tempProducts[vm.tempIndexToDiscount].id, item.categoriacliente.id).then(function (success) {

          var results = success.data.results;

          if (results.length) vm.descuentoMaximo = results[0].descuento;else {

            vm.descuentoMaximo = vm.tempProducts[vm.tempIndexToDiscount].descuento || 0;

            $mdToast.show($mdToast.simple().textContent('Posiblemente no se han parametrizado descuentos!').position('top right').hideDelay(7000));
          }

          vm.showDiscountPanel = true;

          vm.panelselect = false;
        });
      }
    };

    vm.openDiscountSlide = function (row) {

      vm.descuentoTemporal = row.descuentoproducto;

      vm.tempIndexToDiscount = vm.tempProducts.indexOf(row);

      if (vm.filteredCategoriasCliente.length > 1) {

        vm.panelselect = true;
      } else if (vm.filteredCategoriasCliente.length == 1) {

        vm.discountToMax(row.id, vm.filteredCategoriasCliente[0].categoriacliente.id).then(function (success) {

          var results = success.data.results;

          vm.showDiscountPanel = true;

          if (results.length) {

            if (vm.filteredCategoriasCliente[0].categoriacliente.requireProduct) {

              if ($filter('filter')(vm.filteredCategoriasCliente[0].categoriasproductos, { id: vm.data.categoria })[0]) vm.descuentoMaximo = results[0].descuento;else vm.descuentoMaximo = row.descuento || 0;
            } else vm.descuentoMaximo = results[0].descuento;
          } else {

            vm.descuentoMaximo = row.descuento || 0;

            $mdToast.show($mdToast.simple().textContent('Posiblemente no se han parametrizado descuentos!').position('top right').hideDelay(7000));
          }
        });
      } else {

        vm.showDiscountPanel = true;

        vm.descuentoMaximo = row.descuento || 0;
      }
    };

    vm.getAutocomplete = function (text, field, source) {

      var query = {};

      query[field] = {

        contains: text

      };

      query['categoria'] = vm.data.categoria;

      var config = {

        url: source,

        query: 'where=' + JSON.stringify(query) + '&populate=false',

        order: field + ' ASC'

      };

      return AppService.get(config).then(function (success) {

        return success.data.results;
      })['catch'](function (err) {

        AppService.broadcastError(err);
      });
    };

    vm.load = function (source, model, cb) {

      var config = {

        method: 'GET',

        url: AppService.setPrefix('' + source)

      };

      AppService.http(config).then(function (success) {

        vm[model] = success.data.results;

        if (cb) cb(success.data.results);
      });
    };

    vm.generar = function () {

      var detalle = [];

      vm.data.generadaPor = $rootScope.auth.user.id;

      vm.data.vendedor = vm.cliente.vendedor_asignado;

      vm.data.valor_total = vm.sumaTotal;

      if (vm.tempProducts.length) {

        vm.tempProducts.forEach(function (element, index) {

          detalle.push({
            producto: element.id,
            cantidad: element.cantidad,
            precio: element.precio_de_compra,
            iva: element.iva,
            utilidad_bruta: element.utilidad_bruta,
            descuento: element.descuento
          });
        });

        var config = {
          method: 'POST',
          url: AppService.setPrefix('registrar-cotizacion'),
          data: {
            data: vm.data,
            detalle: detalle
          }

        };

        vm.disabledSave = true;

        AppService.http(config).then(function (success) {

          if (success.data.ok) {
            $state.transitionTo('cliente', { id: vm.cliente.id, razon_social: vm.cliente.razon_social });
          }
        });
      } else $mdToast.show($mdToast.simple().textContent('Por favor agregar productos a la lista!').position('top right').hideDelay(5000));
    };

    switch ($state.current.name) {

      case 'generar.contacto':

        if (!$state.params.cliente) $state.transitionTo('generar');else vm.getCliente();

        break;

      case 'generar.detalle':

        if ($state.params.cliente && $state.params.contacto) {

          vm.getCliente();

          if ($state.params.contacto != 'none') vm.getContacto();

          AppService.http({

            url: AppService.setPrefix('categoriasproductos?limit=99&populate=false'),

            method: 'GET'

          }).then(function (success) {

            vm.categorias = success.data.results;
          });

          vm.getCombinaciones();
        } else $state.transitionTo('generar');

        break;

      default:

        $state.transitionTo('generar');

        break;
    }

    $rootScope.$on('saved:cliente', function ($event, data) {

      vm.cliente = data;

      vm.data.cliente = data.id;

      vm.contactosData = JSON.stringify({
        vendedor_asignado: vm.cliente.vendedor_asignado
      });

      $state.transitionTo('generar.contacto', { cliente: data.id });
    });

    $rootScope.$on('saved:contacto', function ($event, data) {

      vm.contacto = data;

      vm.data.contacto = data.id;

      $state.transitionTo('generar.detalle', { cliente: vm.cliente.id, contacto: data.id });
    });
  }
})();
//# sourceMappingURL=cotizaciones-controller.js.map
