(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('CreateListController', ['$scope', '$location', 'toastr', 'ShoppingList', 'Auth', CreateListController])

    function CreateListController($scope, $location, toastr, ShoppingList, Auth){

        $scope.createList = function (list) {
            list.createdBy = Auth.user.uid;
            ShoppingList.createList(list);
            $('#postModal').modal('hide');
            toastr.info('Your list has been created!');
        };

    };

})();