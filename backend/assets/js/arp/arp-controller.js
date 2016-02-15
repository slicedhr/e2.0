'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name arp.controller:ArpCtrl
   *
   * @description
   *
   */
  angular.module('arp').controller('ArpCtrl', ArpCtrl);

  function ArpCtrl(AppService) {

    var self = this;

    this.options = {

      data: AppService.dataModels.arp,

      animation: 'fadeLeft',

      showSelectable: false,

      template: 'arp-form'

    };
  }
})();
//# sourceMappingURL=arp-controller.js.map
