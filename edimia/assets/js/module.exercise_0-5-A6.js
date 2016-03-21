var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-question", ".click-button-holder > div.checked"]
        });
        
        var aConfigClasses = [
            "c0-5-A6",
            "layout no-header auto-height padding-side number-image-holder img-contain-med-small"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: "c0-5-A6"}));
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
        
        var correc_value = exercise.generated_numbers[0] + exercise.generated_numbers[1];
        var aCorrect = [], aWrong = [];
        for (var i = Math.max(this.params.min, exercise.generated_numbers[0] - 1); i <= Math.min(this.params.max, exercise.generated_numbers[0] + 1); i++) {
            for (var j = Math.max(this.params.min, exercise.generated_numbers[1] - 1); j <= Math.min(this.params.max, exercise.generated_numbers[1] + 1); j++) {
                if ( correc_value == i + j && exercise.generated_numbers[0]+""+exercise.generated_numbers[1] != i+""+j && exercise.generated_numbers[0]+""+exercise.generated_numbers[1] != j+""+i) {
                    aCorrect.push({eq: i + "+" + j, value: i+j});
                }
                else if (correc_value != i + j) {
                    if (Math.abs(correc_value - i - j) < 2) {
                        aWrong.push({eq: i + "+" + j, value: i+j});
                    }
                }
            }
        }
        if (aCorrect.length < 1) {
            aCorrect.push({eq: exercise.generated_numbers[1] + "+" + exercise.generated_numbers[0], value: correc_value});
        }
        
        var aAnswers = _helper.array_shuffle(aCorrect).slice(0,1).concat( _helper.array_shuffle(aWrong).slice(0,2) ) ;
        
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
        for (i=0; i<exercise.generated_numbers[0]; i++) {
            sNum1 += oImg1.html(1, "a6");
        }
        for (i=0; i<exercise.generated_numbers[1]; i++) {
            sNum2 += oImg1.html(1, "a6");
        }
        
        $(".exe-container-question").addClass("margin-left").data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1])
                .html( twig({ref: "equation"}).render({
                    classname: "layout-1110 half-width position-relative",
                    num1: exercise.generated_numbers[0],
                    imgstr1: twig({ref: "imageholder"}).render({imgsrc: sNum1, classname: "position-coins position-absolute value"+exercise.generated_numbers[0] }),
                    num2: exercise.generated_numbers[1],
                    imgstr2: twig({ref: "imageholder"}).render({imgsrc: sNum2, classname: "position-coins position-absolute value"+exercise.generated_numbers[1] }), 
                    mathSignOperator: exercise.params.operationSign,
                    mathsignclass: 'has-text large'
                }) );
        $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({value: aAnswers[0].eq, intvalue: aAnswers[0].value })).data("value", aAnswers[0].value))
                .append($(twig({ref: "button"}).render({value: aAnswers[1].eq, intvalue: aAnswers[1].value })).data("value", aAnswers[1].value))
                .append($(twig({ref: "button"}).render({value: aAnswers[2].eq, intvalue: aAnswers[2].value })).data("value", aAnswers[2].value));
    },
    solve: function() {
        var correct = $(answer_analyser.params.selectors[0]).data("value");
        $(".click-button-holder[data-value='"+correct+"'] > div").addClass("correct");
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
        $(".click-button-holder > div.checked.wrong").removeClass("wrong correct");
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