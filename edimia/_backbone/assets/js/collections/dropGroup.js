define(['underscore', 'backbone', 'models/dropItemModel'], function(_, Backbone, DropItemModel) {

    var DropGroup = Backbone.Collection.extend({

        model: DropItemModel,
        
        initialize: function() {
            
//            alert('collection');
            
            this.bind("change reset add remove", this.render, this);
        },
                
        render: function(e) {
            
        }
                
    });

    return DropGroup;

});