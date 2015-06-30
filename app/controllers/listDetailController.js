(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('ListDetailController', ['$scope', '$location', 'Auth', 'toastr', 'ShoppingList', '$firebaseObject', '$routeParams', 'ListItem', ListDetailController]);

    function ListDetailController($scope, $location, Auth, toastr, ShoppingList, $firebaseObject, $routeParams, ListItem){
        $scope.searchList = '';
        // $scope.lists = ShoppingList.all;
        $scope.signedIn = Auth.signedIn;
        $scope.currentUser = Auth.user;

        //var profileRef = new Firebase('https://ngshoppinglist.firebaseio.com/profile');

        $scope.authData =  '';

        $scope.listDetailsLoading = true;

        if ($routeParams.listId) {
            var list = $firebaseObject(ShoppingList.getList($routeParams.listId));
            setSelectedList(list);
        };

        function setSelectedList(list) {
          $scope.selectedList = list;

            if($scope.signedIn){
                $scope.isListCreator = ShoppingList.isCreator;
                $scope.isComplete = ShoppingList.isComplete;
            }
            $scope.items = ListItem.items(list.$id);


        };

        $scope.editList = function (list) {
            ShoppingList.editList(list);
            $('#editModal').modal('hide');
            toastr.info('Your list has been updated!');
        };

        $scope.deleteList = function (list) {
            ShoppingList.deleteList(list);
            $('#deleteModal').modal('hide');
            toastr.warning('Your list has been deleted!');
            $location.path('/browse');
            $('#your-modal-id').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };


        // Create List Item
        $scope.addItem = function () {
            var item = {
                name: $scope.newItem.name,
                qty: $scope.newItem.qty
            };

            ListItem.addItem($scope.selectedList.$id, item).then(function () {
                $scope.newItem.name = '';
                $scope.newItem.qty = '';
            });
        };

        // Update List Item
        $scope.updateItem = function(item) {
            ListItem.updateItem($scope.selectedList.$id, item);
        };

        // Delete List Item
        $scope.deleteItem = function (item) {
            ListItem.deleteItem($scope.selectedList.$id, item);
        };

        // Count Checked List Items vs Unchecked
        if ($scope.selectedList){
            $scope.$watch('items', function(){
                var total = 0;
                var remaining = 0;

                $scope.items.forEach(function(item) {

                    if (!item || !item.name){
                        return;
                    }

                    total++;

                    if (item.checked === false) {
                        remaining++
                    }

                });

                $scope.totalCount = total;
                $scope.remainingCount = remaining;
                $scope.completedCount = total - remaining;
                $scope.allChecked = remaining === 0;

                $scope.listDetailsLoading = false;

            }, true);
        }

    };

})();