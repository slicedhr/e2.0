'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular.module('home').controller('HomeCtrl', HomeCtrl);

  function HomeCtrl(HomeService, $timeout, ReportesService, AppService) {

    var vm = this;

    vm.homedata = {};

    vm.graphicByDateCotizacionesData = [[0, 0, 0, 0, 0, 0, 0]];

    vm.graphicByDateCotizacionesLabels = ReportesService.daysOfWeek;

    vm.graphicByDateCotizacionesSeries = ['Total vendido por día'];

    vm.countTo = function (current, to, time) {

      if (current === to) return;else current += 1;

      $timeout(vm.countTo(current, to, time), time / to);
    };

    vm.getRep = function (value) {

      var config = {
        range: false,
        by: value, // week, month, year
        criteria: {
          vendido: vm.vendido,
          vendedor: vm.vendedor
        }
      };

      ReportesService.reporteVendidos(config).then(function (success) {

        console.log(success.data);

        vm.reporteTemporal = success.data;

        if (value === 'day') {

          var transform = ReportesService.groupDates(success.data, 'updatedAt', 'day');

          vm.graphicByDateCotizaciones = [transform.data];
        }

        if (value === 'month') {

          var transform = ReportesService.groupDates(success.data, 'updatedAt', 'month');

          vm.graphicByDateCotizaciones = [transform.data];
        }

        var transform = ReportesService.groupDates(success.data, 'updatedAt', 'thisMonth');

        // vm.graphicByDateCotizaciones = [transform.data]

        // vm.graphicByDateCotizacionesData = [monthTransform.data]

        console.log(transform);
      });
    };

    vm.getByDate = function () {

      var config = {
        range: true,
        from: vm.date.from,
        to: vm.date.to,
        criteria: {
          vendido: vm.vendido,
          vendedor: vm.vendedor
        }
      };

      ReportesService.reporteVendidos(config).then(function (success) {

        console.log(success);
      });
    };

    HomeService.getHomeData().then(function (response) {

      var data = response.data;

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

      };
    })['catch'](function (err) {
      return console.log(err);
    });
  }
})();
//# sourceMappingURL=home-controller.js.map
