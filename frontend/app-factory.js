(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name enterprise.factory:App
   *
   * @description
   *
   */
  angular
    .module('enterprise')
    .factory('AppService', AppService);

  function AppService($q, $http, $filter, $rootScope, $mdToast, $mdDialog, apiUrl) {

    var AppBase = {}, self = AppBase;


    // Set prefix to url
    
    AppBase.setPrefix = url => {

      return url.contains(apiUrl.serverUrl) ? url : apiUrl.prefix + url

    }


    // If server url then set server address & prefix
    
    AppBase.setServerUrl = (url, prefix = true) => {

      if (prefix)

        return url.contains(apiUrl.serverUrl) ? apiUrl.serverUrl + url : apiUrl.serverUrl + apiUrl.prefix + url
      
      else

        return apiUrl.serverUrl + '/' + url

    }


    // Filter Item By Condition
    
    AppBase.filter = options => {

      var filter = $filter('filter')(options.array, options.condicion || {}, true)[0];

      var index = options.array.indexOf(filter);

      return index

    }


    // Default Dialog

    AppBase.showFormDialog = options => {

       return $mdDialog.show({

        controller: DialogController,

        templateUrl: options.template,

        clickOutsideToClose: true,

        escapeToClose: true,

        scope: options.scope,

        preserveScope: true,

        parent: angular.element(document.body),

        disableParentScroll: true,

        targetEvent: options.targetEvent

      })


       function DialogController($rootScope, $mdDialog){

        $rootScope.$on('SavedInDialog', function($event, data){

          $mdDialog.hide(data);

        })

       }

    }


    // Broadcasting of data from Default Dialog
    
    AppBase.broadcastDialog = dialogData => {

      $rootScope.$broadcast('SavedInDialog', dialogData)

    }


    // Broadcasting of ERROR from Default Dialog
    
    AppBase.broadcastError = err => {

      $rootScope.$broadcast('ServerError', dialogData)

    }


    //Default HTTP CALL

    AppBase.http = config => {

      return $http(config);

    }


    // Add promise to HTTP Request 
    // In case of change route then the request they are cancelled

    AppBase.setConfig = config => {

      var deferred = $q.defer(), 
          promise = deferred.promise

      config.timeout = promise

      config.cancel = deferred

      $rootScope.deferredprogress = promise

      return config

    }


    // Get Initial Data

    AppBase.initialData = ( id, prefix = true ) => {

      var config = self.setConfig({

        url: self.setPrefix(`auth/initialdata?id=${id}`, prefix),

        method: 'GET',
        
      })

      return self.http(config)

    }


    // GET
    
    AppBase.get = (options) => {

      options.limit = options.limit || 20

      options.page = options.page || 1

      options.pagination = options.pagination || true

      var limit = options.limit * options.page

      var skip = options.page && ( options.page == 1 ) ? 0 : limit / options.page * ( options.page - 1)

      var order = options.order || 'id%20DESC'

      options.url += options.query ? '?' + options.query + '&' : options.pagination ? '?' : '' 

      options.url += options.pagination ? 'skip='+ skip + '&limit=' + limit + '&sort=' + order : ''
      console.log(options.url)

      var config = self.setConfig({

        url: self.setPrefix(options.url, options.prefix),

        method: 'GET',

      })

      return self.http(config)

    }


    // POST PUT
    AppBase.save = (data, url, prefix = true) => {

      var config = {

        url: self.setPrefix(url, prefix) + (data.id ? '/' + data.id : ''),

        data: data,

        method: data.id ? 'PUT' : 'POST'

      }

      return self.http(config)

    }

    //DELETE
    AppBase.delete = (url, id, prefix = true) => {

      url += '/' + id

      var config = self.setConfig({

        url: self.setPrefix(url, prefix),

        method: 'DELETE'

      })

      return self.http(config)

    }

    // RANDOM DESIGN
    AppBase.randomDesign = (toRoot = true) => {

        var from = 1

        var to = 10
            
        var random = self.getRandom(from, to)

        if (random == 9)
          random = self.getRandom(from, to)
        if (toRoot)
          $rootScope.generatedrandomdesign = 'design-' +  random

        return 'design-' +  random

    }

    AppBase.getRandom = (from, to) => {

      return Math.floor(Math.random(from, to) * to + 1)

    }
  
    return AppBase;
  }
}());
