'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name ciudades.directive:ciudadesForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="ciudades">
       <file name="index.html">
        <ciudades-form></ciudades-form>
       </file>
     </example>
   *
   */
  angular.module('ciudades').directive('ciudadesForm', ciudadesForm);

  function ciudadesForm() {
    return {
      restrict: 'EA',
      scope: {
        data: '@'
      },
      templateUrl: 'ciudades/ciudades-form-directive.tpl.html',
      replace: false,
      controllerAs: 'ciudadesForm',
      controller: function controller($scope, $rootScope, AppService) {

        var self = this;

        this.data = JSON.parse($scope.data) || {};

        this.validations = [{
          key: 'pais',
          required: true,
          title: 'País'
        }];

        if (Object.keys(self.data).length > 0) {

          for (var i = 0; i < self.validations.length; i++) {

            self.data['temp' + self.validations[i].key] = self.data[self.validations[i].key];

            self.data[self.validations[i].key] = self.data[self.validations[i].key].id;
          }
        }

        this.source = AppService.dataModels.ciudades.info.source;

        this.save = function () {

          var data = self.data,
              url = self.source;

          for (var i = 0; i < self.validations.length; i++) {

            if (!self.data['temp' + self.validations[i].key] && self.validations[i].required) {

              self.validation = self.validations[i].title;

              return;
            } else self.validation = false;
          }

          console.log(self.data);

          // AppService
          //   .save(data, url)
          //   .then(success => {

          //       for (var i = 0; i < self.validations.length; i++)
          //         success.data[ self.validations[i].key ] = self.data['temp' + self.validations[i].key]

          //       AppService.broadcastDialog(success.data)

          //       $rootScope.$broadcast('saved:' + self.source, success.data)

          //   })
          //   .catch(err => {

          //     AppService.broadcastError(err)

          //   })
        };

        this.validateSelection = function (field, item) {

          if (item) self[field] = item.id;else return false;
        };

        this.getAutocomplete = function (text, field, source) {

          var query = {};

          query[field] = {

            contains: text

          };

          var config = {

            url: source,

            query: 'where=' + JSON.stringify(query)

          };

          return AppService.get(config).then(function (success) {

            return success.data.results;
          })['catch'](function (err) {

            AppService.broadcastError(err);
          });
        };
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=ciudades-form-directive.js.map
