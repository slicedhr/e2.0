(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name login.controller:LoginCtrl
   *
   * @description
   *
   */
  angular
    .module('login')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($http, $rootScope, $state, $mdToast, AuthService) {

    var self = this;

    this.init = function(){

      self.loginData = {

        email: 'arley.hr@hotmail.com',

        password: 'admin'

      }

    }

    this.logear = function(){

      AuthService.login(self.loginData).then(function(response){

        console.log(response)

        if(response.data.err && response.data.err === 'No coinciden'){

           $mdToast.show(

              $mdToast.simple()

                .textContent('Email y contraseña no coinciden!')

                .position('bottom right')

                .hideDelay(3000)

            );

           return
        }

        sessionStorage['JWT'] = response.data.token;

        $rootScope.auth.logged = true

        $rootScope.auth.user = response.data.user

        $state.transitionTo('home')

      }, function(err){

        $rootScope.$broadcast('AuthError')

      })
    }


    this.init()

  }
}());
