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
            "clickbuttons-two image-content-limit-100pc img-motion-float-right"
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
        var oImg1 = null, oImg2 = null, equations = [], imgstr = "", i = 0;
        
        equations.push( exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1] );
        if ( exercise.params.operation == "addition" ) {
            oImg1 = new number_image({
                collection: "animal",
                category: "still"
            });
            oImg2 = new number_image({
                collection: "animal",
                category: "motion",
                type: oImg1.params.type
            });
            for (i=0; i<exercise.generated_numbers[0]; i++) {
                imgstr += oImg1.html(1, "still");
            }
            for (i=0; i<exercise.generated_numbers[1]; i++) {
                imgstr += oImg2.html(1, "motion");
            }
            equations.push( _helper.randomFalseEquation(equations));
            exercise.params.operation = "subtraction";
            equations.push( _helper.randomFalseEquation(equations));
            equations.push( _helper.randomFalseEquation(equations));
        }
        else {
            oImg1 = new number_image({
                collection: "fruit",
                category: "still"
            });
            oImg2 = new number_image({
                collection: "fruit",
                category: "still",
                type: oImg1.params.type,
                subtype: "minus"
            });
            for (i=0; i<exercise.generated_numbers[0] - exercise.generated_numbers[1]; i++) {
                imgstr += oImg1.html(1, "still no-float no-margin");
            }
            for (i=0; i<exercise.generated_numbers[1]; i++) {
                imgstr += oImg2.html(1, "still no-float no-margin");
            }
            equations.push( _helper.randomFalseEquation(equations));
            exercise.params.operation = "addition";
            equations.push( _helper.randomFalseEquation(equations));
            equations.push( _helper.randomFalseEquation(equations));
        }
        equations - _helper.array_shuffle(equations);
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1] );
        
        $(".exe-container-question").html( imgstr );

        $(".exe-container-answer")
            .append($(twig({ref: "button"}).render({value: equations[0], intvalue: eval(equations[0]) })).data( "value", equations[0] ))
            .append($(twig({ref: "button"}).render({value: equations[1], intvalue: eval(equations[1]) })).data( "value", equations[1] ))
            .append($(twig({ref: "button"}).render({value: equations[2], intvalue: eval(equations[2]) })).data( "value", equations[2] ))
            .append($(twig({ref: "button"}).render({value: equations[3], intvalue: eval(equations[3]) })).data( "value", equations[3] ));
    },
    solve: function() {
        var correct = eval($(answer_analyser.params.selectors[0]).data("value"));
        $(".click-button-holder[data-value='"+correct+"'] > div").each(function() {
            if ( $.trim( $(this).html() ) == $(answer_analyser.params.selectors[0]).data("value") ) {
                $(this).addClass("correct");
            }
        });
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