var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "sequence_mix_value",
            numpairs: 2,
            selectors: [".selector-marker-start .input-answer-holder", ".selector-marker .input-answer-holder",".exe-container-question"]
        });
        
        var aConfigClasses = [
            "c2DDE",
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
        
        var numb = [_helper.rangeRandom(3,exercise.params.max)];        
        numb.push(_helper.rangeRandom(exercise.params.min,numb[0]));
        var temp = numb[0] - numb[1];
        numb.push(_helper.rangeRandom(exercise.params.min,temp));
        
        var res = (numb[0] - numb[1]) - numb[2];
        
       // sub.push(_helper.rangeRandom(0,sub[0]));
       // sub.push(_helper.rangeRandom(numb,sub[1]));
        exercise.generated_numbers = [numb[0],numb[1],numb[2]];
        
        
        
        $(".exe-container-question").data("value",res).html( 
            twig({ref: "equation"}).render({ 
                classname:"layout-00110",
                num2class: "has-text large",
                imgstr2: res,
                num2:res
            }) 
        );
        
        
        
        $(".exe-container-question").append( 
            twig({ref: "equation"}).render({ 
                classname:"contain-eq half-width equation-marg-left5",
                num1class: "selector-marker-start",
                num2class: "selector-marker",
                num3class: "selector-marker",
                num1: numb[0], 
                imgstr1: twig({ref: "answer"}).render(), 
                num2: numb[1],
                imgstr2: twig({ref: "answer"}).render(),
                num3: numb[2], 
                imgstr3: twig({ref: "answer"}).render(),            
                mathSignOperator: exercise.params.operationSign
            }) 
        );
    
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen: 2}) );        
        $(".equation-container-full .math-sign").addClass("large");
        $(".equation-container-full .math-sign-equal").eq(1).text("-");
    },

    solve: function() {
        exercise.clear(function() {            
            $(".input-answer-holder").eq(0).removeClass("wrong correct");
            $(".input-answer-holder").eq(0).find("input").val( exercise.generated_numbers[0] ).removeClass("clear");
            
            $(".input-answer-holder").eq(1).removeClass("wrong correct");
            $(".input-answer-holder").eq(1).find("input").val( exercise.generated_numbers[1] ).removeClass("clear");
            
            $(".input-answer-holder").eq(2).removeClass("wrong correct");
            $(".input-answer-holder").eq(2).find("input").val( exercise.generated_numbers[2] ).removeClass("clear");
        });
    },
    mark_correct: function() {
        $(".input-answer-holder").addClass("correct");
    },
    mark_wrong: function() {
        $(".input-answer-holder").addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(".input-answer-holder").find("input").addClass("clear");            
        }
        else {
            $(".input-answer-holder").removeClass("wrong");         
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

