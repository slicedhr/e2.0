(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name clientes.directive:listCotizaciones
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="clientes">
       <file name="index.html">
        <list-cotizaciones></list-cotizaciones>
       </file>
     </example>
   *
   */
  angular
    .module('clientes')
    .directive('listCotizaciones', listCotizaciones);

  function listCotizaciones() {
    return {
      restrict: 'EA',
      scope: {
        cotizaciones: '='
      },
      templateUrl: 'clientes/list-cotizaciones-directive.tpl.html',
      replace: false,
      controllerAs: 'listCotizaciones',
      controller: function ($scope, $filter, $mdDialog) {

        var vm = this;

        vm.name = 'listCotizaciones';

        vm.sumar = (which = 'all') => {

          var filtered;

          var suma = 0;

          
          switch (which) {
            case 'all':
              filtered = $scope.cotizaciones; 
              break;
            case 'vendidos':
              filtered = $filter('filter')($scope.cotizaciones, { vendido: true });
              break;
            case 'novendidos':
              filtered = $filter('filter')($scope.cotizaciones, { vendido: false });
              break;
          }

          if (filtered.length)

            filtered.forEach( function(element, index) {

              for (var i = 0; i < element.detalle_total.length; i++)
                suma += ((((element.detalle_total[i].precio*element.detalle_total[i].utilidad_bruta)/100)+element.detalle_total[i].precio)*element.detalle_total[i].cantidad) - ((((((element.detalle_total[i].precio*element.detalle_total[i].utilidad_bruta)/100)+element.detalle_total[i].precio)*element.detalle_total[i].cantidad)*element.detalle_total[i].descuento)/100) + (((((((element.detalle_total[i].precio*element.detalle_total[i].utilidad_bruta)/100)+element.detalle_total[i].precio)*element.detalle_total[i].cantidad) - ((((((element.detalle_total[i].precio*element.detalle_total[i].utilidad_bruta)/100)+element.detalle_total[i].precio)*element.detalle_total[i].cantidad)*element.detalle_total[i].descuento)/100))*element.detalle_total[i].iva)/100)

            });
         
          return suma;

        }

        vm.sumaTodos = vm.sumar();
        vm.sumaVendidos = vm.sumar('vendidos');
        vm.sumaNoVendidos = vm.sumar('novendidos');

        vm.ver = (row, $event) => {

          $scope.data = row

          $mdDialog.show({
            
              controller: DialogController,

              templateUrl: 'clientes/ver-cotizacion.tpl.html',

              clickOutsideToClose: true,

              escapeToClose: true,

              scope: $scope,

              preserveScope: true,

              parent: angular.element(document.body),

              disableParentScroll: true,

              targetEvent: $event

          })
          .then(function(data) {
            
          }, function() {
            
          });


          function DialogController($scope, AppService){

            let idcotizacion = $scope.data.id;


            let config = {

              method: 'GET',

              url: AppService.setPrefix(`detallecotizacion?cotizacion=${idcotizacion}&populate=producto`)

            }

            $scope.setVendido = () => {

              AppService.http({
                method: 'PUT',
                url: AppService.setPrefix(`cotizaciones/${idcotizacion}`),
                data: {
                  vendido: true
                }
              })
              .then(success => {
                $scope.data.vendido = true
              })

            }

            $scope.sumar = arr => {
              let suma = 0;
        
              for (let i = 0; i < arr.length; i++)
                suma += ((((arr[i].precio*arr[i].utilidad_bruta)/100)+arr[i].precio)*arr[i].cantidad) - ((((((arr[i].precio*arr[i].utilidad_bruta)/100)+arr[i].precio)*arr[i].cantidad)*arr[i].descuento)/100) + (((((((arr[i].precio*arr[i].utilidad_bruta)/100)+arr[i].precio)*arr[i].cantidad) - ((((((arr[i].precio*arr[i].utilidad_bruta)/100)+arr[i].precio)*arr[i].cantidad)*arr[i].descuento)/100))*arr[i].iva)/100);
              
              return suma;

            }

            AppService
              .http(config)
              .then(response => {

                $scope.data.detalle_total = response.data.results;
                 
                console.log($scope)
              })

          }

        }
      
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
