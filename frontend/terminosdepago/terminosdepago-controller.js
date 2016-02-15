(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name terminosdepago.controller:TerminosdepagoCtrl
   *
   * @description
   *
   */
  angular
    .module('terminosdepago')
    .controller('TerminosdepagoCtrl', TerminosdepagoCtrl);

  function TerminosdepagoCtrl(AppService) {

    var self = this

    this.options = {

      data: AppService.dataModels.terminosdepago,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'terminosdepago-form'

    }
    
  }
}());
