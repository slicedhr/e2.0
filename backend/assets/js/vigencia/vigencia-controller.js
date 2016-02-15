'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name vigencia.controller:VigenciaCtrl
   *
   * @description
   *
   */
  angular.module('vigencia').controller('VigenciaCtrl', VigenciaCtrl);

  function VigenciaCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.vigencia,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'vigencia-form'

    };
  }
})();
//# sourceMappingURL=vigencia-controller.js.map
