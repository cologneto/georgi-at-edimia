var draggables = {
    params: {
        selector: "",
        containment: "document",
        revert: false,
        clone: false
    },
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                draggables.params[k] = v;
            });
        }

        $(this.params.selector).draggable({
            containment: this.params.containment,
            helper: this.params.clone ? "clone" : "original",
            zIndex: 100,
            stack: this.params.selector,
            appendTo: "#page-wrapper-inner",
            create: function() {
                $(this).data("position", $(this).position());
            },
            start: function(event, ui) {
                $(this).removeClass("dropped");
            },
            stop: function(event, ui) {

                if (typeof($(ui.helper).attr("force-remove")) != "undefined" && $(ui.helper).attr("force-remove") == "yes") {
                    $(ui.helper).remove();
                    return;
                }
                if ($(ui.helper).hasClass("dropped") ) {
                    $(ui.helper).remove();
                }
                else {
                    $(ui.helper).clone(true).data("clone", true).appendTo("#page-wrapper-inner").draggable({
                        zIndex: 1000,
                        stop: draggables.set_clones,
                        start: function(event, ui) {
                            $(this).removeClass("dropped");
                        }
                    });
                    if ( typeof(exercise.count_drops) == "function" ) {
                        exercise.count_drops();
                    }
                }
            },
            revert: draggables.revertcallback
        });
    },
    set_clones: function(event, ui) {
        if ( ! $(ui.helper).hasClass("dropped")) {
            var z = $(ui.helper).offset().left - $("#page-wrapper-inner").offset().left;
            var y = $(ui.helper).offset().top - $("#page-wrapper-inner").offset().top;
            $(ui.helper).detach().css({top: y, left: z}).appendTo("#page-wrapper-inner");
            
            if ( typeof(exercise.count_drops) == "function" ) {
                exercise.count_drops();
            }
        }
    },
    revertcallback: function() {
        
        if (draggables.params.revert == true) {
            if (!$(this).hasClass("dropped")) {
                var c = $("#page-wrapper");
                var z = $(this).offset().left - c.offset().left;
                var y = $(this).offset().top - c.offset().top;
                $(this).css({
                    top: y,
                    left: z,
                    right: "auto"
                });

                $(this).removeClass("dropped").detach().appendTo(c);

                var p = $(this).data("position");
                $(this).animate({left: p.left + "px", top: p.top + "px"});
            }
            return false;//!$(this).hasClass("dropped");
        }
        else {

//            return false;
        }
    }
}