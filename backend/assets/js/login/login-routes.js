'use strict';

(function () {
  'use strict';

  angular.module('login').config(config);

  function config($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'login/login.tpl.html',
      controller: 'LoginCtrl',
      controllerAs: 'login',
      withoutAuthorization: true
    });
  }
})();
//# sourceMappingURL=login-routes.js.map
