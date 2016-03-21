var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "matchselectors",
            selectors: [".exe-container-header", ".input-answer-holder", ".exe-container-header .number-image-holder"]
        });

        var aConfigClasses = [
            "c0-5-c6",
            "layout header fluid cols-2 col-w80"
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

        _helper.randomPair();
        var aAnswers = _helper.close_solutions_single();
        
        var oImg1 = new number_image({
            collection: "fruit",
            category: "still"
        });
        
        $(".exe-container-header").data("value", exercise.generated_numbers[0] - exercise.generated_numbers[1]).html( twig({ref: "imageholder"}).render({
            
            classname: "img-contain-med"
            
        }) );
        
        

        for (var i=0; i < exercise.generated_numbers[0]; i++) {
            $(".number-image-holder").append( oImg1.html(1, "still") );
        }
        
        
        
        $(".exe-container-question").data("value", eval(exercise.generated_numbers[0] +""+exercise.params.operationSign+""+ exercise.generated_numbers[1]) ).html( 
            twig({ref: "equation"}).render({
                classname: "layout-1111 same-width",
                num1class: "has-text large",
                num2class: "has-text large",
                num1: exercise.generated_numbers[0], 
                imgstr1: exercise.generated_numbers[0], 
                num2: exercise.generated_numbers[1], 
                imgstr2: exercise.generated_numbers[1],
                mathSignOperator: exercise.params.operationSign
            }) 
        );

        $(".exe-container-answer").html(
            twig({ref: "answer"}).render() 
        );
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
    },
    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");
            $(answer_analyser.params.selectors[1]).removeClass("wrong correct");
            $(answer_analyser.params.selectors[1]).find("input").val( correct ).removeClass("clear");
            
            $(".exe-container-header .number_image_content").each(function(k, v) {
                if (k < correct && $(v).attr("src").indexOf("_minus") > -1) {
                    $(v).fadeOut(150, function() {
                        $(this).attr("src", $(this).attr("src").replace("_minus", "")).fadeIn(150);
                    });
                }
                else if (k >= correct && $(v).attr("src").indexOf("_minus") < 0) {
                    $(v).fadeOut(150, function() {
                        $(this).attr("src", $(this).attr("src").replace("_1.png", "_minus_1.png")).fadeIn(150);
                    });
                }
            });
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