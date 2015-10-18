(function () {
  'use strict';

  angular
    .module('enterprise')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
