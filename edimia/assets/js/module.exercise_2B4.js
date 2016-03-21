var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "selector_sequence_four",
            numpairs: exercise.params.number_pairs,          
            selectors: [".equation-container-full",".equation-num-right .input-answer-holder",".equation-num-result .input-answer-holder" ]
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
        
        exercise.params.min = 2;       
        exercise.generated_numbers = [_helper.rangeRandom(exercise.params.min,exercise.params.max) , _helper.rangeRandom(exercise.params.min,exercise.params.max)];
        exercise.params.min = 0;
        
        var rand_rot = _helper.randomBit() ? true : false;
        var eq_full,eq_half,eq_half_numb;
        if( rand_rot == true )
        {         
           eq_full = ["1+"+(exercise.generated_numbers[0]-1) , "2+"+(exercise.generated_numbers[1]-2)];
           eq_half = [(exercise.generated_numbers[0]-1)+"+",(exercise.generated_numbers[1]-2)+"+"];
           eq_half_numb = [(exercise.generated_numbers[0]-1),(exercise.generated_numbers[1]-2)];
        }else{
           eq_full = ["2+"+(exercise.generated_numbers[0]-2) , "1+"+(exercise.generated_numbers[1]-1)];
           eq_half = [(exercise.generated_numbers[0]-2)+"+",(exercise.generated_numbers[1]-1)+"+"];
           eq_half_numb = [(exercise.generated_numbers[0]-2),(exercise.generated_numbers[1]-1)];
        }    
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0] ).html( 
           $(   twig({ref: "equation"}).render({
                classname: "pad-sides-more wide-middle inline-input",
                num1class: "has-text med",
                num1: eval(eq_full[0]), 
                imgstr1: eq_full[0], 
                mathSignOperator: "=",
                num2class: "has-text med",
                num2: eq_half_numb[0], 
                imgstr2: eq_half[0] + twig({ref: "answerinput"}).render({startvalue: exercise.params.min, classname: "fix-input",maxlen:2}),
                mathsignclass: "med",
                num3: eval(eq_full[0]), 
                imgstr3: twig({ref: "answerinput"}).render({startvalue: exercise.params.min, classname: "no-float",maxlen:2})
            })).attr("data-value", exercise.generated_numbers[0]).attr("data-value-help", eq_half_numb[0])
        ) ;
        $(".exe-container-answer").data("value", exercise.generated_numbers[1] ).html( 
          $(  twig({ref: "equation"}).render({
                classname: "pad-sides-more wide-middle inline-input",
                num1class: "has-text med",
                num1: eval(eq_full[1]), 
                imgstr1: eq_full[1], 
                mathSignOperator: "=",
                num2class: "has-text med",
                num2: eq_half_numb[1], 
                imgstr2: eq_half[1] + twig({ref: "answerinput"}).render({startvalue: exercise.params.min, classname: "fix-input"}),
                mathsignclass: "med",
                num3: eval(eq_full[1]), 
                imgstr3: twig({ref: "answerinput"}).render({startvalue: exercise.params.min, classname: "no-float"})
            })).attr("data-value", exercise.generated_numbers[1]).attr("data-value-help", eq_half_numb[1])
        ).addClass("space-top") ;

    },

    solve: function() {
        exercise.clear(function() {
            for (var i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");
            $(answer_analyser.params.selectors[1]).eq(i).find("input").val( correct - $(answer_analyser.params.selectors[0]).eq(i).attr("data-value-help") ).removeClass("clear");
            $(answer_analyser.params.selectors[2]).eq(i).find("input").val( correct ).removeClass("clear");
            
        }});
    },
    mark_correct: function() {
    for (var i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");
            if((correct - $(answer_analyser.params.selectors[0]).eq(i).attr("data-value-help")) == $(answer_analyser.params.selectors[1]).eq(i).data("value") )
            {
                $(answer_analyser.params.selectors[1]).eq(i).addClass("correct");  
            }
            if(correct == $(answer_analyser.params.selectors[2]).eq(i).data("value") )
            {
                $(answer_analyser.params.selectors[2]).eq(i).addClass("correct");  
            }
        }
    },
    mark_wrong: function() {
    //    $(answer_analyser.params.selectors[1]).addClass("wrong");
     for (var i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");
            if(!((correct - $(answer_analyser.params.selectors[0]).eq(i).attr("data-value-help")) == $(answer_analyser.params.selectors[1]).eq(i).data("value") ))
            {
                $(answer_analyser.params.selectors[1]).eq(i).addClass("wrong");  
            }
            if(!(correct == $(answer_analyser.params.selectors[2]).eq(i).data("value") ))
            {
                $(answer_analyser.params.selectors[2]).eq(i).addClass("wrong");  
            }
        }
        
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(answer_analyser.params.selectors[1]).find("input").addClass("clear");
            $(answer_analyser.params.selectors[2]).find("input").addClass("clear");
        }
        else {
            $(answer_analyser.params.selectors[1]).removeClass("wrong");
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