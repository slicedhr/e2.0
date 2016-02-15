(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name iva.controller:IvaCtrl
   *
   * @description
   *
   */
  angular
    .module('iva')
    .controller('IvaCtrl', IvaCtrl);

  function IvaCtrl(AppService) {

    var self = this

    this.options = {

      data: AppService.dataModels.iva,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'iva-form'

    }
    
  }
}());
