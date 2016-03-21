var events = {
    selectable_boxes: function() {
        $("#exercise-content").on("click", ".answer-container,.number-image-holder", function(e) {
            $(this).toggleClass("selected");
        });
    }
};