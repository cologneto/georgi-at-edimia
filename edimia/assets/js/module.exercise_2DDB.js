var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "equalselectors",
            selectors: [".equation-num-right .input-answer-holder", ".math-sign-equal" ,".equation-num-result .input-answer-holder", ".exe-container-question"]
        });
        
        var aConfigClasses = [
            "c2DDB",
            "layout no-header no-answer"
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
        
        exercise.generated_numbers = [_helper.rangeRandom(exercise.params.min,exercise.params.max)];
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0]).html( 
            twig({ref: "equation"}).render({                
                num1class: "has-text large",               
                num1: exercise.generated_numbers[0], 
                imgstr1: exercise.generated_numbers[0], 
                imgstr2: twig({ref: "answer"}).render(),                
                imgstr3: twig({ref: "answer"}).render(),            
                mathSignOperator: exercise.params.operationSign
            }) 
        );
    
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen: 2}) );
        
        $(".equation-container-full .math-sign-operator").text("=");
        $(".equation-container-full .math-sign-equal").text("-").data("value", "-");
        $(".equation-container-full .math-sign").addClass("large");
    },

    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[3]).data("value");
            var equat = _helper.randomEquationSubtraction(correct);
            var equat_arr = equat.split("-");
            $(answer_analyser.params.selectors[0]).removeClass("wrong correct");
            $(answer_analyser.params.selectors[2]).removeClass("wrong correct");
            $(answer_analyser.params.selectors[0]).find("input").val( equat_arr[0] ).removeClass("clear");
            $(answer_analyser.params.selectors[2]).find("input").val( equat_arr[1] ).removeClass("clear");
        });
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[0]).addClass("correct");
        $(answer_analyser.params.selectors[2]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[0]).addClass("wrong");
        $(answer_analyser.params.selectors[2]).addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(answer_analyser.params.selectors[0]).find("input").addClass("clear");  
            $(answer_analyser.params.selectors[2]).find("input").addClass("clear");
        }
        else {
            $(answer_analyser.params.selectors[0]).removeClass("wrong");
            $(answer_analyser.params.selectors[2]).removeClass("wrong");
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
