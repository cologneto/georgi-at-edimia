var exercise = {
    
    init: function() {
 
        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-header", ".click-button-holder > div.checked"]
        });

        var aConfigClasses = [
            "c0-5-d1",
            ""
        ];



        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render( ));
            $("#page-wrapper-inner").addClass( aConfigClasses.join(" "));
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
        var aAnswers = _helper.close_solutions_single();
        
        var oImg1 = new number_image({
            collection: "fruit",
            category: "still"
        });
        var oImg2 = new number_image({
            collection: "fruit",
            category: "still",
            type: oImg1.params.type,
            subtype: "minus"
        });
        
        $(".exe-container-header").data("value", exercise.generated_numbers[0] - exercise.generated_numbers[1]).html( twig({ref: "imageholder"}).render({classname: " full-width"}) );
        var i = 0;
        for (i=0; i<exercise.generated_numbers[0] - exercise.generated_numbers[1]; i++) {
            $(".number-image-holder").append( oImg1.html(1, "still max-height80") );
        }
        for (i=0; i<exercise.generated_numbers[1]; i++) {
            $(".number-image-holder").append( oImg2.html(1, "max-height80") );
        }
        
        $(".exe-container-question").html( twig({ref: "equation"}).render({
            classname: "layout-1111 same-width centered",
            num1class: "has-text large",
            num2class: "has-text large",
            num1: exercise.generated_numbers[0],
            imgstr1: exercise.generated_numbers[0],
            num2: exercise.generated_numbers[1],
            imgstr2: exercise.generated_numbers[1],
            mathSignOperator: exercise.params.operationSign
        }) );

        $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({value: aAnswers[0], intvalue: aAnswers[0], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[0] ))
                .append($(twig({ref: "button"}).render({value: aAnswers[1], intvalue: aAnswers[1], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[1] ))
                .append($(twig({ref: "button"}).render({value: aAnswers[2], intvalue: aAnswers[2], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[2] ));
    },
    solve: function() {
        var correct = $(answer_analyser.params.selectors[0]).data("value");
        $(".click-button-holder[data-value='"+correct+"'] > div").addClass("correct");
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
        $(".click-button-holder > div.checked.wrong").removeClass("wrong correct");
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