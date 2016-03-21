var progress = {
    
    params: {
        total: 10,
        current: 1
    },
    
    init: function() {
        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                progress.params[k] = v;
            });
        }
        this.render();
    },
    
    render: function() {
        $(".wizard-steps").html('');
        var status = "";
        for (var i=0; i < this.params.total; i++) {
            if (i < progress.params.current) {
                status = "complete";
            }
            else if (i == progress.params.current) {
                status = "active";
            }
            else {
                status = "";
            }
            $(".wizard-steps").append( twig({ref: "progressindicator"}).render({status: status}) );
        }
        exercise.data.totalEx = $(".wizard-steps").find("li").length;
    },
    
    next: function() {
        $(".wizard-steps").find("li").eq( progress.params.current ).toggleClass("active complete");
        progress.params.current++;
        $(".wizard-steps").find("li").eq( progress.params.current ).addClass("active");
    },
    
    reset: function() {
        $(".wizard-steps").find("li").removeClass("active complete").eq(0).addClass("active");
    }
}