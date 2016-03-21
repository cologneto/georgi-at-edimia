var droppables = {
    params: {
        selector: "",
        accept: ".answer-drag",
        centerContent: true,
        dropcallback: function() {
        }
    },
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                droppables.params[k] = v;
            });
        }

        $(this.params.selector).droppable({
            accept: this.params.accept,
            hoverClass: "accept",
            drop: function(event, ui) {

                if (droppables.params.centerContent) {
                    
                    if ( $(this).find( ".dragbox" ).length > 0 ) {
                        
                        var db = $(this).find( ".dragbox" );
                        var m = $(db).offset().left - $(".drag-answer-container").offset().left;
                        var n = $(db).offset().top - $(".drag-answer-container").offset().top;

                        $(db).css({
                            top: n,
                            left: m,
                            right: "auto"
                        });
                        $(db).detach().appendTo( ".drag-answer-container" ).removeClass("dropped");
                        var pos = $(db).data("position");
                        $(db).stop().animate({
                            left: pos.left, //$(".drag-answer-container").width() / 2 - $(db).width() / 2,
                            top: pos.top    //$(".drag-answer-container").height() / 2 - $(db).height() / 2
                        }, 300);
                    }
                    
                    var z = $(ui.helper).offset().left - $(this).offset().left;
                    var y = $(ui.helper).offset().top - $(this).offset().top;
                    $(ui.helper).css({
                        top: y,
                        left: z,
                        right: "auto"
                    });
                    
                    $(ui.helper).detach().appendTo($(this));
                    
                    $(ui.helper).stop().animate({
                        left: $(this).width() / 2 - $(ui.helper).width() / 2,
                        top: $(this).height() / 2 - $(ui.helper).height() / 2

                    }, 300);
                }
                
                $(ui.helper).addClass("dropped");

                droppables.params.dropcallback();

            }
        });
    }
}