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
            "c2D6",
            "layout no-answer"
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
                
        var numb = _helper.rangeRandom(exercise.params.min,exercise.params.max);
        exercise.generated_numbers = [numb,(10-numb)];
        var oImg1 = new number_image({
            collection: "marble",
            category: "still"
        });
        var oImg2 = new number_image({
            collection: "marble",
            category: "still"
        });
      
        $(".exe-container-header").data("value", exercise.generated_numbers[0]).html( twig({ref: "imageholder"}).render({classname:"half-width img-contain-small"}) );        
        for (i=0; i<exercise.generated_numbers[0]; i++) {
            $(".number-image-holder").eq(0).append( oImg1.html(1, "still no-margin") );
        }
        
        $(".exe-container-header").data("value", exercise.generated_numbers[1]).append( twig({ref: "imageholder"}).render({classname:"half-width img-contain-small"}) );        
        for (i=0; i<exercise.generated_numbers[1]; i++) {
            $(".number-image-holder").eq(1).append( oImg2.html(1, "still no-margin") );
        }
        
            
        $(".exe-container-question").append( 
           $( twig({ref: "equation"}).render({
                classname: "",
                num1class: "has-text large",
                num2class: "has-text large",
                mathsignclass: "large",
                num1: 10, 
                imgstr1: 10, 
                imgstr3: twig({ref: "answer"}).render(),
                num2: exercise.generated_numbers[0], 
                imgstr2: exercise.generated_numbers[0],                
                mathSignOperator: "-"
                
            })).attr("data-value",eval(10-exercise.generated_numbers[0]))
        );
        
        $(".answer-container").eq(0).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );     
        
        $(".exe-container-question").append( 
           $( twig({ref: "equation"}).render({
                classname: "",
                num1class: "has-text large",
                num2class: "has-text large",
                mathsignclass: "large",
                num1: 10, 
                imgstr1: 10, 
                imgstr3: twig({ref: "answer"}).render(),
                num2: exercise.generated_numbers[1], 
                imgstr2: exercise.generated_numbers[1],                
                mathSignOperator: "-"
                
            })).attr("data-value",eval(10-exercise.generated_numbers[1])).addClass("space-top")
        );
        
        $(".answer-container").eq(1).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) ); 
       
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



