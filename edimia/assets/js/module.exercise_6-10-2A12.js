var exercise = {
    
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
            "c6-10-2A12",
            "layout no-header no-answer auto-height padding-side"
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

        exercise.params.min = 6;
        _helper.randomPair();        
        exercise.params.min = 0;
        
        var choice = _helper.randomBit() ? 1 : 2;
  
        if(choice == 1)
        {
            $(".exe-container-question").data("value",exercise.generated_numbers[1]).html(
                    $( twig({ref: "equation"}).render({
                        classname: '',
                        num1class: 'has-text large',
                        num3class: 'has-text large',
                        mathSignOperator: '=',
                        imgstr1: exercise.generated_numbers[0] + exercise.generated_numbers[1],
                        imgstr2: twig({ref: "answer"}).render(),   
                        imgstr3: exercise.generated_numbers[0]
                    }) )
                );
            $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );
            
        }else{
            $(".exe-container-question").data("value",exercise.generated_numbers[1]).html(
                    $( twig({ref: "equation"}).render({
                        classname: '',
                        num2class: 'has-text large',
                        num3class: 'has-text large',
                        mathSignOperator: '=',
                        imgstr1: twig({ref: "answer"}).render(), 
                        imgstr2: exercise.generated_numbers[0],
                        imgstr3: exercise.generated_numbers[0] + exercise.generated_numbers[1]                         
                        
                    }) )
                );
            $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );
        }
        
        $(".equation-container-full .math-sign-operator").addClass("large").html("+");
        $(".equation-container-full .math-sign-equal").addClass("large").html("=");
        
        
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