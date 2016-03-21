define(['underscore', 'backbone', 'models/dragItemModel'], function(_, Backbone, DragItemModel) {

    var DragGroup = Backbone.Collection.extend({

        model: DragItemModel,
        
        initialize: function() {
            
//            alert('collection');
            
            this.bind("change reset add remove", this.render, this);
        },
                
        render: function(e) {
            
        }
                
    });

    return DragGroup;

});