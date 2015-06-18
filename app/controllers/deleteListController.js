(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('DeleteListController', ['$scope', '$location', 'toastr', 'ShoppingList', 'Auth', DeleteListController])

    function DeleteListController($scope, $location, toastr, ShoppingList){

        $scope.deleteList = function (list) {
            ShoppingList.deleteList(list);
            toastr.warning('Your list has been deleted!');
            $location.path('/browse')
        };

    };

})();