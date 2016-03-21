var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }
        
        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-question", ".input-answer-holder"]
        });
        
        var aConfigClasses = [
            "c0-5-A2",
            "layout no-header auto-height padding-side"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render( ));
            $("#page-wrapper-inner").addClass( aConfigClasses.join(" ") );
            exercise.getData(function() {
                exercise.set();
                if (exercise.params.callback) {
                    exercise.params.callback();
                }
            });
        });
    },
    set: function() {
        exercise_global.clear_canvas();

        _helper.randomPair();

        var oImg1 = new number_image({
            collection: "animal",
            category: "still"
        });
        var oImg2 = new number_image({
            collection: "animal",
            category: "motion",
            type: oImg1.params.type
        });
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1]).html( twig({ref: "imageholder"}).render({classname: "full-width"}) );
        var i = 0;
        for (i=0; i<exercise.generated_numbers[0]; i++) {
            $(".number-image-holder").append( oImg1.html(1, "still") );
        }
        for (i=0; i<exercise.generated_numbers[1]; i++) {
            $(".number-image-holder").append( oImg2.html(1, "motion") );
        }
        
        $(".exe-container-answer").data("value", '0').html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
    },
    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");
            $(answer_analyser.params.selectors[1]).removeClass("wrong correct");
            $(answer_analyser.params.selectors[1]).find("input").val( correct ).removeClass("clear");
        });
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(answer_analyser.params.selectors[1]).find("input").addClass("clear");
        }
        else {
            $(answer_analyser.params.selectors[1]).removeClass("wrong");
        }
    }
}

for (var sAttributeName in exercise_global) {
    if (exercise[sAttributeName]) {
        alert("Exercise object already has '" + sAttributeName + "' implemented.\n\nPlease consider rewriting that code");
    }
    else {
        exercise[sAttributeName] = exercise_global[sAttributeName];
    }
}