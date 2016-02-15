'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name clientes.controller:ClientesCtrl
   *
   * @description
   *
   */
  angular.module('clientes').controller('ClientesCtrl', ClientesCtrl);

  function ClientesCtrl(AppService, $rootScope, $scope, $stateParams, $filter, $mdToast, $mdSidenav) {
    var _this = this;

    var self = this;

    this.activedShowHide = false;

    this.base = 'clientes';

    this.title = 'Clientes';

    this.getCatClientes = function () {

      AppService.http(AppService.setConfig({

        url: AppService.setPrefix('categoriacliente?populate=categoriacliente&limit=999'),

        method: 'GET'

      })).then(function (success) {

        self.categoriasclientesArr = success.data.results;
      });
    };

    this.getCatClientes();

    this.removeDuplicateItems = function (items) {
      return items.filter(function (item) {
        return item.data == true;
      }).sort(function (a, b) {
        return a.categoriacliente - b.categoriacliente;
      });
    };

    this.transformToCategoriacliente = function (item) {
      return $filter('filter')(self.categoriasclientesArr, { id: item.categoriacliente });
    };

    if ($stateParams.id) {
      (function () {

        _this.datos = {};

        _this.seguimientosForm = {};

        _this.optionsWYSIWYG = AppService.defaultWYSIWYGConfig;

        _this.referidosCalled = false;

        _this.seguimientosCalled = false;

        _this.contactosCalled = false;

        _this.cotizacionesCalled = false;

        var id = $stateParams.id;

        var config = AppService.setConfig({

          url: AppService.setPrefix('cliente/sorted') + '?cliente=' + id,

          method: 'GET'

        });

        //Call customer data
        AppService.http(config).then(function (success) {

          self.datos = success.data;

          self.datos.categoriascliente = self.datos.categoriascliente.filter(function (item) {
            return item.data == true;
          }).sort(function (a, b) {
            return a.categoriacliente - b.categoriacliente;
          });

          console.log(self.datos);
        })['catch'](function (err) {
          return console.log(err);
        });

        _this.getOnTabSelect = function (url, called, varname) {
          var order = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

          if (!_this[called]) {

            var _config = {
              url: AppService.setPrefix(url + '=' + id),
              methond: 'GET'
            };

            _config.url = order ? _config.url + 'sort=id DESC' : _config.url;

            AppService.http(_config).then(function (success) {

              self[varname] = success;

              self[called] = true;

              if (varname == 'contactos') AppService.http(AppService.setConfig({

                url: AppService.setPrefix('categoriasproductos'),

                method: 'GET'

              })).then(function (success) {

                self.categoriasproductos = success.data.results;

                //Call states
                AppService.http(AppService.setConfig({

                  url: AppService.setPrefix('estados'),

                  method: 'GET'

                })).then(function (success) {

                  self.estados = success.data.results;
                });
              });
            });
          }
        };

        _this.seguimientosDialog = function ($event) {

          var dialog = {

            scope: $scope,

            targetEvent: $event,

            title: 'Nuevo Seguimiento',

            source: 'minuta',

            template: 'seguimientos-form',

            dataToForm: {
              contactos: self.contactos.data,
              estados: self.estados,
              cliente: self.datos.id,
              categoriasproductos: self.categoriasproductos
            }

          };

          AppService.showFormDialog(dialog).then(function (data) {

            if (!data) return;

            self.datos.seguimientos.push(data);

            if (data.contacto) $filter('filter')(self.contactos.data, { id: data.contacto })[0].minuta.push(data);

            self.datos.seguimientosactivos = !data.programar;
          })['catch'](function (err) {});
        };

        _this.toggleSeguimientos = function () {

          var config = {

            method: 'PUT',

            url: AppService.setPrefix('seguimientos/cancelar/' + self.datos.id + '?vendedor=' + $rootScope.auth.user.id)

          };

          AppService.http(config).then(function (success) {

            console.log(success.data);

            if (success.data.cliente) {
              self.datos.seguimientosactivos = success.data.cliente.seguimientosactivos;

              self.datos.seguimientos.push(success.data);

              $mdToast.show($mdToast.simple().textContent('Seguimientos cancelados para este cliente!').position('bottom right').hideDelay(5000));
            }
          });
        };

        _this.totalvendidos = function () {
          return $filter('filter')(self.datos.cotizaciones, { vendido: true });
        };
      })();
    } else {

      this.selected = [];

      this.page = 1;

      this.limit = 10;

      this.templateForm = 'clientes-form';

      this.colors = {

        low: 'lightred',

        medium: 'lightyellow',

        ok: 'lightgreen',

        never: 'black'

      };

      this.search = {

        icon: 'search',

        toggleSearch: function toggleSearch() {

          self.search.showInput = !self.search.showInput;

          self.search.icon = self.search.showInput ? 'cancel' : 'search';
        },

        autocomplete: function autocomplete(text, base, key) {

          var query = {};

          query[key] = {

            "contains": text

          };

          return AppService.get({
            url: base,

            query: 'where=' + JSON.stringify(query) + ' '

          }).then(function (success) {

            return success.data.results;
          });
        },

        checkAutocomplete: function checkAutocomplete(item) {

          if (item) self.search.fire(item.id);
        },

        check: function check() {

          if (self.search.by == 'distribuidor' || self.search.by == 'natural') self.search.fire();
        },

        fire: function fire(data) {
          var normal = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          var query = {};

          self.page = 1;

          var config = {

            url: self.base,

            query: query,

            page: self.page,

            limit: self.limit

          };

          if (normal) query[self.search.by] = {

            "contains": data

          };else {

            switch (self.search.by) {

              case 'usuario':

                query['vendedor_asignado'] = data;

                break;

              case 'ciudad':

                query['ciudad'] = data;

                break;

              case 'categoriacliente':

                query['categoriacliente'] = data;

                config.url = 'cc2p';

                break;

              case 'distribuidor':

                query['distribuidor'] = 1;

                break;

              case 'natural':

                query['natural'] = 1;

                break;

              case 'color':

                var today = moment().toISOString();

                var menos15 = moment().subtract(15, 'days').toISOString();

                var menos30 = moment().subtract(30, 'days').toISOString();

                switch (self.search.color) {

                  case self.colors.ok:

                    query['ultimo_seguimiento'] = {
                      '>=': menos15,
                      '<=': today
                    };

                    break;

                  case self.colors.medium:

                    query['ultimo_seguimiento'] = {
                      '>': menos15,
                      '<=': today
                    };

                    break;

                  case self.colors.medium:

                    query['ultimo_seguimiento'] = {
                      '<': menos30
                    };

                    break;

                }

                break;

            }
          }

          query = 'where=' + JSON.stringify(query);

          config.query = query;

          AppService.get(config).then(function (success) {

            var data = success.data;

            data.query = query;

            self.search.toggleSearch();

            self.total = success.data.count;

            $rootScope.$broadcast('filtered', data);
          });
        },

        listfilters: [{
          key: 'usuario',
          title: 'Vendedor Asignado',
          selected: true
        }, {
          key: 'nit',
          title: 'NIT'
        }, {
          key: 'razon_social',
          title: 'Razon Social'
        }, {
          key: 'color',
          title: 'Color'
        },
        // {
        //   key: 'color_y_usuario',
        //   title: 'Color y usuario'
        // },
        // {
        //   key: 'distribuidor',
        //   title: 'Distribuidor'
        // },
        // {
        //   key: 'natural',
        //   title: 'Persona Natural'
        // },
        {
          key: 'categoriacliente',
          title: 'Categoría Cliente'
        }, {
          key: 'ciudad',
          title: 'Ciudad'
        }]

      };

      //Get

      this.$get = function (page, limit, order) {

        AppService.scrollToTop('#mainContent');

        var config = {

          page: page,

          url: self.base,

          limit: limit,

          query: self.query || undefined,

          order: order || undefined

        };

        if (self.search.by === 'categoriacliente') config.url = 'cc2p';

        AppService.get(config).then(function (success) {

          var results = [];

          self.rows = [];

          if (self.search.by === 'categoriacliente') {

            success.data.results.forEach(function (element, index) {

              var filtered = $filter('getByID')(results, element.cliente.id);

              if (!filtered) {

                results.push((function () {

                  var cliente = element.cliente;

                  cliente.categoriascliente = [];

                  delete element.cliente;

                  element.categoriacliente = element.categoriacliente.id;

                  cliente.categoriascliente.push(element);

                  return cliente;
                })());
              } else {

                var _index = results.indexOf(filtered);

                delete element.cliente;

                element.categoriacliente = element.categoriacliente.id;

                results[_index].categoriascliente.push(element);
              }
            });
          } else results = success.data.results;

          for (var i = results.length - 1; i >= 0; i--) {

            var color;

            results[i].seguimiento = {};

            if (results[i].ultimo_seguimiento) {

              results[i].seguimiento.dias = moment().diff(results[i].ultimo_seguimiento, 'days');

              var dias = results[i].seguimiento.dias;

              if (dias <= 15) color = self.colors.ok;else if (dias > 15 && dias <= 30) color = self.colors.medium;else color = self.colors.low;
            } else color = self.colors.never;

            results[i].color = color;

            self.rows.push(results[i]);
          }

          self.total = success.data.info.total;
        })['catch'](function (err) {

          console.log(err);
        });
      };

      this.$get(self.page, self.limit);

      //Show Form Edit/Create

      this.form = function ($event, item) {
        var duplication = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        self.dataToForm = {};

        if (item && !duplication) {

          var options = {

            array: self.rows,

            condicion: { id: item.id }

          };

          var index = AppService.filter(options);

          self.dataToForm = self.rows[index];

          self.tempData = angular.copy(self.rows[index]);
        };

        if (duplication) {

          self.dataToForm = angular.copy(item);

          delete self.dataToForm.id;

          delete self.dataToForm.$hashKey;
        }

        var dialog = {

          scope: $scope,

          targetEvent: $event,

          dataToForm: self.dataToForm,

          title: self.title,

          source: self.base,

          template: self.templateForm

        };

        AppService.showFormDialog(dialog).then(function (data) {

          if (data) {

            if (item && angular.equals(angular.copy(item), self.tempData) && !duplication) self.rows[index] = data;

            if (!item || duplication) self.rows.push(data);
          }
        })['catch'](function (err) {});
      };

      //Delete

      this['delete'] = function ($event, id) {

        AppService.deleteDialog($event).then(function () {
          return AppService['delete'](self.base, id);
        }).then(function (response) {

          var options = {

            array: self.rows,

            condicion: { id: response.data.id }

          };

          var index = AppService.filter(options);

          self.rows.splice(index, 1);

          $('.scroller').scrollTop($('.scroller').scrollTop + 1);
        })['catch'](function () {});
      };

      this.getSelected = function (data) {

        console.log(self.selected);
      };

      this.keysToString = function (keys, obj) {

        if (!keys.contains('>')) return obj[keys];else {

          var keys = keys.split('>');

          var temp = obj;

          for (var i = 0; i < keys.length; i++) temp = temp[keys[i]];

          return temp;
        }
      };

      //On filtered

      $rootScope.$on('filtered', function ($event, data) {

        var results = [];

        self.rows = [];

        AppService.scrollToTop('#mainContent');

        if (self.search.by === 'categoriacliente') {

          data.results.forEach(function (element, index) {

            var filtered = $filter('getByID')(results, element.cliente.id);

            if (!filtered) {

              results.push((function () {

                var cliente = element.cliente;

                cliente.categoriascliente = [];

                delete element.cliente;

                element.categoriacliente = element.categoriacliente.id;

                cliente.categoriascliente.push(element);

                return cliente;
              })());
            } else {

              var _index2 = results.indexOf(filtered);

              delete element.cliente;

              element.categoriacliente = element.categoriacliente.id;

              results[_index2].categoriascliente.push(element);
            }
          });
        } else results = data.results;

        for (var i = results.length - 1; i >= 0; i--) {

          var color;

          results[i].seguimiento = {};

          if (results[i].ultimo_seguimiento) {

            results[i].seguimiento.dias = moment().diff(results[i].ultimo_seguimiento, 'days');

            var dias = results[i].seguimiento.dias;

            if (dias <= 15) color = self.colors.ok;else if (dias > 15 && dias <= 30) color = self.colors.medium;else color = self.colors.low;
          } else color = self.colors.never;

          results[i].color = color;

          self.rows.push(results[i]);
        }

        self.total = data.info.total;

        self.page = data.info.start + 1;

        self.limit = data.info.limit;

        self.query = data.query;
      });

      self.onOrderChange = function () {

        var order = self.order;

        if (order.contains('-')) order = self.order.replace('-', '') + ' ASC';else order = order + ' DESC';

        self.$get(1, self.limit, order);
      };

      self.columns = {

        nit: {
          title: 'NIT',
          actived: true
        },

        razon_social: {
          title: 'Razón Social/Nombre',
          actived: true
        },

        ciudad: {
          title: 'Ciudad',
          actived: true
        },

        telefonos: {
          title: 'Teléfonos',
          actived: true
        },

        email: {
          title: 'Email',
          actived: true
        },

        vendedor_asignado: {
          title: 'Vendedor',
          actived: true
        },

        tags: {
          title: 'Tags',
          actived: true
        },

        pais: {
          title: 'País',
          actived: false
        },

        representante: {
          title: 'Representante Legal',
          actived: false
        },

        responsable: {
          title: 'Responsable Delegado',
          actived: false
        },

        direccion: {
          title: 'Dirección',
          actived: false
        },

        comentarios: {
          title: 'Comentarios',
          actived: false
        },

        website: {
          title: 'Website',
          actived: false
        }

      };

      self.showHideMenu = function () {

        $mdSidenav('listShowHideColumnsClientes').toggle();
      };
    }
  }
})();
//# sourceMappingURL=clientes-controller.js.map
