var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "substr_equation",
            selectors: [".exe-container-header", ".input-answer-holder"]
        });

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: "c0-5-D11"}));
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
            collection: "coin",
            category: "still",
            type: "kr"
        });
        var oImg2 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });
        
        $(".exe-container-header").data("value", exercise.generated_numbers[0] - exercise.generated_numbers[1]).html( 
            twig({ref: "imageholder"}).render() + 
            twig({ref: "imageholder"}).render() 
        );
        var i = 0;
        for (i=0; i<exercise.generated_numbers[0]; i++) {
            $(".number-image-holder:first").append( oImg1.html(1, "still") );
        }
        
        $(".number-image-holder:last").append( oImg2.html(1, "motion", exercise.generated_numbers[1]) );
        
        $(".exe-container-question").data("value", '').html(
            twig({ref: "equation"}).render({
                num1: exercise.generated_numbers[0],
                imgstr1: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}),
                num2: exercise.generated_numbers[1],
                imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}),
                mathSignOperator: exercise.params.operationSign
            })
        );
        $(".exe-container-answer").html(
            twig({ref: "answer"}).render() 
        );
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
    },
    solve: function() {
        exercise.clear(function() {
            $(answer_analyser.params.selectors[1]).each(function(k,v) {
                $(this).removeClass("wrong correct");
                if (k<2) {
                    $(this).find("input").val( exercise.generated_numbers[k] ).removeClass("clear");
                }
                else {    
                    $(this).find("input").val( exercise.generated_numbers[0] - exercise.generated_numbers[1] ).removeClass("clear");
                }
            });
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