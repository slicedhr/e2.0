(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name clientes.directive:clientesForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="clientes">
       <file name="index.html">
        <clientes-form></clientes-form>
       </file>
     </example>
   *
   */
  angular
    .module('clientes')
    .directive('clientesForm', clientesForm);

  function clientesForm() {

    return {

      restrict: 'EA',

      scope: {

        data: '@'

      },

      templateUrl: 'clientes/clientes-form-directive.tpl.html',

      replace: false,

      controllerAs: 'clientesForm',

      controller: function ($scope, $rootScope, $mdToast, $filter, AppService) {
        
        var self = this;

        this.categoriasproductosArr = []

        this.categoriasclientesArr = []

        this.user = $rootScope.auth.user

        self.formValidate = true

        this.data = JSON.parse($scope.data) || {}

        this.data.bodega = 1

        this.data.categoriascliente = []

        this.buttonAddCategoriaActived = false

        this.categoriaProductoActived = false

        this.showSectionAddCategory = false

        this.validations = [
          {
            key: 'pais',
            required: true,
            title: 'País'
          },
          {
            key: 'ciudad',
            required: true,
            title: 'Ciudad'
          },
          {
            key: 'vendedor_asignado',
            required: true,
            title: 'Comercial'
          },
          {
            key: 'referido_por',
            required: false,
            title: 'Referido Por'
          },
          {
            key: 'categoria',
            required: true,
            title: 'Categoría'
          },
          
        ]

        if ( Object.keys(self.data).length > 0 )

          for (var i = 0; i < self.validations.length; i++){

            self.data['temp' + self.validations[i].key ] = self.data[self.validations[i].key]

            if (self.data[self.validations[i].key])

              self.data[self.validations[i].key] = self.data[self.validations[i].key].id

          }

          if (!this.data.pais){

            let pais = {

              id: 1,

              nombre: 'Colombia'

            }

            self.data.temppais = pais

            self.data.pais = pais

          }

          if (!self.data.vendedor_asignado && !self.user.permissions.asignar_clientes || !self.data.vendedor_asignado){

            self.data.tempvendedor_asignado = self.user

            self.data.vendedor_asignado = self.user.id

          }


        this.source = 'clientes'

        //save form
        this.save = () => {

          $rootScope.loading = true

          var data = self.data,
              url = 'clientes/crear'

          for (var i = 0; i < self.validations.length; i++){

            if ( !self.data[ 'temp' + self.validations[i].key ] && self.validations[i].required ){

                self.validation = self.validations[i].title

                return
            }
            else
              self.validation = false
            

          }

          if (self.data.categoriascliente.length){

            for (var i = 0; i < self.data.categoriascliente.length; i++) {

              self.data.categoriascliente[i].categoriacliente = self.data.categoriascliente[i].categoriacliente.id

              if (self.data.categoriascliente[i].categoriasproductos){

                self.data.categoriascliente[i].productos = [] 

                for (var j = 0; j < self.data.categoriascliente[i].categoriasproductos.length; j++) 

                  self.data.categoriascliente[i].productos.push(self.data.categoriascliente[i].categoriasproductos[j].id)
                
              }

            };

            AppService
              .save(data, url)
              .then(success => {
                
                self.data.id = success.data.id

                AppService.broadcastDialog(success.data)

                $rootScope.$broadcast('saved:cliente', success.data)


              })
              .catch(err => {

                AppService.broadcastError(err)

              })

          }
          else
            $mdToast.show(

              $mdToast.simple()

                .textContent('El cliente necesita al menos una categoría')
                .position('bottom right')
                .hideDelay(5000)

            );
            

        }

        this.validateSelection = (field, item) => {

          if (item)
            
            self.data[field] = item.id

          else

            return false

        }



        this.getAutocomplete = (text, field, source) => {
          
          var query = {}

          query[field] = {

            contains: text

          }

          var config = {

            url: source,

            query: 'where=' + JSON.stringify(query) + '&populate=false',

            order: field + ' ASC'

          }

          return AppService
                    .get(config)
                    .then(success => {

                      return success.data.results

                    })['catch'](err => {

                      AppService.broadcastError(err)

                    })
        }

        this.addCategory = () => {

          self.showSectionAddCategory = !self.showSectionAddCategory

        }

        this.deleteCategory = (item, isProductCategory = false) => {

          let array = isProductCategory ? self.categoriasproductosArr : self.data.categoriascliente

          let index = array.indexOf(item)

          array.splice(index, 1)

          self.buttonAddCategoriaActived = self.categoriasproductosArr.length ? true : false

        }

        this.validateSelectionCategoria = item => {

          self.buttonAddCategoriaActived = self.categoriasproductosArr.length ? true : false

          self.searchCategoriaProducto = null


          if (item){

            if ($filter('getByID')(self.categoriasproductosArr, item.id))

              return

            self.categoriasproductosArr.push(item)


          }
                    

        }

        this.selectCategoriaCliente = () => {

          if(self.selectedcategoriacliente.requireProduct){
            
            self.categoriaProductoActived = true
            
            self.buttonAddCategoriaActived = false

          }
            
          else{

            self.buttonAddCategoriaActived = true

            self.categoriasproductosArr = []

          }

        }

        this.addCategoriaToCliente = () => {

          let category = {

            categoriacliente: self.selectedcategoriacliente

          }

          if (self.categoriaProductoActived)

            category.categoriasproductos = self.categoriasproductosArr

          if (!$filter('getByID')(self.data.categoriascliente, self.selectedcategoriacliente))
            self.data.categoriascliente.push(category)

          self.categoriasproductosArr = []

          self.buttonAddCategoriaActived = false

          self.categoriaProductoActived = false

          self.showSectionAddCategory = false

          self.searchCategoriaProducto = null

          self.selectedcategoriacliente = null

        }

        this.validateNit = (ev) => {

          if (self.data.nit)

            AppService.http(AppService.setConfig({

              url: AppService.setPrefix(`clientes?nit=${self.data.nit}&populate=false`),

              method: 'GET'

            }))
            .then( success => {

              let data = success.data

              if (data.results.length > 0){

                self.formValidate = false

                 $mdToast.show(

                  $mdToast.simple()

                    .textContent(`Ya existe un cliente con esa identificación:  ${ data.results[0].razon_social }`)

                    .position('top left')

                    .hideDelay(5000)

                );

              }


              else
                self.formValidate = true

            })

          else
            self.formValidate = false

        }

        this.getCategoriasCliente = () => {

          self.categoriaProductoActived = false
            
          self.buttonAddCategoriaActived = false

          AppService.http(AppService.setConfig({

            url: AppService.setPrefix('categoriacliente?populate=false'),

            method: 'GET'

          }))
          .then(success => {
            
            self.categoriascliente = success.data.results

          })
        }


      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
