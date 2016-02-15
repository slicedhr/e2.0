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

  function HomeCtrl(HomeService, $timeout) {

    var vm = this;

    vm.homedata = {}

    vm.countTo = (current, to, time) => {

        if(current === to)
            return;

        else
          current += 1

        $timeout(vm.countTo(current, to, time), time/to);
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
  