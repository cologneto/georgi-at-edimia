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
            "c0-5-B3",
            "layout no-header auto-height padding-side"
        ];
        
        numberline.init({
            min: exercise.params.min,
            max: exercise.params.max,
            value: 0
        });

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: "c0-5-B3"}));
            $("#page-wrapper-inner").addClass( aConfigClasses.join(" ") );
            
            $(".exe-container-header").append( twig({ref: "numberline"}).render() ).show();
            numberline.render();
            
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

        _helper.randomPair();
        
        numberline.updateArches( false, false, Math.min( exercise.generated_numbers[0], exercise.generated_numbers[1] ) );

        $(".exe-container-question").data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1]).html( 
            twig({ref: "equation"}).render({
                num1: exercise.generated_numbers[0], 
                imgstr1: exercise.generated_numbers[0], 
                num2: exercise.generated_numbers[1], 
                imgstr2: exercise.generated_numbers[1],
                numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                mathSignOperator: exercise.params.operationSign,
                imgstr3: twig({ref: "answer"}).render(),
                mathsignclass: "large",
                num1class: "has-text large",
                num2class: "has-text large"
            }) 
        );
//        $(".exe-container-answer").data("value", '').html( twig({ref: "answer"}).render() );
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
        
        
    },

    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");
            $(answer_analyser.params.selectors[1]).removeClass("wrong correct");
            $(answer_analyser.params.selectors[1]).find("input").val( correct ).removeClass("clear");
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