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
  angular
    .module('productos')
    .directive('productosForm', productosForm);

  function productosForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'productos/productos-form-directive.tpl.html',
      replace: false,
      controllerAs: 'productosForm',
      controller: function ($scope, $rootScope, AppService) {
        
        var self = this;
          
        this.data = JSON.parse($scope.data) || { bodega: 1 }

        this.validations = [
          {
            key: 'categoria',
            required: true,
            title: 'Categoría'
          },
          {
            key: 'marca',
            required: true,
            title: 'Marca'
          },
          {
            key: 'tiemposdeentrega',
            required: true,
            title: 'Tiempo de entrega'
          },
          {
            key: 'unidad_de_medida',
            required: true,
            title: 'Unidad de medida'
          },
          {
            key: 'proveedor',
            required: true,
            title: 'Proveedor'
          },
          {
            key: 'proveedor2',
            required: false,
            title: 'Proveedor 2'
          },
        ]

        if ( Object.keys(self.data).length > 0 ){

          for (var i = 0; i < self.validations.length; i++){

            self.data['temp' + self.validations[i].key ] = self.data[self.validations[i].key]

            if (self.data[self.validations[i].key])
              self.data[self.validations[i].key] = self.data[self.validations[i].key].id

          }
        }

        this.source = 'productos'


        this.save = () => {

          var data = self.data,
              url = self.source

          for (var i = 0; i < self.validations.length; i++){

            if ( !self.data[ 'temp' + self.validations[i].key ] && self.validations[i].required ){

                self.validation = self.validations[i].title

                return
            }
            else
              self.validation = false
            

          }
          
          AppService
            .save(data, url)
            .then(success => {
              
                for (var i = 0; i < self.validations.length; i++)
                  success.data[ self.validations[i].key ] = self.data['temp' + self.validations[i].key]

                self.data.unidad_de_medida = self.data.tempunidad_de_medida.unidad

                $rootScope.$broadcast('saved:' + self.source, self.data)

            })
            .catch(err => {

              AppService.broadcastError(err)

            })

        }

        this.validateSelection = (field, item, unidad_de_medida) => {

          if (item){
            
            self.data[field] = item.id

            if (unidad_de_medida)
              
              self.data['unidad_de_medida'] = item.unidad

          }


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

            query: 'where=' + JSON.stringify(query),

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

      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
