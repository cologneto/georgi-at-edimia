var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            numpairs: exercise.params.number_pairs,          
            selectors: [".exe-container-question",".input-answer-holder"]
        });
        
        var aConfigClasses = [
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
        exercise.params.min = 6;
        _helper.randomPair();
        
        var max , answ;
        
        if(exercise.generated_numbers[0] > exercise.generated_numbers[1]){
            max = exercise.generated_numbers[0];
            answ = max - _helper.rangeRandom(0,max);
            exercise.generated_numbers[0] = exercise.generated_numbers[0] - answ;
        }else{
            max = exercise.generated_numbers[1];
            answ = max - _helper.rangeRandom(0,max);
            exercise.generated_numbers[1] = exercise.generated_numbers[1] - answ;
        };
         exercise.params.min = 0;
        
        
        $(".exe-container-question").data("value", answ ).html( 
           $(   twig({ref: "equation"}).render({
                classname: "layout-1121111 inline-input pad-sides-more",
                num1class: "has-text med",
                num1: exercise.generated_numbers[0], 
                imgstr1: exercise.generated_numbers[0], 
                mathSignOperator: "+",
                num3class: "has-text med", 
                num2class: "has-text med",
                imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min, classname: "fix-input",maxlen:2}),
                mathsignclass: "med",
                num3: exercise.generated_numbers[0] + answ + exercise.generated_numbers[1], 
                imgstr3: "+ " + exercise.generated_numbers[1] + " = "  + eval(exercise.generated_numbers[0] + answ + exercise.generated_numbers[1])
            }))
        ) ;
       
        $(".math-sign-equal").hide();
        $(".math-sign-operator").addClass("med");

    },

    solve: function() {
        exercise.clear(function() {
            
            var correct = $(answer_analyser.params.selectors[0]).eq(0).data("value");
            
            $(answer_analyser.params.selectors[1]).eq(0).find("input").val( correct );          
            
        });
    },
    mark_correct: function() {
    //    $(answer_analyser.params.selectors[1]).addClass("correct");
        for (var i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            if(correct == $(answer_analyser.params.selectors[1]).eq(i).data("value")){
            $(answer_analyser.params.selectors[1]).eq(i).addClass("correct");         
        };
        };
    },
    mark_wrong: function() {
    //    $(answer_analyser.params.selectors[1]).addClass("wrong");
        for (var i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            if(correct != $(answer_analyser.params.selectors[1]).eq(i).data("value")){
            $(answer_analyser.params.selectors[1]).eq(i).addClass("wrong");         
        };
        };
        
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

