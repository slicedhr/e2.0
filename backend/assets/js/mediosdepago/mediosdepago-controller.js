'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name mediosdepago.controller:MediosdepagoCtrl
   *
   * @description
   *
   */
  angular.module('mediosdepago').controller('MediosdepagoCtrl', MediosdepagoCtrl);

  function MediosdepagoCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.mediosdepago,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'mediosdepago-form'

    };
  }
})();
//# sourceMappingURL=mediosdepago-controller.js.map
