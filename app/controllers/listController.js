(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('ListController', ['$scope', '$routeParams', 'toastr', 'ShoppingList', 'Auth', ListController])

    function ListController($scope, $routeParams, toastr, ShoppingList, Auth){

        $scope.currentUser = Auth.user;

        $scope.lists = ShoppingList.all($scope.currentUser.uid);

        $scope.selectedListId = $routeParams.listId;


        $scope.editList = function (list) {
            ShoppingList.editList(list);
            toastr.info('Your list has been updated!');
        };



    };

})();