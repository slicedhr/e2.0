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
  angular
    .module('enterprise')
    .directive('basicFiltrator', basicFiltrator);

  function basicFiltrator() {
    return {
      restrict: 'EA',
      scope: {

        title: '@',

        model: '=',

      },
      templateUrl: 'partials/basic-filtrator-directive.tpl.html',
      replace: false,
      controllerAs: 'basicFiltrator',
      controller: function ($scope, $rootScope, AppService) {

        var self = this;

        this.showInput = false

        this.parent = $scope.$parent.$parent

        this.columns = self.parent.options.data.columns

        this.icon = 'search'

        this.toggleSearch = () => {

          self.showInput = !self.showInput

          self.icon = self.showInput ? 'cancel' : 'search'

        }
        console.log(self)

        this.search = () => {

          self.query = {}

          self.query[self.searchBy] = {

            "contains" : self.searchvalue

          }

          console.log(self.query)

          self.query = 'where=' + JSON.stringify(self.query)

          var config = {

            url: self.parent.options.data.info.source,

            query: self.query,

            page: self.parent.defaultTemplate.page,

            limit: self.parent.defaultTemplate.limit

          }

          AppService
            .get(config)
            .then( success => {

              var data = success.data

              data.query = self.query

              $rootScope.$broadcast('filtered', data)

            })

        }

      

      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
        // console.log(scope)
      }
    };
  }
}());
