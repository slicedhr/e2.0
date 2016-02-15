'use strict';

(function () {
  'use strict';

  angular.module('terminosdepago').config(config);

  function config($stateProvider) {
    $stateProvider.state('terminosdepago', {
      url: '/terminosdepago',
      templateUrl: 'terminosdepago/terminosdepago.tpl.html',
      controller: 'TerminosdepagoCtrl',
      controllerAs: 'terminosdepago'
    });
  }
})();
//# sourceMappingURL=terminosdepago-routes.js.map
