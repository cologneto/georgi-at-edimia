var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            numpairs: 3,
            selectors: [".selector-marker", ".input-answer-holder"]
        });

        var aConfigClasses = [
            "c2DAC",
            "layout question-figure no-answer"
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
        $(".exe-container-question").addClass("question-square");
        _helper.randomPair();
        
        $(".exe-container-question").data("value",exercise.generated_numbers[0]  ).append(
                        $( twig({ref: "equation"}).render({     
                            classname:"equation-full-pyramide selector-marker",
                            num2class: 'has-text large', 
                            num3class: 'has-text large',
                            imgstr2: exercise.generated_numbers[0],
                            num2:exercise.generated_numbers[0],
                            imgstr1: twig({ref: "answer"}).render(),
                            imgstr3: exercise.generated_numbers[1] + exercise.generated_numbers[0]
                            
                        }) ).data("value" , ((exercise.generated_numbers[0] + exercise.generated_numbers[1])-exercise.generated_numbers[0]))
                    );
            
        _helper.randomPair();    
        $(".exe-container-question").data("value",exercise.generated_numbers[0]  ).append(
                        $( twig({ref: "equation"}).render({     
                            classname:"equation-full-pyramide",
                            num1class: 'has-text large',                           
                            num2class: 'has-text large',
                            num3class: 'has-text large',
                            imgstr1: exercise.generated_numbers[0],                           
                            imgstr2: exercise.generated_numbers[1],
                            imgstr3: exercise.generated_numbers[0] + exercise.generated_numbers[1]
                            
                        }) )
                    );
         
        _helper.randomPair();
        $(".exe-container-question").data("value",exercise.generated_numbers[0]  ).append(
                        $( twig({ref: "equation"}).render({     
                            classname:"equation-full-pyramide selector-marker",
                            num1class: 'has-text large',
                            num2class: 'has-text large',
                            imgstr1: exercise.generated_numbers[0],                            
                            imgstr3: twig({ref: "answer"}).render(),
                            imgstr2: exercise.generated_numbers[1]
                            
                        }) ).data("value" , exercise.generated_numbers[1] + exercise.generated_numbers[0])
                    );
        
        _helper.randomPair();
        $(".exe-container-question").data("value",exercise.generated_numbers[0]  ).append(
                        $( twig({ref: "equation"}).render({     
                            classname:"equation-full-pyramide selector-marker",
                            num1class: 'has-text large',
                            num3class: 'has-text large',
                            imgstr1: exercise.generated_numbers[0],                            
                            imgstr2: twig({ref: "answer"}).render(),
                            imgstr3: exercise.generated_numbers[1] + exercise.generated_numbers[0]
                            
                        }) ).data("value" , ((exercise.generated_numbers[0] + exercise.generated_numbers[1])-exercise.generated_numbers[0]))
                    ); 
            
        exercise.params.min = 0;    
            
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );
   
        $(".math-sign").hide();   
        //exercise.generated_numbers[0] = numb // slector
         
    },

    solve: function() {
        exercise.clear(function() {
                for (i = 0; i < exercise.params.number_pairs; i++) {
                var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
                $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");            
                $(answer_analyser.params.selectors[1]).eq(i).find("input").val( correct ).removeClass("clear");
            };
        });
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[2]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[2]).addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(answer_analyser.params.selectors[2]).find("input").addClass("clear");
        }
        else {
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


