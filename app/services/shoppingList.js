(function(){
    'use strict';

    angular
        .module('SlApp')
        .factory('ShoppingList', ['FURL', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'Auth', ShoppingList]);

    function ShoppingList(FURL, $firebaseAuth, $firebaseObject, $firebaseArray, Auth){
        var user = Auth.user;
        var ref = new Firebase(FURL + 'shoppingLists');
        // var userid = user.uid.toString();
        var shoppingLists =  $firebaseArray(ref);

        var ShoppingList = {

            all: function(userId){
                return $firebaseArray(ref.orderByChild('createdBy').equalTo(userId));
            },
            //all: shoppingLists,

            getList: function(listId){
                return ref.child(listId);
            },

            createList: function(list){
                list.datetime = Firebase.ServerValue.TIMESTAMP;
                return shoppingLists.$add(list);
            },

            editList: function(list){
                var l = this.getList(list.$id);
                return l.update({
                    title: list.title,
                    store: list.store,
                    description: list.description
                });
            },

            deleteList: function (list) {
                var l = this.getList(list.$id);
                return l.remove();
            },

            isCreator: function (list) {
                return (user && user.provider && user.uid == list.poster);
            },

            isComplete: function (list) {
                return list.status === 'complete';
            }

        };

        return ShoppingList;

    };

})();