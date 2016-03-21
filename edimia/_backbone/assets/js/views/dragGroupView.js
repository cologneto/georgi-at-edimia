define(['underscore', 'backbone', 'jqueryui', 'views/dragItem'], function(_, Backbone, ui, DragItem) {

    var DragGroupView = Backbone.View.extend({
        
        
        initialize: function() {
            this.render();
        },
                
        render: function() {
            var that = this;
            this.collection.each(function(drag) {
                console.log(drag.get('object'));
                var tmpView = new DragItem({model: drag});
                
                that.$el.append( tmpView.el );
                
            });
            
            //$( "#drag-targets > li" ).effect( "bounce", { times: 4 }, "slow" );
            $( "#drag-targets" );//.children().css({left:"100%"}).show().animate({left: 0}, 1000, "easeOutBounce")
            
            
            
//            var renderedContent = _.template( tpl, this.collection);
//            $(this.el).html(renderedContent);
            return this;
        }
    });

    return DragGroupView;

});