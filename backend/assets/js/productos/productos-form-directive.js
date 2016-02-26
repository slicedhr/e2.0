'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name productos.directive:productosForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="productos">
       <file name="index.html">
        <productos-form></productos-form>
       </file>
     </example>
   *
   */
  angular.module('productos').directive('productosForm', productosForm);

  function productosForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'productos/productos-form-directive.tpl.html',
      replace: false,
      controllerAs: 'productosForm',
      controller: function controller($scope, $rootScope, AppService, $filter) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.data.tempDescuentos = {};

        this.data.bodega = 1;

        if (this.data.descuentos && this.data.descuentos.length) for (var i = 0, length1 = self.data.descuentos.length; i < length1; i++) self.data.tempDescuentos['id_' + self.data.descuentos[i].categoriacliente] = self.data.descuentos[i].descuento;else this.data.descuentos = [];

        this.getCategoriasCliente = function () {

          var config = {
            method: 'GET',
            url: AppService.setPrefix('categoriacliente?requireDiscount=1')
          };

          AppService.http(config).then(function (success) {

            self.categoriascliente = success.data.results;
          });
        };

        this.getCategoriasCliente();

        this.validations = [{
          key: 'categoria',
          required: true,
          title: 'Categoría'
        }, {
          key: 'marca',
          required: true,
          title: 'Marca'
        }, {
          key: 'unidad_de_medida',
          required: true,
          title: 'Unidad de medida'
        }, {
          key: 'proveedor',
          required: true,
          title: 'Proveedor'
        }, {
          key: 'proveedor2',
          required: false,
          title: 'Proveedor 2'
        }];

        if (Object.keys(self.data).length > 0) {

          for (var i = 0; i < self.validations.length; i++) {

            self.data['temp' + self.validations[i].key] = self.data[self.validations[i].key];

            if (self.data[self.validations[i].key]) self.data[self.validations[i].key] = self.data[self.validations[i].key].id;
          }
        }

        this.source = 'productos';

        this.discountChange = function (item, value) {

          var found = $filter('filter')(self.data.descuentos, { categoriacliente: item.id })[0];

          if (found) self.data.descuentos[self.data.descuentos.indexOf(found)].descuento = value;else self.data.descuentos.push({
            descuento: value,
            categoriacliente: item.id
          });
        };

        this.save = function () {

          var data = self.data,
              url = self.source;

          for (var i = 0; i < self.validations.length; i++) {

            if (!self.data['temp' + self.validations[i].key] && self.validations[i].required) {

              self.validation = self.validations[i].title;

              return;
            } else self.validation = false;
          }

          AppService.save(data, url).then(function (success) {

            if (self.data.id) {

              AppService.http({
                method: 'PUT',
                data: {
                  descuentos: self.data.descuentos
                },
                url: AppService.setPrefix('productos/modificar/descuentos')
              }).then(function (thesuccess) {

                success.data.descuentos = thesuccess.data;

                self.afterSave(success);
              });
            } else {

              AppService.http({
                method: 'POST',
                data: {
                  descuentos: self.data.descuentos,
                  producto: success.data.id
                },
                url: AppService.setPrefix('productos/crear/descuentos')
              }).then(function (thesuccess) {

                success.data.descuentos = thesuccess.data;

                self.afterSave(success);
              });
            }
          })['catch'](function (err) {

            AppService.broadcastError(err);
          });
        };

        this.afterSave = function (success) {

          for (var i = 0; i < self.validations.length; i++) self.data[self.validations[i].key] = self.data['temp' + self.validations[i].key];

          self.data.id = success.data.id;

          AppService.broadcastDialog(self.data);

          $rootScope.$broadcast('saved:' + self.source, self.data);
        };

        this.validateSelection = function (field, item) {

          if (item) self.data[field] = item.id;else return false;
        };

        this.getAutocomplete = function (text, field, source) {

          var query = {};

          query[field] = {

            contains: text

          };

          var config = {

            url: source,

            query: 'where=' + JSON.stringify(query),

            order: field + ' ASC'

          };

          return AppService.get(config).then(function (success) {

            return success.data.results;
          })['catch'](function (err) {

            AppService.broadcastError(err);
          });
        };
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=productos-form-directive.js.map
