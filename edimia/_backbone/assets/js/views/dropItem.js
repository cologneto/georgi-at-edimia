define([
    'underscore', 
    'backbone', 
    'jqueryui',
    'text!templates/dropTarget/type1.html'
], function(_, Backbone, ui, DropTargetTemplate) {

    var DragItem = Backbone.View.extend({
        tagName: "div",
        className: "drop-target",
        initialize: function() {
            
            this.render();
        },
        render: function() {

//            $(this.el).html(this.model.get("object"));

            var template = _.template( DropTargetTemplate );
            this.$el.html(template);

            this.$el.find("div.drophere").droppable({
                accept: ".answer-drag",
                hoverClass: "accept",
                drop: function(event, ui) {
                    
//                    $(this).addClass("done");
                    
                    $(ui.helper).addClass("dropped");
                    $(ui.helper).appendTo( ".mainview" );
                    
                    var p = $(this).offset();
                    $(ui.helper).animate({left: (p.left + $(this).width()/2 - $(ui.helper).width()/2)+"px", top: (p.top + $(this).height()/2 - $(ui.helper).height()/2)}, 300);
                }
            });
        }
    });

    return DragItem;

});