'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name ciudades.controller:CiudadesCtrl
   *
   * @description
   *
   */
  angular.module('ciudades').controller('CiudadesCtrl', CiudadesCtrl);

  function CiudadesCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.ciudades,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'ciudades-form'

    };
  }
})();
//# sourceMappingURL=ciudades-controller.js.map
