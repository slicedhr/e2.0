'use strict';

(function () {
  'use strict';

  angular.module('tiemposdeentrega').config(config);

  function config($stateProvider) {
    $stateProvider.state('tiemposdeentrega', {
      url: '/tiemposdeentrega',
      templateUrl: 'tiemposdeentrega/tiemposdeentrega.tpl.html',
      controller: 'TiemposdeentregaCtrl',
      controllerAs: 'tiemposdeentrega'
    });
  }
})();
//# sourceMappingURL=tiemposdeentrega-routes.js.map
