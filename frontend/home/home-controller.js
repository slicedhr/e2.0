(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl(HomeService, $timeout, ReportesService, AppService) {

    var vm = this;

    vm.homedata = {}

    vm.cotizaciones = {}

    vm.label = 'Total vendido por día'

    vm.graphicByDateCotizacionesData = [ [0,0,0,0,0,0,0] ]

    vm.graphicByDateCotizacionesLabels = ReportesService.daysOfWeek

    vm.graphicByDateCotizacionesSeries = [vm.label]


    vm.countTo = (current, to, time) => {

        if(current === to)
            return;

        else
          current += 1

        $timeout(vm.countTo(current, to, time), time/to);
    }

    vm.getRep = value => {

        var config = {
          range: false,
          by: value, // week, month, year
          criteria: {
            vendido: vm.cotizaciones.vendido,
            vendedor: vm.cotizaciones.vendedor
          }
        }

        ReportesService
          .reporteVendidos(config)
          .then(success => {

            Chart.defaults.global.tooltipTemplate = function(valueObj) {
              return formatNumber(valueObj.value, 2, ',',  '.');
            } 

            console.log(success.data)

            vm.reporteTemporal = success.data


            if (value === 'week'){

              var transform = ReportesService.groupDates(success.data, 'updatedAt', 'day')

              vm.graphicByDateCotizacionesData = [transform.data]

              vm.graphicByDateCotizacionesLabels = ReportesService.daysOfWeek

              vm.graphicByDateCotizacionesSeries = vm.cotizaciones.vendido ? ['Total vendido por día'] : ['Total no vendido por día'] 

            }

            if (value === 'month'){

              var transform = ReportesService.groupDates(success.data, 'updatedAt', 'month')

              vm.graphicByDateCotizacionesData = [transform.data]

              vm.graphicByDateCotizacionesLabels = ReportesService.months

              vm.graphicByDateCotizacionesSeries = vm.cotizaciones.vendido ? ['Total vendido por mes'] : ['Total no vendido por mes']


            }

            var transform = ReportesService.groupDates(success.data, 'updatedAt', 'thisMonth')

            // vm.graphicByDateCotizaciones = [transform.data]
          

            // vm.graphicByDateCotizacionesData = [monthTransform.data]


            console.log(transform)


          })

    }

    vm.getByDate = () => {

      var config = {
          range: true,
          from: vm.date.from,
          to: vm.date.to,
          criteria: {
            vendido: vm.cotizaciones.vendido,
            vendedor: vm.cotizaciones.vendedor
          }
        }

      ReportesService
          .reporteVendidos(config)
          .then(success => {

            console.log(success)


          })

    }


    HomeService

      .getHomeData()

      .then(function(response){

        let data = response.data
      
        // vm.homedata.totalclientes.value = data.totalclientes

        // vm.homedata.totalclientes.options.max = data.totalclientes

        

        vm.homedata.totalclientes = {

          value: data.totalclientes,

          options: {

            readOnly: true,

            min: 0,

            max: data.totalclientes,

            subText: {

              enabled: true,

              text: 'Total clientes'

            },

            skin: {

              type: 'tron',

              width: 5,

              color: '#494B52',

              spaceWidth: 3

            },
            step: 1,

            barColor: '#494B52',

            trackWidth: 30,

            barWidth: 30,

            textColor: '#494B52',

            animate: {

              enabled: true,

              duration: 3000,

              ease: 'cubic'

            },
            displayPrevious: true

          }

        }
        

      })

      .catch(err => console.log(err))


  }
}());
  