'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name otrosimpuestos.controller:OtrosimpuestosCtrl
   *
   * @description
   *
   */
  angular.module('otrosimpuestos').controller('OtrosimpuestosCtrl', OtrosimpuestosCtrl);

  function OtrosimpuestosCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.otrosimpuestos,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'otrosimpuestos-form'

    };
  }
})();
//# sourceMappingURL=otrosimpuestos-controller.js.map
