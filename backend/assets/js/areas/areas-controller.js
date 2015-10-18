'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name areas.controller:AreasCtrl
   *
   * @description
   *
   */

  function AreasCtrl($scope, AppService, $mdDialog) {

    this.columns = [{
      title: 'Area',
      key: 'area',
      selected: true,
      show: true
    }];
  }

  angular.module('areas').controller('AreasCtrl', AreasCtrl);
})();
//# sourceMappingURL=areas-controller.js.map
