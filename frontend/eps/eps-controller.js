(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name eps.controller:EpsCtrl
   *
   * @description
   *
   */
  angular
    .module('eps')
    .controller('EpsCtrl', EpsCtrl);

  function EpsCtrl(AppService) {

    var self = this

    this.options = {

      data: AppService.dataModels.eps,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'eps-form'

    }
    
  }
}());
