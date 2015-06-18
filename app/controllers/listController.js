(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('ListController', ['$scope', '$location', 'toastr', 'ShoppingList', 'Auth', ListController])

    function ListController($scope, $location, toastr, ShoppingList, Auth){

        $scope.currentUser = Auth.user;

        $scope.lists = ShoppingList.all($scope.currentUser.uid);

        $scope.createList = function (list) {
            list.createdBy = Auth.user.uid;
            ShoppingList.createList(list);
            toastr.info('Your list has been created!');
        };

        $scope.editList = function (list) {
            ShoppingList.editList(list);
            toastr.info('Your list has been updated!');
        };



    };

})();