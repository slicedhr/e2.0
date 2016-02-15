'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name categoriasproductos.controller:CategoriasproductosCtrl
   *
   * @description
   *
   */
  angular.module('categoriasproductos').controller('CategoriasproductosCtrl', CategoriasproductosCtrl);

  function CategoriasproductosCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.categoriasproductos,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'categoriasproductos-form'

    };
  }
})();
//# sourceMappingURL=categoriasproductos-controller.js.map
