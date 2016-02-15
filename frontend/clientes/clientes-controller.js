(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name clientes.controller:ClientesCtrl
   *
   * @description
   *
   */
  angular
    .module('clientes')
    .controller('ClientesCtrl', ClientesCtrl);

  function ClientesCtrl(AppService, $rootScope, $scope, $stateParams, $filter, $mdToast, $mdSidenav) {

    var self = this;

    this.activedShowHide = false

    this.base = 'clientes'

    this.title = 'Clientes'

    this.getCatClientes = () => {

      AppService.http(AppService.setConfig({

          url: AppService.setPrefix('categoriacliente?populate=categoriacliente&limit=999'),

          method: 'GET'

        }))
        .then( success => {

            self.categoriasclientesArr = success.data.results
      
      })

    }

    this.getCatClientes()

    this.removeDuplicateItems = items => items.filter(item => item.data == true).sort((a, b) => a.categoriacliente - b.categoriacliente)

    this.transformToCategoriacliente = item => $filter('filter')(self.categoriasclientesArr, { id: item.categoriacliente } )

    if ($stateParams.id){

      this.datos = {}

      this.seguimientosForm = {}

      this.optionsWYSIWYG = AppService.defaultWYSIWYGConfig

      this.referidosCalled = false

      this.seguimientosCalled = false

      this.contactosCalled = false

      this.cotizacionesCalled = false

      let id = $stateParams.id

      let config = AppService.setConfig({

        url: AppService.setPrefix('cliente/sorted') + '?cliente=' + id,

        method: 'GET',

      })

      //Call customer data
      AppService.http(config).then(success => {

        self.datos = success.data

        self.datos.categoriascliente = self.datos.categoriascliente.filter(item => item.data == true).sort((a, b) => a.categoriacliente - b.categoriacliente)

        console.log(self.datos)

      }).catch(err => console.log(err))


      this.getOnTabSelect = (url, called, varname, order = false) => {

        if (!this[called]){

          let config = {
            url: AppService.setPrefix(`${url}=${id}`),
            methond: 'GET'
          }

          config.url = order ? config.url + 'sort=id DESC' : config.url;

          AppService
            .http(config)
            .then(success => {

              self[varname] = success

              self[called] = true

              if (varname == 'contactos')

                AppService.http(AppService.setConfig({

                    url: AppService.setPrefix('categoriasproductos'),

                    method: 'GET'

                }))
                .then( success => {

                      self.categoriasproductos = success.data.results

                      //Call states
                      AppService.http(AppService.setConfig({

                          url: AppService.setPrefix('estados'),

                          method: 'GET'

                      }))
                      .then( success => {

                          self.estados = success.data.results
                    
                      })
                
                })


            })

        }

      }


      this.seguimientosDialog = $event => {

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

        }

      AppService
        .showFormDialog(dialog)
        .then( data => {

          if (!data) return

          self.datos.seguimientos.push(data)

          if (data.contacto)
            $filter('filter')(self.contactos.data, { id: data.contacto })[0].minuta.push(data)

          self.datos.seguimientosactivos = !data.programar

        })
        .catch(err => {


        })

      }

      this.toggleSeguimientos = () => {

        let config = {

            method: 'PUT',

            url: AppService.setPrefix(`seguimientos/cancelar/${self.datos.id}?vendedor=${$rootScope.auth.user.id}`)

          }

          AppService
            .http(config)
            .then(success => {

              console.log(success.data)

              if (success.data.cliente){
                self.datos.seguimientosactivos = success.data.cliente.seguimientosactivos

                self.datos.seguimientos.push(success.data)

                $mdToast.show(

                  $mdToast.simple()

                    .textContent('Seguimientos cancelados para este cliente!')
                    .position('bottom right')
                    .hideDelay(5000)

                );

              }


            })

      }

      this.totalvendidos = () => $filter('filter')(self.datos.cotizaciones, { vendido: true })

    }
    else{


    this.selected = []

    this.page = 1

    this.limit = 10



    this.templateForm  = 'clientes-form'

    this.colors = {

      low: 'lightred',

      medium: 'lightyellow',

      ok: 'lightgreen',

      never: 'black'

    }

    this.search = {
      
      icon: 'search',

      toggleSearch: () => {

          self.search.showInput = !self.search.showInput

          self.search.icon = self.search.showInput ? 'cancel' : 'search'

      },

      autocomplete: (text, base, key) => {

        var query = { }

        query[key] = {

            "contains" : text

          }


        return AppService.get(
          {
            url: base,

            query: `where=${JSON.stringify(query)} `

          }
        )
        .then(success => {

          return success.data.results

        })

      },

      checkAutocomplete: item => {

        if (item)
          self.search.fire(item.id)

      },

      check: () => {

        if (self.search.by == 'distribuidor' || self.search.by == 'natural')
          self.search.fire()

      },

      fire: (data, normal = false) => {

        var query = {}

        self.page = 1;


        var config = {

          url: self.base,

          query: query,

          page: self.page,

          limit: self.limit

        }


        if (normal) 
          query[self.search.by] = {

            "contains" : data

          }
        
        else{

          switch(self.search.by){

            case 'usuario':

              query['vendedor_asignado'] = data

            break;

            case 'ciudad':

              query['ciudad'] = data

            break;

            case 'categoriacliente':

              query['categoriacliente'] = data

              config.url = 'cc2p'

            break;

            case 'distribuidor':

              query['distribuidor'] = 1

            break;

            case 'natural':

              query['natural'] = 1

            break;

            case 'color':

              var today = moment().toISOString();

              var menos15 = moment().subtract(15, 'days').toISOString();

              var menos30 = moment().subtract(30, 'days').toISOString();


              switch(self.search.color){

                case self.colors.ok:

                  query['ultimo_seguimiento'] = {
                    '>=': menos15,
                     '<=': today
                   }

                break;

                case self.colors.medium:

                  query['ultimo_seguimiento'] = {
                    '>': menos15,
                     '<=': today
                   }

                break;

                case self.colors.medium:

                  query['ultimo_seguimiento'] = {
                    '<': menos30,
                   }

                break;

              }

            break;

          }

        }

        query = 'where=' + JSON.stringify(query)

        config.query = query

        AppService
          .get(config)
          .then( success => {

            var data = success.data

            data.query = query

            self.search.toggleSearch()

            self.total = success.data.count

            $rootScope.$broadcast('filtered', data)

          })
      },


      listfilters: [
        {
          key: 'usuario',
          title: 'Vendedor Asignado',
          selected: true
        },
        {
          key: 'nit',
          title: 'NIT'
        },
        {
          key: 'razon_social',
          title: 'Razon Social'
        },
        {
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
        },
        {
          key: 'ciudad',
          title: 'Ciudad'
        },
      ],

    }


    //Get

    this.$get = (page, limit, order) => {

      AppService.scrollToTop('#mainContent')

      let config = {

          page: page,
          
          url: self.base,
          
          limit: limit,

          query: self.query || undefined,

          order: order || undefined

        }

      if (self.search.by === 'categoriacliente')
        config.url = 'cc2p'

      AppService
        .get(config)

        .then(success => {

          let results = []

          self.rows = []

          if (self.search.by === 'categoriacliente'){


            success.data.results.forEach(function(element, index){

              let filtered = $filter('getByID')(results, element.cliente.id)

              if (!filtered){

                results.push(() => {

                  let cliente = element.cliente

                  cliente.categoriascliente = []

                  delete element.cliente

                  element.categoriacliente = element.categoriacliente.id


                  cliente.categoriascliente.push(element)

                  return cliente

                }())

              }

              else {

                let index = results.indexOf(filtered)

                delete element.cliente

                element.categoriacliente = element.categoriacliente.id


                results[index].categoriascliente.push(element)

              }
              

            });
            
          }
            
          else
            results = success.data.results

          for (let i = results.length - 1; i >= 0; i--) {

            var color

            results[i].seguimiento = {}

            if (results[i].ultimo_seguimiento){

              results[i].seguimiento.dias = moment().diff(results[i].ultimo_seguimiento,'days')

              var dias = results[i].seguimiento.dias

              if (dias <= 15)
                color = self.colors.ok

              else if(dias > 15 && dias <= 30)
                color =  self.colors.medium

              else
                color =  self.colors.low
            }

            else
              color =  self.colors.never
            
            results[i].color = color

            self.rows.push(results[i])

          }

          self.total = success.data.info.total


        })
        .catch(err => {

          console.log(err)

        })

    }


    this.$get(self.page, self.limit)



    //Show Form Edit/Create
    
    this.form = ($event, item, duplication = false) => {

      self.dataToForm = {}

      if (item && !duplication){

        var options = {

          array: self.rows,

          condicion: { id: item.id }

        }

        var index = AppService.filter(options)

        self.dataToForm = self.rows[index];

        self.tempData = angular.copy(self.rows[index])

      };

      if (duplication){

        self.dataToForm = angular.copy(item)

        delete self.dataToForm.id

        delete self.dataToForm.$hashKey

      }

      var dialog = {

        scope: $scope,

        targetEvent: $event,

        dataToForm: self.dataToForm,

        title: self.title,

        source: self.base,

        template: self.templateForm

      }

      AppService
        .showFormDialog(dialog)
        .then( data => {

         if (data){

          if( item && angular.equals(angular.copy(item), self.tempData) && !duplication)
            self.rows[index] = data

          if ( !item || duplication)
            self.rows.push(data)

         }


        })
        .catch(err => {


        })

    }


    //Delete
    
    this.delete = ($event, id) => {

      AppService
        .deleteDialog($event)
        .then(() => 

          AppService
            .delete(self.base, id)

        )

        .then(response => {
              
          var options = {

            array: self.rows,

            condicion: { id: response.data.id }

          }

          var index = AppService.filter(options)

          self.rows.splice(index, 1)

          $('.scroller').scrollTop($('.scroller').scrollTop + 1)

        })
        .catch(() => {

        })

    }

    this.getSelected = data => {

      console.log(self.selected)

    }

    

    this.keysToString = (keys, obj) => {

      if (!keys.contains('>'))
        return obj[keys]

      else{

        var keys = keys.split('>')

        var temp = obj

        for (var i = 0; i < keys.length; i++)
          temp = temp[ keys[ i ] ]

        return temp

      }

    }

    //On filtered
    
    $rootScope.$on('filtered', ($event, data) => {

      let results = []
      
      self.rows = []

      AppService.scrollToTop('#mainContent')

      if (self.search.by === 'categoriacliente'){


        data.results.forEach(function(element, index){

          let filtered = $filter('getByID')(results, element.cliente.id)

          if (!filtered){

            results.push(() => {

              let cliente = element.cliente

              cliente.categoriascliente = []

              delete element.cliente

              element.categoriacliente = element.categoriacliente.id

              cliente.categoriascliente.push(element)

              return cliente

            }())

          }

          else {

            let index = results.indexOf(filtered)

            delete element.cliente

            element.categoriacliente = element.categoriacliente.id


            results[index].categoriascliente.push(element)

          }


        });
        
      }
        
      else
        results = data.results

      for (let i = results.length - 1; i >= 0; i--) {

          var color

          results[i].seguimiento = {}

          if (results[i].ultimo_seguimiento){

            results[i].seguimiento.dias = moment().diff(results[i].ultimo_seguimiento,'days')

            var dias = results[i].seguimiento.dias

            if (dias <= 15)
              color = self.colors.ok

            else if(dias > 15 && dias <= 30)
              color =  self.colors.medium

            else
              color =  self.colors.low
          }

          else
            color =  self.colors.never
          
          results[i].color = color

          self.rows.push(results[i])

        }

      self.total = data.info.total

      self.page = data.info.start + 1

      self.limit = data.info.limit

      self.query = data.query


    })
    

    self.onOrderChange = function(){

      var order = self.order

      if (order.contains('-'))
        order = self.order.replace('-', '') + ' ASC'
      
      else
        order = order + ' DESC'

      self.$get(1, self.limit, order)

    }


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

    }

    self.showHideMenu = () =>{

      $mdSidenav('listShowHideColumnsClientes')
          .toggle()

    }

  }
    
  }
}());
