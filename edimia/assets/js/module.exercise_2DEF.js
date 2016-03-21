var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            numpairs: 1,
            selectors: [".exe-container-question",".input-answer-holder"]
        });

        var aConfigClasses = [
            "c2DEF",
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
        exercise.generated_numbers = [];
        exercise.generated_numbers.push(_helper.rangeRandomSkipUsed(exercise.params.min,exercise.params.max));
        
        $(".exe-container-question").addClass("question-rainbow");
        
        $(".exe-container-question").data("value",exercise.generated_numbers[0]  ).append(
                        $( twig({ref: "equation"}).render({ 
                            imgstr1: twig({ref: "answer"}).render()                                                   
                        }) )
                    );   
            
        exercise.getOperation();
        if(exercise.params.operationSign == "+")
        { exercise.generated_numbers.push(_helper.rangeRandom(0,(10-exercise.generated_numbers[0])));  }else{ exercise.generated_numbers.push(_helper.rangeRandom(0,exercise.generated_numbers[0]));};
        $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({                           
                            num1class: 'has-text large',
                            imgstr1: exercise.params.operationSign + exercise.generated_numbers[1],
                            num1:exercise.generated_numbers[1]                           
                        }) )
                    );    
        $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({ 
                 //           imgstr1: twig({ref: "answer"}).render(),                                                   
                        }) )
                    );     
        exercise.generated_numbers[1] = eval(exercise.generated_numbers[0] + exercise.params.operationSign + exercise.generated_numbers[1]);    
        exercise.getOperation();  
        if(exercise.params.operationSign == "+")
        { exercise.generated_numbers.push(_helper.rangeRandom(0,(10-exercise.generated_numbers[1])));  }else{ exercise.generated_numbers.push(_helper.rangeRandom(0,exercise.generated_numbers[1]));};
                   
        $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({                           
                            num1class: 'has-text large',
                            imgstr1: exercise.params.operationSign + exercise.generated_numbers[2],
                            num1:exercise.generated_numbers[2],                           
                        }) )
                    );    
       $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({ 
                //            imgstr1: twig({ref: "answer"}).render(),                                                   
                        }) )
                    );
        exercise.generated_numbers[2] = eval(exercise.generated_numbers[1] + exercise.params.operationSign + exercise.generated_numbers[2]);       
        exercise.getOperation();  
        if(exercise.params.operationSign == "+")
        { exercise.generated_numbers.push(_helper.rangeRandom(0,(10-exercise.generated_numbers[2])));  }else{ exercise.generated_numbers.push(_helper.rangeRandom(0,exercise.generated_numbers[2]));};
               
        $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({                           
                            num1class: 'has-text large',
                            imgstr1: exercise.params.operationSign + exercise.generated_numbers[3],
                            num1:exercise.generated_numbers[3],                           
                        }) )
                    );    
       
            
        $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({                           
                            num1class: 'has-text large',
                            imgstr1: eval(exercise.generated_numbers[2] + exercise.params.operationSign + exercise.generated_numbers[3]),
                            num1:eval(exercise.generated_numbers[2] + exercise.params.operationSign + exercise.generated_numbers[3])                           
                        }) )
                    );    
            
            
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );
        
           
           
            $(".math-sign-equal").hide();
            
        //    exercise.generated_numbers[0] = numb // slector
         
    },

    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");
            for(i = 0; i < answer_analyser.params.numpairs ; i++)
            {
                $( answer_analyser.params.selectors[1] ).eq(i).removeClass("wrong");
                $( answer_analyser.params.selectors[1] ).eq(i).find("input").val( correct ).removeClass("clear");
            }
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


