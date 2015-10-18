'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:basicFiltrator
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="enterprise">
       <file name="index.html">
        <basic-filtrator></basic-filtrator>
       </file>
     </example>
   *
   */
  angular.module('enterprise').directive('basicFiltrator', basicFiltrator);

  function basicFiltrator() {
    return {
      restrict: 'EA',
      scope: {

        title: '@',

        model: '='

      },
      templateUrl: 'partials/basic-filtrator-directive.tpl.html',
      replace: false,
      controllerAs: 'basicFiltrator',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.showInput = false;

        this.parent = $scope.$parent.$parent;

        this.columns = self.parent.columns;

        this.icon = 'search';

        this.toggleSearch = function () {

          self.showInput = !self.showInput;

          self.icon = self.showInput ? 'cancel' : 'search';
        };

        this.search = function () {

          var query = {};

          query[self.searchBy] = {

            "contains": self.searchvalue

          };

          var config = {

            url: self.parent.source,

            query: 'where=' + JSON.stringify(query)

          };

          AppService.get(config).then(function (success) {

            $rootScope.$broadcast('filtered', success.data);
          });
        };
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
        // console.log(scope)
      }
    };
  }
})();
//# sourceMappingURL=basic-filtrator-directive.js.map
