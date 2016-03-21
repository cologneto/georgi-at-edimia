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
                else {
                    var z = $(ui.helper).offset().left - $(this).offset().left;
                    var y = $(ui.helper).offset().top - $(this).offset().top;

                    if ($(ui.helper).data("clone") === true) {
                        $(ui.helper).css({top: y, left: z}).appendTo($(this)).draggable({
                            stop: draggables.set_clones,
                            start: function(event, ui) {
                                $(this).removeClass("dropped");
                            }
                        });
                    }
                    else {
                        $(ui.helper).clone().data("clone", true).css({top: y, left: z}).appendTo($(this)).draggable({
                            stop: draggables.set_clones,
                            start: function(event, ui) {
                                $(this).removeClass("dropped");
                            }
                        });
                    }
                }
                
                $(ui.helper).addClass("dropped");

                droppables.params.dropcallback();

            }
        });
    }
}