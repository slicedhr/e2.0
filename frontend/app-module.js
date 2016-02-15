
String.prototype.contains = function(it) { 

  return this.indexOf(it) != -1; 

};


Array.prototype.asyncForEach = function (each, done) {

    var i = -1, a = this;

    function iter() {

      if (++i === a.length) { done && done(); return; }

      each.call(a, a[i], iter);

    }

    iter();

};

(function () {
  'use strict';

  /* @ngdoc object
   * @name enterprise
   * @description
   *
   */
  
    function AppConfig(jwtInterceptorProvider, $httpProvider, $locationProvider){

      $locationProvider.html5Mode(true)

      jwtInterceptorProvider.tokenGetter = () => {

        return sessionStorage['JWT'];

      }
       
      $httpProvider.interceptors.push('jwtInterceptor');

      $httpProvider.interceptors.push('ErrorInterceptor');

    }

    function RunApp($rootScope, $log, AuthService, AppService, $http, $state, $mdToast, CancelableHttpService){

      $rootScope.auth = {}


  /////// Events


     


      //On route start Change
      
      $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {

        if (toState != fromState)
          CancelableHttpService.cancelAll()

        // Generate random design
        $rootScope.generatedDesign = AppService.randomDesign()

        $rootScope.toState = toState

        $rootScope.fromState = fromState

        //Cancel pending requests
        
        angular.forEach($http.pendingRequests, (request) => {

            if (request.cancel && request.timeout)

               request.cancel.resolve();
             
        });

        //Is logged not allow to change to login state
        if (angular.equals(toState.name, 'login') && sessionStorage['JWT']){

          if(angular.equals(fromState.name, ''))
            $state.transitionTo('home')

          e.preventDefault()
          
        }

        if ( angular.equals(fromState.name, 'login') && angular.equals(toState.name,'home') )
          $rootScope.$broadcast('initialData', true)


        //Isnt login
        
        if (!toState.withoutAuthorization && !sessionStorage['JWT']){

          AppService.clearSession();

          e.preventDefault();

          $state.transitionTo('login')

        }


      })

      //On Change Completed
    
      $rootScope.$on('$stateChangeSuccess', (event, next, current) => {

      })

        //Handle AuthError

      $rootScope.$on('AuthError', (something) => {

        $log.warn('AuthError')

        if (sessionStorage['JWT']) delete sessionStorage['JWT']

        $rootScope.auth.logged = false

        $state.transitionTo('login')

      })

        //Handdle server error
      $rootScope.$on('ServerError', (something) => {

        console.info(something)

        $mdToast.show(

          $mdToast.simple()

            .textContent('Al parecer ocurrió un error.!')
            .position('bottom left')
            .hideDelay(5000)

        );


      })


    }


    function AppCtrl($rootScope, $scope, $timeout, $mdDialog, AppService, AuthService, $mdSidenav){

      var self = this

      this.selectedMainTab = 1

      this.activatedmenu = false

      this.loading = false

      if (sessionStorage['JWT']){

        AuthService.verify().then( response => {

          $rootScope.auth.user = response.data.user

          $rootScope.$broadcast('initialData')

        }, err => {

          alert('Ocurrio un error! \r\n Detalle: \r\n '+JSON.stringify(err))

        })
          
      }
      else
        $rootScope.$broadcast('AuthError')

      $scope.mainMenuSettings = {
        closeEl: '.close',
        modal: {
           templateUrl: 'partials/main-menu.tpl.html',
           position: {
            top: '0%',
            left: '0%'
           },
           fade: true
         }
      }

      this.generateDesign = title => {

        self.titletab = title

        self.design = AppService.randomDesign(false)

      }

      //Get Initial data
        
      this.getInitialData = () => {

          AppService
            .initialData( $rootScope.auth.user.id )
            .then( response => {


              self.initData = response.data
              console.log(self.initData)

            }, () => {
              console.log('error')
            })
      }

      this.openNotificationsSideNav = tab => {

        $timeout( () => {
          self.selectedMainTab = tab
        })

        $mdSidenav('profilenotifications')
          .toggle()
          .then(function(){
          });
      }

      
      //ROOTSCOPE FUNCTIONS
      //
      
      $rootScope.generatedDesign = AppService.randomDesign()

      $rootScope.slug = (input) => {

        return input.replace(/[\/\s]+/gi,'-')

      }

      $rootScope.$on('initialData', ($event, data) => {

        self.getInitialData()

      })

       // When is loading
      
      $rootScope.$on('cfpLoadingBar:loading', data => {

        self.loading = true

      })

      // On load completed

      $rootScope.$on('cfpLoadingBar:completed', data => {

        self.loading = false

      })

    }

    function SlideAnimation() {

      return {

          enter: function (element, done) {

            console.log('enter');

              element.hide().slideDown(600, done);

          },

          move: function(element, done) {

              console.log('move');

              element.slideUp(600, done);

          },
          leave: function(element, done) {

              console.log('leave');

              element.slideUp(600, done);

          }
      };

  }


    angular
    .module('enterprise', [
      'md.data.table',
      'ngMaterial',
      'ngMorph',
      'ngAnimate',
      'angular-jwt',
      'angular-loading-bar',
      'ngMdIcons',
      'ui.router',
      'anim-in-out',
      'perfect_scrollbar',
      'angular-svg-round-progress',
      'pasvaz.bindonce',
      'headroom',
      'ui.tinymce',
      'ui.knob',
      'home',
      'login',
      'user',
      'areas',
      'arp',
      'eps',
      'dianretefuente',
      'iva',
      'mediosdepago',
      'marcas',
      'otrosimpuestos',
      'terminosdepago',
      'tiemposdeentrega',
      'vigencia',
      'paises',
      'ciudades',
      'categoriasproductos',
      'productos',
      'cotizaciones',
      'clientes'
    ])
    .controller('AppCtrl', AppCtrl)

    .animation('.slide', SlideAnimation)

    .config(AppConfig)

    .filter('renderHTML', $sce => {
      return stringToParse => {
        return $sce.trustAsHtml(stringToParse);
      }
    }
       )

    .run(RunApp);

}());
