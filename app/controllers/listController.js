(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('ListController', ['$scope', '$location', 'toastr', 'ShoppingList', ListController]);

    function ListController($scope, $location, toastr, ShoppingList){

        $scope.createList = function (list) {
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

})();