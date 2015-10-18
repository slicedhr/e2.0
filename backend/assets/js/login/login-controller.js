'use strict';

(function () {
        'use strict';

        /**
         * @ngdoc object
         * @name login.controller:LoginCtrl
         *
         * @description
         *
         */
        angular.module('login').controller('LoginCtrl', LoginCtrl);

        function LoginCtrl($http, $rootScope, $state, AuthService) {

                var self = this;

                this.init = function () {

                        self.loginData = {

                                email: 'arley.hr@hotmail.com',

                                password: 'admin'

                        };
                };

                this.logear = function () {

                        AuthService.login(self.loginData).then(function (response) {

                                sessionStorage['JWT'] = response.data.token;

                                $rootScope.auth.logged = true;

                                $rootScope.auth.user = response.data.user;

                                $state.transitionTo('home');
                        }, function (err) {});
                };

                this.init();
        }
})();
//# sourceMappingURL=login-controller.js.map
