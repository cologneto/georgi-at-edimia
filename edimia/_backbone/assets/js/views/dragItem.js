define(['underscore', 'backbone', 'jqueryui'], function(_, Backbone, ui) {

    var DragItem = Backbone.View.extend({

        tagName: "div",
        className: "answer-drag",
        
        initialize: function() {

            
            this.render();
        },
                
        render: function() {
//            var template = _.template("T");
//            this.$el.html(template);

            this.$el.html( this.model.get("object") ).css({ top: this.model.get("top") + "px" });
            this.$el.draggable({
                containment: ".mainview",
                start: function() {
                    if (!$(this).attr("data-pos")) {
                        $(this).attr("data-pos", JSON.stringify( $(this).position() ));
                    }
                    $(this).removeClass("dropped");
                },
                revert: function() {
                    console.log("Revert: " + $(this).hasClass("dropped"));
                    if ( ! $(this).hasClass("dropped") ) {
                        var p = JSON.parse( $(this).attr("data-pos") );
                        $(this).animate({left: p.left+"px", top: p.top+"px"});
                    }
                    return false;//!$(this).hasClass("dropped");
                }
            });
        }
    });

    return DragItem;

});