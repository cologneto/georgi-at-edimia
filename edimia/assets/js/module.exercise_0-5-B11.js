var exercise = {
    iSolveDelay: 300,   // ms
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
            "c0-5-B10",
            "layout no-header auto-height padding-side number-image-holder img-contain-med"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render());
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

        _helper.randomPair();
        
        $(".exe-container-question").data("value", exercise.generated_numbers[1]).html( 
            twig({ref: "equation"}).render({
                num1: exercise.generated_numbers[0], 
                imgstr1: exercise.generated_numbers[0],
                num1class: "has-text large",
                num2: 0, 
                imgstr2: twig({ref: "answer"}).render({content: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) } ),
                numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                mathSignOperator: exercise.params.operationSign,
                mathsignclass: "large",
                imgstr3: twig({ref: "answer"})
                    .render( {
                        classname: "animated bounceInLeft has-text large", 
                content: parseInt( exercise.generated_numbers[0] + exercise.generated_numbers[1] ) } )

            }) 
        );
            
//        $(".exe-container-answer").data("value", '').html( 
//            twig({ref: "answer"}).render( {classname: "animated bounceInLeft", content: parseInt( exercise.generated_numbers[0] + exercise.generated_numbers[1] ) } )
//        );
    },

    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");
            $( answer_analyser.params.selectors[1] ).removeClass("wrong correct");
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