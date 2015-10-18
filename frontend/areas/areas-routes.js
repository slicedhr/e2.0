(function () {
  'use strict';

  angular
    .module('areas')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('areas', {
        url: '/areas',
        templateUrl: 'areas/areas.tpl.html',
        controller: 'AreasCtrl',
        controllerAs: 'areas'
      });
  }
}());
