'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name productos.controller:ProductosCtrl
   *
   * @description
   *
   */
  angular.module('productos').controller('ProductosCtrl', ProductosCtrl);

  function ProductosCtrl(AppService, $rootScope, $scope) {

    var self = this;

    this.selected = [];

    this.page = 1;

    this.limit = 10;

    this.base = 'productos';

    this.title = 'Productos';

    this.templateForm = 'productos-form';

    this.search = {

      icon: 'search',

      toggleSearch: function toggleSearch() {

        self.search.showInput = !self.search.showInput;

        self.search.icon = self.search.showInput ? 'cancel' : 'search';
      },

      fire: function fire(data) {
        var categoria = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        var query = {};

        query[self.search.by] = categoria ? data : {

          "contains": data

        };

        query = 'where=' + JSON.stringify(query);

        console.log(query);

        self.page = 1;

        var config = {

          url: self.base,

          query: query,

          page: self.page,

          limit: self.limit

        };

        AppService.get(config).then(function (success) {

          var data = success.data;

          data.query = query;

          $rootScope.$broadcast('filtered', data);
        });
      },

      columns: [{
        key: 'categoria',
        title: 'Categoría',
        selected: true
      }, {
        key: 'nombre',
        title: 'Nombre'
      }, {
        key: 'referencia',
        title: 'Referencia'
      }]

    };

    //Get

    this.$get = function (page, limit, order) {

      AppService.scrollToTop('#mainContent');

      AppService.get({

        page: page,

        url: self.base,

        limit: limit,

        query: self.query || undefined,

        order: order || undefined

      }).then(function (success) {

        self.rows = [];

        self.rows = success.data.results;

        self.total = success.data.info.total;
      })['catch'](function (err) {

        console.log(err);
      });
    };

    this.$get(self.page, self.limit);

    //GET CATEGORIAS
    AppService.get({

      page: 0,

      url: 'categoriasproductos',

      limit: 100,

      order: 'nombre_categoria ASC'

    }).then(function (success) {

      self.categoriasproductos = success.data.results;
    })['catch'](function (err) {

      console.log(err);
    });

    //Show Form Edit/Create

    this.form = function ($event, item) {
      var duplication = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      self.dataToForm = {};

      if (item && !duplication) {

        var options = {

          array: self.rows,

          condicion: { id: item.id }

        };

        var index = AppService.filter(options);

        self.dataToForm = self.rows[index];

        self.tempData = angular.copy(self.rows[index]);
      };

      if (duplication) {

        self.dataToForm = angular.copy(item);

        delete self.dataToForm.id;

        delete self.dataToForm.$hashKey;
      }

      var dialog = {

        scope: $scope,

        targetEvent: $event,

        dataToForm: self.dataToForm,

        title: self.title,

        source: self.base,

        template: self.templateForm

      };

      AppService.showFormDialog(dialog).then(function (data) {

        if (data) {

          if (item && angular.equals(angular.copy(item), self.tempData) && !duplication) self.rows[index] = data;

          if (!item || duplication) self.rows.push(data);
        }
      })['catch'](function (err) {});
    };

    //Delete

    this['delete'] = function ($event, id) {

      AppService.deleteDialog($event).then(function () {
        return AppService['delete'](self.base, id);
      }).then(function (response) {

        var options = {

          array: self.rows,

          condicion: { id: response.data.id }

        };

        var index = AppService.filter(options);

        self.rows.splice(index, 1);

        $('.scroller').scrollTop($('.scroller').scrollTop + 1);
      })['catch'](function () {});
    };

    this.getSelected = function (data) {

      console.log(self.selected);
    };

    this.keysToString = function (keys, obj) {

      if (!keys.contains('>')) return obj[keys];else {

        var keys = keys.split('>');

        var temp = obj;

        for (var i = 0; i < keys.length; i++) temp = temp[keys[i]];

        return temp;
      }
    };

    //On filtered

    $rootScope.$on('filtered', function ($event, data) {

      AppService.scrollToTop('#mainContent');

      self.rows = data.results;

      self.total = data.info.total;

      self.page = data.info.start + 1;

      self.limit = data.info.limit;

      self.query = data.query;
    });

    self.onOrderChange = function () {

      var order = self.order;

      if (order.contains('-')) order = self.order.replace('-', '') + ' ASC';else order = order + ' DESC';

      self.$get(1, self.limit, order);
    };
  }
})();
//# sourceMappingURL=productos-controller.js.map
