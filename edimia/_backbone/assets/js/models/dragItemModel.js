define(['underscore', 'backbone'], function(_, Backbone) {

    var DragItemModel = Backbone.Model.extend({
        defaults: {
            object: "",
            top: 0
        },
        initialize: function() {
            
        },
        validate: function(attrs) {
            
        }
    });

    return DragItemModel;

});