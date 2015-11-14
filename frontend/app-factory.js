(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name enterprise.factory:App
   *
   * @description
   *
   */
  angular
    .module('enterprise')
    .factory('AppService', AppService);

  function AppService($q, $http, $filter, $compile, $rootScope, $mdToast, $mdDialog, apiUrl) {

    var AppBase = {}, self = AppBase;

    AppBase.base_tinymce = 'http://wilcatec.com/enterprise_files/tinymce';


    // Set prefix to url
    
    AppBase.setPrefix = url => {

      return url.contains(apiUrl.serverUrl) ? url : apiUrl.prefix + url

    }


    // If server url then set server address & prefix
    
    AppBase.setServerUrl = (url, prefix = true) => {

      if (prefix)

        return url.contains(apiUrl.serverUrl) ? apiUrl.serverUrl + url : apiUrl.serverUrl + apiUrl.prefix + url
      
      else

        return apiUrl.serverUrl + '/' + url

    }


    // Filter Item By Condition
    
    AppBase.filter = options => {

      var filter = $filter('filter')(options.array, options.condicion || {}, true)[0];

      var index = options.array.indexOf(filter);

      return index

    }


    // Default Dialog

    AppBase.showFormDialog = options => {

      var template = {}

      var scope = options.scope

      var config = {

        url: '/partials/default-dialog-base.tpl.html',

        method: 'GET'

      }

      return self
              .http(config)
              .then( success => {

                var stringify = JSON.stringify( options.dataToForm ? options.dataToForm : scope.defaultTemplate.dataToForm)

                var title = options.title ? options.title : scope.options.data.info.title

                var source = options.source ? options.source : scope.options.data.info.source

                var template = options.template ? options.template : scope.options.template

                var data = success.data.replace('13-title-13', title)

                data = data.replace('13-class-13', source)

                data = data.replace('13-directive-13', '<' + template + ' data=\'' + stringify + '\'></'+ template +'>')

                return $mdDialog.show({

                  controller: DialogController,

                  template: data,

                  clickOutsideToClose: true,

                  escapeToClose: true,

                  scope: scope,

                  preserveScope: true,

                  parent: angular.element(document.body),

                  disableParentScroll: true,

                  targetEvent: options.targetEvent

                })

              })
              .catch(error => {
                
                self.randomError(error);

              })


      function DialogController($rootScope, $mdDialog){

        $rootScope.$on('SavedInDialog', function($event, data){

          $mdDialog.hide(data);

        })

      }

    }


    // Broadcasting of data from Default Dialog
    
    AppBase.broadcastDialog = dialogData => {

      $rootScope.$broadcast('SavedInDialog', dialogData)

    }


    // Broadcasting of ERROR from Default Dialog
    
    AppBase.broadcastError = err => {

      $rootScope.$broadcast('ServerError', dialogData)

    }


    //Default HTTP CALL

    AppBase.http = config => {

      return $http(config);

    }


    // Add promise to HTTP Request 
    // In case of change route then the request they are cancelled

    AppBase.setConfig = config => {

      var deferred = $q.defer(), 
          promise = deferred.promise

      config.timeout = promise

      config.cancel = deferred

      $rootScope.$broadcast('deferred', deferred)

      $rootScope.deferred = deferred

      return config

    }


    // Get Initial Data

    AppBase.initialData = ( id, prefix = true ) => {

      var config = self.setConfig({

        url: self.setPrefix(`auth/initialdata?id=${id}`, prefix),

        method: 'GET',
        
      })

      return self.http(config)

    }


    // GET
    
    AppBase.get = (options) => {

      options.limit = options.limit || 20

      options.page = options.page || 1

      options.pagination = options.pagination || true

      var limit = options.limit * options.page

      var skip = options.page && ( options.page == 1 ) ? 0 : limit / options.page * ( options.page - 1)

      var order = options.order || 'id%20DESC'

      options.url += options.query ? '?' + options.query + '&' : options.pagination ? '?' : '' 

      options.url += options.pagination ? 'skip='+ skip + '&limit=' + limit + '&sort=' + order : ''

      var config = self.setConfig({

        url: self.setPrefix(options.url, options.prefix),

        method: 'GET',

      })

      return self.http(config)

    }


    // POST PUT
    AppBase.save = (data, url, prefix = true) => {

      var config = {

        url: self.setPrefix(url, prefix) + (data.id ? '/' + data.id : ''),

        data: data,

        method: data.id ? 'PUT' : 'POST'

      }

      return self.http(config)

    }

    //DELETE
    AppBase.delete = (url, id, prefix = true) => {

      url += '/' + id

      var config = self.setConfig({

        url: self.setPrefix(url, prefix),

        method: 'DELETE'

      })

      return self.http(config)

    }

    // RANDOM DESIGN
    AppBase.randomDesign = (toRoot = true) => {

        var from = 1

        var to = 10
            
        var random = self.getRandom(from, to)

        if (random == 9)
          random = self.getRandom(from, to)
        if (toRoot)
          $rootScope.generatedrandomdesign = 'design-' +  random

        return 'design-' +  random

    }

    AppBase.getRandom = (from, to) => {

      return Math.floor(Math.random(from, to) * to + 1)

    }

    AppBase.randomError = error => {

      $mdToast
          .simple()
          .content('Ocurrio un error: \r\n Detalle: ' + JSON.stringify(error) )
          .position('bottom left')

    }

    AppBase.scrollToTop = where => {

      $(where)
        .stop()
        .animate({

          scrollTop: 0

        }, '800', 'swing');

    }

    AppBase.deleteDialog = $event => {
      var confirm = $mdDialog
                      .confirm()
                      .title('Confirmación')
                      .content('¿Realmente deseas eliminar este item?')
                      .ariaLabel('Delete Confirm')
                      .ok('Confirmar')
                      .cancel('Cancelar')
                      .targetEvent($event)

      return $mdDialog
              .show(confirm)
    }

    AppBase.dataModels = {

      areas: {
        info: {
          source: 'areas',
          title: 'AREAS'
        },
        columns: [{
          title: 'AREA',
          key: 'area',
          selected: true,
          show: true
        }]
      },

      arp: {
        info: {
          source: 'arp',
          title: 'ARP'
        },
        columns: [{
          title: 'ARP',
          key: 'proveedor_de_servicio',
          selected: true,
          show: true
        }]
      },

      eps: {
        info: {
          source: 'eps',
          title: 'EPS'
        },
        columns: [{
          title: 'EPS',
          key: 'eps',
          selected: true,
          show: true
        }]
      },

      dianretefuente: {
        info: {
          source: 'dianretefuente',
          title: 'DIAN RETE FUENTE'
        },
        columns: [
          {
            title: 'Detalle',
            key: 'detalle_del_impuesto',
            selected: true,
            show: true
          },
          {
            title: 'Porcentaje',
            key: 'porcentaje',
            selected: false,
            show: true,
            sufix: '%',
            align_center: true
          },
          {
            title: 'Resolución',
            key: 'resolucion',
            selected: false,
            show: true
          },
        ]
      },

      iva: {
        info: {
          source: 'iva',
          title: 'IVA'
        },
        columns: [{
          title: 'Impuesto',
          key: 'impuesto',
          selected: true,
          show: true,
          sufix: '%'
        }]
      },

      mediosdepago: {
        info: {
          source: 'mediosdepago',
          title: 'MEDIOS DE PAGO'
        },
        columns: [{
          title: 'Medio de pago',
          key: 'medios_de_pago',
          selected: true,
          show: true
        }]
      },

      marcas: {
        info: {
          source: 'marcas',
          title: 'MARCAS'
        },
        columns: [{
          title: 'Marca',
          key: 'nombre',
          selected: true,
          show: true
        }]
      },

      otrosimpuestos: {
        info: {
          source: 'otrosimpuestos',
          title: 'OTROS IMPUESTOS'
        },
        columns: [
          {
            title: 'Detalle',
            key: 'detalle_del_impuesto',
            selected: true,
            show: true
          },
          {
            title: 'Porcentaje',
            key: 'porcentaje',
            selected: false,
            show: true,
            sufix: '%'
          },
          {
            title: 'Resolución',
            key: 'resolucion',
            selected: false,
            show: true
          },
          {
            title: 'Vigencia',
            key: 'vigencia_del_impuesto',
            selected:false,
            show: true
          }
        ]
      },

      terminosdepago: {
        info: {
          source: 'terminosdepago',
          title: 'TERMINOS DE PAGO'
        },
        columns: [{
          title: 'Termino de pago',
          key: 'terminos_de_pago',
          selected: true,
          show: true
        }]
      },

      tiemposdeentrega: {
        info: {
          source: 'tiemposdeentrega',
          title: 'TIEMPOS DE ENTREGA'
        },
        columns: [{
          title: 'Tiempo de entrega',
          key: 'tiempo_de_entrega',
          selected: true,
          show: true
        }]
      },

      vigencia: {
        info: {
          source: 'vigencia',
          title: 'VIGENCIAS'
        },
        columns: [{
          title: 'Vigencia',
          key: 'vigencia',
          selected: true,
          show: true
        }]
      },

      paises: {
        info: {
          source: 'paises',
          title: 'PAISES'
        },
        columns: [{
          title: 'País',
          key: 'nombre',
          selected: true,
          show: true
        }]
      },
      ciudades: {
        info: {
          source: 'ciudades',
          title: 'CIUDADES'
        },
        columns: [
            {
              title: 'Nombre',
              key: 'nombre',
              selected: true,
              show: true,
              align_center: true
            },
            {
              title: 'País',
              key: 'pais>nombre',
              show: true,
              align_center: true,
            }

        ]
      },

      categoriasproductos: {
        info: {
          source: 'categoriasproductos',
          title: 'Categorías Productos'
        },
        columns: [{
          title: 'Nombre Categoría',
          key: 'nombre_categoria',
          selected: true,
          show: true
        }]
      },

      productos: {
        info: {
          source: 'productos',
          title: 'PRODUCTOS'
        },
        columns: [
            {
              title: 'Nombre',
              key: 'nombre',
              selected: true,
              show: true,
            },
            {
              title: 'U. Medida',
              key: 'unidad_de_medida',
              show: true,
              align_center: true,
            },
            {
              title: 'Referencia',
              key: 'referencia',
              show: true,
              align_center: true,
            },
            {
              title: 'Medidas',
              key: 'medidas_del_producto',
              show: true,
              align_center: true,
            },
            {
              title: 'Color',
              key: 'color',
              show: true,
              align_center: true,
            },
            {
              title: 'Cantidad',
              key: 'cantidad',
              show: true,
              align_center: true,
            },
            {
              title: 'Precio',
              key: 'precio_de_compra',
              show: true,
              align_center: true,
              prefix: '$'
            },
            {
              title: 'Utilidad Bruta',
              key: 'utilidad_bruta',
              show: true,
              align_center: true,
              sufix: '%'
            },           
            {
              title: 'IVA',
              key: 'iva',
              show: true,
              align_center: true,
              sufix: '%'
            },
            {
              title: 'Total',
              key: 'precio_de_compra',
              show: true,
              operation: true,
              align_center: true,
              prefix: '$',
              regex: '((((producto.utilidad_bruta*producto.precio_de_compra)/100)+producto.precio_de_compra))*(producto.iva/100)+((((producto.precio_de_compra*producto.utilidad_bruta)/100)+producto.precio_de_compra))'
            },



        ]
      },

    }


    AppBase.defaultWYSIWYGConfig = {
          inline: false,
          plugins : 'advlist autolink link image lists charmap print preview fullscreen textcolor table',
          skin_url: self.base_tinymce + '/skins/lightgray',
          theme_url: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.2.6/themes/modern/theme.min.js',
          language_url: self.base_tinymce + '/langs/es.js',
          external_plugins: {
            "advlist": self.base_tinymce + "/plugins/advlist/plugin.min.js",
            "autolink": self.base_tinymce + "/plugins/autolink/plugin.min.js",
            "image": self.base_tinymce + "/plugins/image/plugin.min.js",
            "lists": self.base_tinymce + "/plugins/lists/plugin.min.js",
            "charmap": self.base_tinymce + "/plugins/charmap/plugin.min.js",
            "print": self.base_tinymce + "/plugins/print/plugin.min.js",
            "link": self.base_tinymce + "/plugins/link/plugin.min.js",
            "preview": self.base_tinymce + "/plugins/preview/plugin.min.js",
            "fullscreen": self.base_tinymce + "/plugins/fullscreen/plugin.min.js",
            "textcolor": self.base_tinymce + "/plugins/textcolor/plugin.min.js",
            "table": self.base_tinymce + "/plugins/table/plugin.min.js",
          },
          toolbar: "bold italic underline strikethrough subscript superscript | alignleft aligncenter alignright alignjustify | bullist numlist styleselect formatselect fontselect fontsizeselect textcolor | link autolink image | preview fullscreen",
        };


  
    return AppBase;
  }
}());
