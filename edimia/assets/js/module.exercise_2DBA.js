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
            "c2DBA",
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
        
        var first_numbs = [_helper.rangeRandom(6,exercise.params.max)];
        first_numbs.push(_helper.rangeRandomSkipUsed(6,exercise.params.max,first_numbs));
        first_numbs.push(_helper.rangeRandomSkipUsed(6,exercise.params.max,first_numbs));
        
        var second_numbs = [_helper.rangeRandom(0,first_numbs[0])];
        second_numbs.push(_helper.rangeRandomSkipUsed(0,first_numbs[1],second_numbs));
        second_numbs.push(_helper.rangeRandomSkipUsed(0,first_numbs[2],second_numbs));
        
        var aAnswers = [first_numbs[0] - second_numbs[0],first_numbs[1] - second_numbs[1],first_numbs[2] - second_numbs[2]];
        aAnswers = _helper.array_shuffle(aAnswers);
        
        $(".exe-container-question").addClass("question-signs");
        
        
            
                $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',
                            num1class: 'has-text large', 
                            num2class: 'has-text large',     
                            mathSignOperator: '-',
                            imgstr1: first_numbs[0],                            
                            imgstr2: second_numbs[0]
                        }) )
                    );
                $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',
                            num1class: 'has-text large',   
                            num2class: 'has-text large',     
                            mathSignOperator: '-',
                            imgstr1: first_numbs[1],                            
                            imgstr2: second_numbs[1]
                        }) )
                    );
                $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',
                            num1class: 'has-text large',     
                            num2class: 'has-text large',     
                            mathSignOperator: '-',
                            imgstr1: first_numbs[2],                            
                            imgstr2: second_numbs[2]
                        }) )
                    );
            
            
                
                $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',
                            num1class: 'has-text large',  
                            imgstr1: aAnswers[0] 
                        }) )
                    );
            
                $(".exe-container-question").append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',
                            num1class: 'has-text large',  
                            imgstr1: aAnswers[1] 
                        }) )
                    );
            
                $(".exe-container-question").data("value",aAnswers[2]).append(
                        $( twig({ref: "equation"}).render({
                            classname: 'layout-1110',                             
                            imgstr1: twig({ref: "answer"}).render()
                        }) )
                    );


                $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );
           
        
                 $(".math-sign-equal").hide();
            
           
       
        
        
        
        
        
        
    },

    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");          
            $( answer_analyser.params.selectors[1] ).removeClass("wrong");
            $( answer_analyser.params.selectors[1] ).find("input").val( correct ).removeClass("clear");                    
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


