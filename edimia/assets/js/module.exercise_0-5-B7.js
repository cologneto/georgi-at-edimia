var exercise = {
 
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
            "c0-5-B7",
            "layout no-header auto-height padding-side"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: "c0-5-B7"}));
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

        var imgobject = _helper.randomBit() ? ["apple", "pear"] : ["pear", "apple"];

        var oImg1 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });    
        var oImg2 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });
        
        $(".exe-container-question").addClass("margin-top").data("value", exercise.generated_numbers[0] + "" + exercise.generated_numbers[1]).html( 
                twig({ref: "equation"}).render({
                    classname:"layout-1010 number-image-holder image-contain-small text-center",
                    num1: exercise.generated_numbers[0], 
                    imgstr1: oImg1.html(1, "pricetag no-float", exercise.generated_numbers[0] ), 
                    num2: exercise.generated_numbers[1], 
                    imgstr2: oImg2.html(1, "pricetag no-float", exercise.generated_numbers[1] ),
                    mathSignOperator: exercise.params.operationSign,
                    num1class: "add-pricetag relative-position number-image-holder image-contain-small",
                    num2class: "add-pricetag relative-position number-image-holder image-contain-small"
                }) 
            );
        $(".exe-container-answer").addClass("margin-top").html( 
                twig({ref: "equation_full"}).render({
                    num1: exercise.params.min, 
                    imgstr1: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}), 
                    num2: exercise.params.min, 
                    imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}),
                    mathSignOperator: exercise.params.operationSign,
                    imgstr3: twig({ref: "answer"}).render(),
                    mathsignclass: "has-text large"
                }) 
            );
//        $(".exe-container-answer").data("value", '').append( twig({ref: "answer"}).render() );
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
        
        
    },
    
    solve: function() {
        exercise.clear(function() {
            var correct = [exercise.generated_numbers[0], exercise.generated_numbers[1], exercise.generated_numbers[0] + exercise.generated_numbers[1] ];
            for (var i = 0; i<3; i++) {
                $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");
                $(answer_analyser.params.selectors[1]).eq(i).find("input").val( correct[i] ).removeClass("clear");
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
            $(answer_analyser.params.selectors[1]).find("input").addClass("clear");
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