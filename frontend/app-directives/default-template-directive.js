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

        design: '@',

        options: '='

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

        this.base = $scope.options.data.info.source

        this.scrollToTop = () => {

          $("#mainContent")
            .stop()
            .animate({

              scrollTop: 0

            }, '800', 'swing');

       }


        //Get

        this.$get = (page, limit) => {

          self.scrollToTop()

          AppService
            .get({

              page: page,
              
              url: self.base,
              
              limit: limit,

              query: self.query || undefined

            })

            .then(success => {

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
        
        this.form = ($event, item, duplication = false) => {

          self.dataToForm = {}

          if (item && !duplication){

            var options = {

              array: self.rows,

              condicion: { id: item.id }

            }

            var index = AppService.filter(options)

            self.dataToForm = self.rows[index];

            self.tempData = angular.copy(self.rows[index])

          };

          if (duplication){

            self.dataToForm = angular.copy(item)

            delete self.dataToForm.id

            delete self.dataToForm.$hashKey

          }

          var dialog = {

            scope: $scope,

            targetEvent: $event

          }

          AppService
            .showFormDialog(dialog)
            .then( data => {


             if (data){

              if( item && angular.equals(angular.copy(item), self.tempData) && !duplication)
                self.rows[index] = data

              if ( !item || duplication)
                self.rows.push(data)

             }


            })
            .catch(err => {


            })

        }


        //Delete
        
        this.delete = ($event, id) => {

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

              $('.scroller').scrollTop($('.scroller').scrollTop + 1)

            })
            .catch(() => {

            })

        }

        this.getSelected = data => {

          console.log(self.selected)

        }

        this.keysToString = (keys, obj) => {

          if (!keys.contains('>'))
            return obj[keys]

          else{

            var keys = keys.split('>')

            var temp = obj

            for (var i = 0; i < keys.length; i++)
              temp = temp[ keys[ i ] ]

            return temp

        }

      }

        

        //On filtered
        
        $rootScope.$on('filtered', ($event, data) => {

          self.scrollToTop()

          self.rows = data.results

          self.total = data.info.total

          self.page = data.info.start + 1

          self.limit = data.info.limit

          self.query = data.query


        })

        //On Deferred
        
        $rootScope.$on('deferred', ($event, data) => {
          self.deferred = data.promise
        })



      },
      link: function (scope, element, attrs, ctrl, transclude) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }

    };

  }

}());
