(function () {
    'use strict';

    angular
        .module('SlApp')
        .controller('BrowseController', ['$scope', '$location', 'Auth', 'toastr', 'ShoppingList', '$firebaseObject', '$routeParams', 'ListItem', BrowseController]);

    function BrowseController($scope, $location, Auth, toastr, ShoppingList, $firebaseObject, $routeParams, ListItem){
        $scope.searchList = '';
        $scope.lists = ShoppingList.all;
        $scope.signedIn = Auth.signedIn;

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

        $scope.updateItem = function(item) {
            ListItem.updateItem($scope.selectedList.$id, item);
        };

        $scope.deleteItem = function (item) {
            ListItem.deleteItem($scope.selectedList.$id, item);
        };


        // Count Checked vs Unchecked
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

            }, true);
        }



    };

})();