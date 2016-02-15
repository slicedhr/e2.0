'use strict';

(function () {
  'use strict';

  angular.module('mediosdepago').config(config);

  function config($stateProvider) {
    $stateProvider.state('mediosdepago', {
      url: '/mediosdepago',
      templateUrl: 'mediosdepago/mediosdepago.tpl.html',
      controller: 'MediosdepagoCtrl',
      controllerAs: 'mediosdepago'
    });
  }
})();
//# sourceMappingURL=mediosdepago-routes.js.map
