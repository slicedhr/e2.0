(function () {
  'use strict';

  angular
    .module('vigencia')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('vigencia', {
        url: '/vigencia',
        templateUrl: 'vigencia/vigencia.tpl.html',
        controller: 'VigenciaCtrl',
        controllerAs: 'vigencia'
      });
  }
}());
