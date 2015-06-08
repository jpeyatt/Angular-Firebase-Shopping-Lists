(function(){
    'use strict';

    angular

        .module('SlApp', [
            'ngRoute',
            'ngAnimate',
            'ngResource',
            'firebase',
            'toastr',
            'angularMoment'
        ])

        .constant('FURL', 'https://ngshoppinglist.firebaseio.com/')

        .config(['$routeProvider', function($routeProvider){

            $routeProvider.
                when('/home', {
                    templateUrl: 'app/views/home.html'
                }).
                when('/browse', {
                    templateUrl: 'app/views/browse.html',
                    controller: 'BrowseController'
                }).
                when('/browse/:listId', {
                    templateUrl: 'app/views/browse.html',
                    controller: 'BrowseController'
                }).
                when('/register', {
                    templateUrl: 'app/views/auth/register.html',
                    controller: 'AuthController'
                }).
                when('/login', {
                    templateUrl: 'app/views/auth/login.html',
                    controller: 'AuthController'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }])

})();