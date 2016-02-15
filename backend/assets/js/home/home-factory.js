'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name home.factory:Home
   *
   * @description
   *
   */
  angular.module('home').factory('HomeService', HomeService);

  function HomeService($rootScope, AppService) {

    var HomeBase = {};

    HomeBase.urlHomeData = 'homedata';

    HomeBase.getHomeData = function (idUser) {

      var id = idUser || $rootScope.auth.user.id;

      var config = AppService.setConfig({

        url: AppService.setPrefix(HomeBase.urlHomeData) + '?id=' + id,

        method: 'GET'

      });

      return AppService.http(config);
    };

    return HomeBase;
  }
})();
//# sourceMappingURL=home-factory.js.map
