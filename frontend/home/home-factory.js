(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name home.factory:Home
   *
   * @description
   *
   */
  angular
    .module('home')
    .factory('HomeService', HomeService);

  function HomeService($rootScope, AppService) {

    let HomeBase = {};

    HomeBase.urlHomeData = 'homedata'

    HomeBase.getHomeData = idUser => {

      let id = idUser || $rootScope.auth.user.id


      let config = AppService.setConfig({

        url: AppService.setPrefix(HomeBase.urlHomeData) + '?id=' + id,

        method: 'GET',

      })

      return AppService.http(config)

    }

    return HomeBase;

  }
}());
