(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('AuthController', ['$scope', '$location', 'Auth', 'toastr', AuthController]);

    function AuthController($scope, $location, Auth, toastr){


        if (Auth.signedIn()) {
            $location.path('/');
        }

        $scope.register = function (user) {
            Auth.register(user).then(function () {
                $location.path('/');
                toastr.info('Your are now registered!');
            }, function(err){
                toastr.error('Oops! Your registration has failed.');
            });
        };

        $scope.login = function(user) {
            Auth.login(user)
                .then(function(){
                    $location.path('/');
                    toastr.info('Your are now logged in!');
                }, function(err){
                    toastr.error('Oops! Your login has failed.');
                });
        };

        $scope.changePassword = function(user){
            Auth.changePassword(user)
                .then(function(){

                    // Reset form
                    $scope.user.email = '';
                    $scope.user.oldPass = '';
                    $scope.user.newPass = '';

                    console.log("Password changed successfully!");

                }, function(err){
                    toastr.error('Oops! ' + err);
                });
        };


    };

})();