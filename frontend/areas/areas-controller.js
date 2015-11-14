(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name areas.controller:AreasCtrl
   *
   * @description
   *
   */

  function AreasCtrl(AppService) {

    var self = this

    this.options = {

      data: AppService.dataModels.areas,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'areas-form'

    }
    
  }

  angular
    .module('areas')
    .controller('AreasCtrl', AreasCtrl);

}());
