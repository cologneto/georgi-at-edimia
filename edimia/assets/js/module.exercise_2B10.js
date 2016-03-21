var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".equation-container-full", ".input-answer-holder"],
            numpairs: exercise.params.number_pairs 
        });

        var aConfigClasses = [
            "c2B10",
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
        
        var firstSimEq = [[5,6,4,4,2,2],[5,6,3,4,3,3]];
        var secondSimEq = [[5,4,6,2,4,5],[4,3,6,3,4,5]];
        
        var rand = _helper.rangeRandom(0,5);
        
        for (i = 0; i < exercise.params.number_pairs; i++) {
        
            
            
        $(".exe-container-question").append( 
           $( twig({ref: "equation"}).render({
                classname: "",
                num1class: "has-text large",
                num2class: "has-text large",
                mathsignclass: "large",
                num1: firstSimEq[i][rand], 
                imgstr1: firstSimEq[i][rand], 
                num2: secondSimEq[i][rand], 
                imgstr2: secondSimEq[i][rand],
                imgstr3: twig({ref: "answer"}).render(),
                mathSignOperator: exercise.params.operationSign,
                
            })).attr("data-value",eval(firstSimEq[i][rand] + secondSimEq[i][rand])).addClass("space-top")
        );  
        
        $(".answer-container").eq(i).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );     
       
        
        };
        
        $(".equation-container-full .math-sign").addClass("large");
        
        
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
    
    for (i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            if($(answer_analyser.params.selectors[1]).eq(i).data("value") == correct)
            {        
                $(answer_analyser.params.selectors[1]).eq(i).addClass("correct");
            }      
            
        };
    },
    mark_wrong: function() {
         for (i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            if(!($(answer_analyser.params.selectors[1]).eq(i).data("value") == correct))
            {        
                $(answer_analyser.params.selectors[1]).eq(i).addClass("wrong");
            }      
            
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



