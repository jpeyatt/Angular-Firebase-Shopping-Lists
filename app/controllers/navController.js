(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('NavController', ['$scope', '$location', 'Auth', 'toastr', 'ShoppingList', NavController]);

    function NavController($scope, $location, Auth, toastr, ShoppingList){

        $scope.currentUser = Auth.user;
        $scope.signedIn = Auth.signedIn;

        $scope.logout = function(){
            Auth.logout();
            $location.path('/');
            toastr.warning('Your are now logged out.');
        };

    };

})();