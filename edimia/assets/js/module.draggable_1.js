var draggables = {
    params: {
        selector: "",
        containment: "document",
        revert: false,
        clone: false,
        revertAppendTo: "#page-wrapper",
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

            },
            revert: draggables.revertcallback
        });
    },

    revertcallback: function() {

        if (draggables.params.revert === true) {
            
            if ( ! $(this).hasClass("dropped") ) {
                
                var c = $( draggables.params.revertAppendTo );
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
                
                return false;//!$(this).hasClass("dropped");
            }
        }

    }
}