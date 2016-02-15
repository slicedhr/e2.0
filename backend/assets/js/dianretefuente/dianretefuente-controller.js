'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name dianretefuente.controller:DianretefuenteCtrl
   *
   * @description
   *
   */
  angular.module('dianretefuente').controller('DianretefuenteCtrl', DianretefuenteCtrl);

  function DianretefuenteCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.dianretefuente,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'dianretefuente-form'

    };
  }
})();
//# sourceMappingURL=dianretefuente-controller.js.map
