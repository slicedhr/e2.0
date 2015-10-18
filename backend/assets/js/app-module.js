'use strict';

String.prototype.contains = function (it) {

      return this.indexOf(it) != -1;
};

(function () {
      'use strict';

      /* @ngdoc object
       * @name enterprise
       * @description
       *
       */

      function AppConfig(jwtInterceptorProvider, $httpProvider, $locationProvider) {

            $locationProvider.html5Mode(true);

            jwtInterceptorProvider.tokenGetter = function () {

                  return sessionStorage['JWT'];
            };

            $httpProvider.interceptors.push('jwtInterceptor');

            $httpProvider.interceptors.push('ErrorInterceptor');
      }

      function RunApp($rootScope, $log, AuthService, AppService, $http, $state, $mdToast) {

            $rootScope.auth = {};

            /////// Events

            // When is loading

            $rootScope.$on('cfpLoadingBar:loading', function (data) {

                  $rootScope.loading = true;
            });

            // On load completed

            $rootScope.$on('cfpLoadingBar:completed', function (data) {

                  $rootScope.loading = false;
            });

            //On route start Change

            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

                  // Generate random design
                  $rootScope.generatedDesign = AppService.randomDesign();

                  $rootScope.toState = toState;

                  $rootScope.fromState = fromState;

                  //Cancel pending requests

                  angular.forEach($http.pendingRequests, function (request) {

                        if (request.cancel && request.timeout) request.cancel.resolve();
                  });

                  //Is logged not allow to change to login state
                  if (angular.equals(toState.name, 'login') && sessionStorage['JWT']) {

                        if (angular.equals(fromState.name, '')) $state.transitionTo('home');

                        e.preventDefault();
                  }

                  if (angular.equals(fromState.name, 'login') && angular.equals(toState.name, 'home')) $rootScope.$broadcast('initialData', true);

                  //Isnt login

                  if (!toState.withoutAuthorization && !sessionStorage['JWT']) {

                        AppService.clearSession();

                        e.preventDefault();

                        $state.transitionTo('login');
                  }
            });

            //On Change Completed

            $rootScope.$on('$stateChangeSuccess', function (event, next, current) {});

            //Handle AuthError

            $rootScope.$on('AuthError', function (something) {

                  $log.warn('AuthError');

                  if (sessionStorage['JWT']) delete sessionStorage['JWT'];

                  $rootScope.auth.logged = false;

                  $state.transitionTo('login');
            });

            //Handdle server error
            $rootScope.$on('ServerError', function (something) {

                  console.info(something);

                  $mdToast.simple().content('Ocurrio un error en el servidor.!').position('bottom left');
            });
      }

      function AppCtrl($rootScope, $scope, $timeout, AppService, AuthService, $mdSidenav) {

            var self = this;

            this.activatedmenu = false;

            $rootScope.generatedDesign = AppService.randomDesign();

            $rootScope.$on('initialData', function ($event, data) {

                  self.getInitialData();
            });

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
            };

            this.generateDesign = function (title) {

                  self.titletab = title;

                  self.design = AppService.randomDesign(false);
            };

            //Get Initial data

            this.getInitialData = function () {

                  AppService.initialData($rootScope.auth.user.id).then(function (response) {

                        self.initData = response.data;
                  }, function () {
                        console.log('error');
                  });
            };

            if (sessionStorage['JWT']) {

                  AuthService.verify().then(function (response) {

                        $rootScope.auth.user = response.data.user;

                        self.getInitialData();
                  }, function (err) {

                        alert('Ocurrio un error! \r\n Detalle: \r\n ' + JSON.stringify(err));
                  });
            }

            this.openNotificationsSideNav = function (tab) {

                  $timeout(function () {
                        self.selectedMainTab = tab;
                  });
                  $mdSidenav('profilenotifications').toggle().then(function () {});
            };
      }

      angular.module('enterprise', ['md.data.table', 'ngMaterial', 'ngMorph', 'ngAnimate', 'angular-jwt', 'angular-loading-bar', 'ngMdIcons', 'ui.router', 'anim-in-out', 'perfect_scrollbar', 'home', 'login', 'user', 'areas', 'arp']).controller('AppCtrl', AppCtrl).config(AppConfig).run(RunApp);
})();
//# sourceMappingURL=app-module.js.map
