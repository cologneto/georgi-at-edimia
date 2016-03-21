define(['underscore', 'backbone', 'jqueryui', 'views/dropItem'], function(_, Backbone, ui, DropItem) {

    var DropGroupView = Backbone.View.extend({
        
        
        initialize: function() {
            this.render();
        },
                
        render: function() {
            var that = this;
            this.collection.each(function(drop) {

                var tmpView = new DropItem({model: drop});
                
                that.$el.append( tmpView.el );
                
            });
            
//            $( "#drop-area > li" ).effect( "bounce", { times: 4 }, "slow" );
            $( "#drop-area > div" ).css({left:"-100%", position: "relative"}).show().animate({left: 0}, 750, "easeOutBounce");
            
            return this;
        }
    });

    return DropGroupView;

});