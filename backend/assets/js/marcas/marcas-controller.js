'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name marcas.controller:MarcasCtrl
   *
   * @description
   *
   */
  angular.module('marcas').controller('MarcasCtrl', MarcasCtrl);

  function MarcasCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.marcas,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'marcas-form'

    };
  }
})();
//# sourceMappingURL=marcas-controller.js.map
