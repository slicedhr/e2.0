(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name enterprise.directive:defaultTemplate
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="enterprise">
       <file name="index.html">
        <default-template></default-template>
       </file>
     </example>
   *
   */
  angular
    .module('enterprise')
    .directive('defaultTemplate', defaultTemplate);

  function defaultTemplate() {
    return {

      restrict: 'EA',

      scope: {

        columns: '=',

        source: '@',

        design: '@',

        template: '@',

        title: '@',

        animation: '@',

        showSelectable: '='

      },

      templateUrl: 'partials/default-template-directive.tpl.html',

      transclude: true,

      replace: false,

      controllerAs: 'defaultTemplate',

      controller: function ($scope, $rootScope, AppService, $mdDialog) {

        var self = this;

        this.selected = []

        this.page = 1

        this.limit = 10

        this.base = $scope.source


        //Get

        this.$get = (page, limit) => {

          AppService
            .get({

              page: page,
              
              url: self.base,
              
              limit: limit

            })

            .then(success => {

              console.log(success)

              self.rows = []
              
              self.rows = success.data.results

              self.total = success.data.info.total

            })
            .catch(err => {

              console.log(err)

            })

        }


        this.$get(self.page, self.limit)


        //Show Form Edit/Create
        
        this.form = ($event, item) => {

          self.dataToForm = {}

          if (item){

            var options = {

              array: self.rows,

              condicion: { id: item.id }

            }

            var index = AppService.filter(options)

            self.dataToForm = self.rows[index];

            self.tempData = angular.copy(self.rows[index])

          };

          var dialog = {

            template: this.base+'/partials/form-dialog.tlp.html',

            scope: $scope,

            targetEvent: $event

          }

          AppService
            .showFormDialog(dialog)
            .then(data => {

              if (!item)
                self.rows.push(data)

            })
            .catch(err => {

              if( item && !angular.equals(angular.copy(item), self.tempData)) 
                self.rows[index] = self.tempData

            })

        }


        //Delete
        
        this.delete = (id, $event) => {

          var confirm = $mdDialog
                          .confirm()
                          .title('Confirmación')
                          .content('¿Realmente deseas eliminar este item?')
                          .ariaLabel('Delete Confirm')
                          .ok('Confirmar')
                          .cancel('Cancelar')
                          .targetEvent($event)

          $mdDialog
            .show(confirm)
            .then(() => {

              return AppService
                        .delete(self.base, id)

            })

            .then(response => {
                  
              var options = {

                array: self.rows,

                condicion: { id: response.data.id }

              }

              var index = AppService.filter(options)

              self.rows.splice(index, 1)

            })
            .catch(() => {

            })

        }

        this.getSelected = data => {
          console.log(self.selected)
        }

        //On filtered
        
        $rootScope.$on('filtered', ($event, data) => {

          self.rows = data.results

          self.total = data.info.total

          self.page = data.info.start + 1

          self.limit = data.info.limit

        })

      },
      link: function (scope, element, attrs, ctrl, transclude) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
