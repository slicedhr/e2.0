(function () {
  'use strict';

  angular
    .module('dianretefuente')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dianretefuente', {
        url: '/dianretefuente',
        templateUrl: 'dianretefuente/dianretefuente.tpl.html',
        controller: 'DianretefuenteCtrl',
        controllerAs: 'dianretefuente'
      });
  }
}());
