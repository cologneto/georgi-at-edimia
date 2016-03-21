var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-question", ".click-button-holder > div.checked"]
        });

        var aConfigClasses = [
            "c0-5-E1",
            "show-question question-block equation-50",
            "clickbuttons-two image-content-limit-45px img-motion-float-right"
        ];
        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: aConfigClasses.join(" ") }));
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
        
        exercise.getOperation();
        
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
        var oImg3 = new number_image({
            collection: "fruit",
            category: "still"
        });
        var oImg4 = new number_image({
            collection: "fruit",
            category: "still",
            type: oImg3.params.type,
            subtype: "minus"
        });
        
        $(".exe-container-question").data("value", eval(exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1]) );
    
        var imgstr = {plus: "", minus: ""};
        var i = 0;
        for (i=0; i<exercise.generated_numbers[0]; i++) {
            imgstr.plus += oImg1.html(1, "still");
        }
        for (i=0; i<exercise.generated_numbers[1]; i++) {
            imgstr.plus += oImg2.html(1, "motion");
        }
        for (i=0; i<exercise.generated_numbers[0] - exercise.generated_numbers[1]; i++) {
            imgstr.minus += oImg3.html(1, "still no-float no-margin");
        }
        for (i=0; i<exercise.generated_numbers[1]; i++) {
            imgstr.minus += oImg4.html(1, "still no-float no-margin");
        }
        
        $(".exe-container-question").html( twig({ref: "equation"}).render({
            num1: exercise.generated_numbers[0],
            imgstr1: exercise.generated_numbers[0],
            num2: exercise.generated_numbers[1],
            imgstr2: exercise.generated_numbers[1],
            mathSignOperator: exercise.params.operationSign
        }) );

        $(".exe-container-answer")
            .append($(twig({ref: "button"}).render({value: imgstr.plus, intvalue: exercise.generated_numbers[0] + exercise.generated_numbers[1] })).data( "value", exercise.generated_numbers[0] + exercise.generated_numbers[1] ))
            .append($(twig({ref: "button"}).render({value: imgstr.minus, intvalue: exercise.generated_numbers[0] - exercise.generated_numbers[1] })).data( "value", exercise.generated_numbers[0] - exercise.generated_numbers[1] ));
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