'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name paises.controller:PaisesCtrl
   *
   * @description
   *
   */
  angular.module('paises').controller('PaisesCtrl', PaisesCtrl);

  function PaisesCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.paises,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'paises-form'

    };
  }
})();
//# sourceMappingURL=paises-controller.js.map
