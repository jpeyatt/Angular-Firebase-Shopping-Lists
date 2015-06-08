(function(){
    'use strict';

    angular
        .module('SlApp')
        .factory('ListItem', ['FURL', '$firebaseAuth', '$firebaseObject', '$firebaseArray', ListItem]);

    function ListItem(FURL, $firebaseAuth, $firebaseObject, $firebaseArray ){
        var ref = new Firebase(FURL + 'listItems');

        var ListItem = {

            items: function (listId) {
                return $firebaseArray(ref.child(listId));
            },

            addItem: function (listId, item) {
                var list_items = this.items(listId);
                item.checked = false;
                
                if (list_items) {
                    return list_items.$add(item);
                }
            },

            updateItem: function (listId, item) {
                var i = ref.child(listId).child(item.$id);
                return i.update({
                    checked: item.checked
                });
            },

            deleteItem: function(listId, item) {
                var i = ref.child(listId).child(item.$id);
                return i.remove();
            }

        };

        return ListItem;

    };

})();