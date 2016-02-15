'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name tiemposdeentrega.controller:TiemposdeentregaCtrl
   *
   * @description
   *
   */
  angular.module('tiemposdeentrega').controller('TiemposdeentregaCtrl', TiemposdeentregaCtrl);

  function TiemposdeentregaCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.tiemposdeentrega,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'tiemposdeentrega-form'

    };
  }
})();
//# sourceMappingURL=tiemposdeentrega-controller.js.map
