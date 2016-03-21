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
            "c2D8",
            "layout no-header"
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
        
        var aAnswers = _helper.close_addends( exercise.generated_numbers[1] );
        
        $(".exe-container-question").data("value",exercise.generated_numbers[1]).html(
                    $( twig({ref: "equation"}).render({
                        classname: 'space-top',
                        num1class: 'has-text large',
                        num2class: 'has-text large',
                        num3class: 'has-text large',
                        mathSignOperator: '+',
                        imgstr3: exercise.generated_numbers[0], 
                        num3: exercise.generated_numbers[0],
                        imgstr1: exercise.generated_numbers[1], 
                        num1: exercise.generated_numbers[1],
                        imgstr2: exercise.generated_numbers[0] - exercise.generated_numbers[1],
                        num2: exercise.generated_numbers[0] - exercise.generated_numbers[1]
                        
                    }) )
                );
        
         $(".exe-container-question").data("value",exercise.generated_numbers[1]).append(
                    $( twig({ref: "equation"}).render({
                        classname: '',
                        num1class: 'has-text large',                        
                        num2class: 'has-text large',
                        mathSignOperator: '-',
                        imgstr1: exercise.generated_numbers[0], 
                        num1: exercise.generated_numbers[0],
                        imgstr2: exercise.generated_numbers[0] - exercise.generated_numbers[1],
                        num2: exercise.generated_numbers[0] - exercise.generated_numbers[1]
                        
                    }) )
                );

            $(".equation-container-full .math-sign-operator").addClass("large");
            $(".equation-container-full .math-sign-equal").addClass("large").html("=");
        
        $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({classname:"margin-top-120",value: aAnswers[0], intvalue: aAnswers[0] })).data( "value", aAnswers[0] ))
                .append($(twig({ref: "button"}).render({classname:"margin-top-120",value: aAnswers[1], intvalue: aAnswers[1] })).data( "value", aAnswers[1] ))
                .append($(twig({ref: "button"}).render({classname:"margin-top-120",value: aAnswers[2], intvalue: aAnswers[2] })).data( "value", aAnswers[2] ));                
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
