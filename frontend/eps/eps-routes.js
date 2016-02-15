(function () {
  'use strict';

  angular
    .module('eps')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('eps', {
        url: '/eps',
        templateUrl: 'eps/eps.tpl.html',
        controller: 'EpsCtrl',
        controllerAs: 'eps'
      });
  }
}());
