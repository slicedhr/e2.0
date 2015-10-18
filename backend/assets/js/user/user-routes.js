'use strict';

(function () {
  'use strict';

  angular.module('user').config(config);

  function config($stateProvider) {
    $stateProvider.state('user', {
      url: '/user',
      templateUrl: 'user/user.tpl.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    });
  }
})();
//# sourceMappingURL=user-routes.js.map
