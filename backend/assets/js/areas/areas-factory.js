'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name areas.factory:Areas
   *
   * @description
   *
   */
  angular.module('areas').factory('AreasService', AreasService);

  function AreasService(AppService) {

    var AreasBase = {};

    // AreasBase.get = url => {

    //   var config = AppService.setConfig({

    //     url: AppService.setPrefix(url),

    //     method: 'GET',

    //   })

    //   return AppService.http(config)

    // };

    return AreasBase;
  }
})();
//# sourceMappingURL=areas-factory.js.map
