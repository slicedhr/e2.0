(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name arp.controller:ArpCtrl
   *
   * @description
   *
   */
  angular
    .module('arp')
    .controller('ArpCtrl', ArpCtrl);

  function ArpCtrl() {
    var vm = this;
    vm.ctrlName = 'ArpCtrl';
  }
}());
