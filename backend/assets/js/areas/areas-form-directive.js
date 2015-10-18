'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name areas.directive:areasForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="areas">
       <file name="index.html">
        <areas-form></areas-form>
       </file>
     </example>
   *
   */
  angular.module('areas').directive('areasForm', areasForm);

  function areasForm() {
    return {
      restrict: 'EA',
      scope: {
        area: '='
      },
      templateUrl: 'areas/form-directive.tpl.html',
      replace: false,
      controllerAs: 'areasForm',
      controller: function controller($scope, AppService) {

        var self = this;

        self.area = $scope.$parent.defaultTemplate.dataToForm || {};

        self.save = function () {

          var data = self.area,
              url = 'areas';

          AppService.save(data, url).then(function (success) {

            AppService.broadcastDialog(success.data);
          })['catch'](function (err) {

            AppService.broadcastError(err);
          });
        };
      },
      link: function link(scope, element, attrs) {}
    };
  }
})();
//# sourceMappingURL=areas-form-directive.js.map
