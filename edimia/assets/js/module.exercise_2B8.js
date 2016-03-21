var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "listsum",
            numpairs: 4,
            selectors: [".selector-marker", ".input-answer-holder"]
        });

        var aConfigClasses = [
            "c2B8",
            "layout no-header question-figure no-answer"
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
        var numb = _helper.rangeRandom(4,exercise.params.max);
        for(i = 0 ; i < exercise.params.numpairs ; i++)
        {            
            exercise.generated_numbers.push(_helper.rangeRandomSkipUsed(0,numb,exercise.generated_numbers));                    
        };
        
        $(".exe-container-question").addClass("question-cross");
        
        for(i = 0 ; i < exercise.params.numpairs ; i++)
        {
            var choice = _helper.randomBit() ? 1 : 2;            
            if(choice == 1)
            {
                $(".exe-container-question").data("value",numb).append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',
                            num1class: 'has-text large selector-marker',                            
                            mathSignOperator: '+',
                            imgstr1: exercise.generated_numbers[i],
                            num1:exercise.generated_numbers[i],
                            imgstr2: twig({ref: "answer"}).render()
                        }) )
                    );


                $(".answer-container").eq(i).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );

            }else{
                $(".exe-container-question").data("value",numb).append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',
                            num2class: 'has-text large selector-marker',                          
                            mathSignOperator: '+',
                            imgstr1: twig({ref: "answer"}).render(), 
                            imgstr2: exercise.generated_numbers[i],
                            num2: exercise.generated_numbers[i]
                        }) )
                    );
                $(".answer-container").eq(i).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );

            }
        };
        
         $(".exe-container-question").data("value",numb).append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1010',
                            num2class: 'has-text large', 
                            imgstr2: numb 
                        }) )
                    );
        
            $(".math-sign-equal").hide();
            
            exercise.generated_numbers[0] = numb // slector
           
       
        
        
        
        
        
        
    },

    solve: function() {
        exercise.clear(function() {
            var correct = 0;
            for (var i = 0; i < answer_analyser.params.numpairs; i++) {
                correct = exercise.generated_numbers[0] - parseInt( $.trim($( answer_analyser.params.selectors[0] ).eq(i).text()) )
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


