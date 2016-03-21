var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "sumsequence",
            selectors: [".exe-container-question", ".input-answer-holder"]
        });
         var aConfigClasses = [
            "c0-5-A9",
            "layout no-header auto-height padding-side number-image-holder img-contain-med-small"
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

        var oImg1 = new number_image({
            collection: ["fruit", "marble"],
            category: "still"
        });
//        var oImg2 = new number_image({
//            category: "still",
//            type: "dots",
//            subtype: "light"
//        });
        
        var sNum1 = sNum2 = "";
        
        var i = 0;
        for (i=0; i < exercise.generated_numbers[0]; i++) {
            sNum1 += oImg1.html(1, "a9");
        }
        for (i=0; i< exercise.generated_numbers[1]; i++) {
            sNum2 += oImg1.html(1, "a9");
        }
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0] + "" + exercise.generated_numbers[1]).html( 
                twig({ref: "equation"})
                    .render({
                        classname: "layout-1110 half-width position-relative",
                        num1: exercise.generated_numbers[0], 
                        imgstr1: twig({ref: "imageholder"})
                                    .render({
                                        imgsrc: sNum1, 
                                        classname: "position-coins position-absolute value"+exercise.generated_numbers[0] 
                                    }), 
                        num2: exercise.generated_numbers[1], 
                        imgstr2: twig({ref: "imageholder"}).render({imgsrc: sNum2, classname: "img-contain-small position-coins position-absolute value"+exercise.generated_numbers[1] }), 
                        mathSignOperator: exercise.params.operationSign
                }) 
            );
        $(".exe-container-question").append( 
                twig({ref: "equation_full"}).render({
                    num1: exercise.params.min, 
                    imgstr1: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}), 
                    num2: exercise.params.min, 
                    imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}),
                    mathSignOperator: exercise.params.operationSign,
                    mathsignclass: "has-text large",
                    num3:"",
                    imgstr3: twig({ref: "answer"}).render({
//                        value: "",
                        content: twig({ref: "answerinput"})
                                .render({startvalue: exercise.params.min})
                    })
                }) 
            );
//        $(".exe-container-answer").data("value", '').html( twig({ref: "answer"}).render() );
//        
//        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
//        
        
    },
    
    solve: function() {
        exercise.clear(function() {
            var solutions = [ exercise.generated_numbers[0], exercise.generated_numbers[1], exercise.generated_numbers[0] + exercise.generated_numbers[1] ];
            for (var i = 0 ; i < 3; i++) {
                $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");
                $(answer_analyser.params.selectors[1]).eq(i).find("input").val( solutions[i] ).removeClass("clear");
            }
        });
    },
    mark_correct: function() {
//        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
//        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(".input-answer-holder").find("input").addClass("clear");
        }
//        else {
//            $(answer_analyser.params.selectors[1]).removeClass("wrong");
//        }
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