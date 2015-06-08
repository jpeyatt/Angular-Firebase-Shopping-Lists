(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('ListController', ['$scope', '$location', 'toastr', 'ShoppingList', 'Auth', ListController])
        .filter('UserFilter', ['$scope', 'Auth', UserFilter]);

    function ListController($scope, $location, toastr, ShoppingList, Auth){

        $scope.currentUser = Auth.user;

        $scope.createList = function (list) {
            list.createdBy = $scope.currentUser.profile.email;
            ShoppingList.createList(list);
            toastr.info('Your list has been created!');
        };

        $scope.editList = function (list) {
            ShoppingList.editList(list);
            toastr.info('Your list has been updated!');
        };

        $scope.deleteList = function (list) {
            ShoppingList.deleteList(list);
            toastr.warning('Your list has been deleted!');
            $location.path('/browse')
        }

    };

    function UserFilter($scope, Auth){
        $scope.currentUser = Auth.user;
        return function(list){
            return list.createdBy === $scope.currentUser.profile.email;
        };
    };

})();