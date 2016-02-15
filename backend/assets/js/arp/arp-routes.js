'use strict';

(function () {
  'use strict';

  angular.module('arp').config(config);

  function config($stateProvider) {
    $stateProvider.state('arp', {
      url: '/arp',
      templateUrl: 'arp/arp.tpl.html',
      controller: 'ArpCtrl',
      controllerAs: 'arp'
    });
  }
})();
//# sourceMappingURL=arp-routes.js.map
