var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-question", ".answer-container"]
        });
        
        var aConfigClasses = [
            "c0-5-A3",
            "layout no-header auto-height padding-side number-image-holder img-contain-med-small"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: "c0-5-A3"}));
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
        for (i=0; i<exercise.generated_numbers[0]; i++) {
            sNum1 += oImg1.html(1, "a3");
        }
        for (i=0; i<exercise.generated_numbers[1]; i++) {
            sNum2 += oImg1.html(1, "a3");
        }
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1])
                .html( twig({ref: "equation"})
                        .render({
                    classname: "position-relative",
                    num1: exercise.generated_numbers[0], 
                    imgstr1: twig({ref: "imageholder"})
                                    .render({
                                        imgsrc: sNum1, 
                                        classname: "img-contain-small position-coins position-absolute value"+exercise.generated_numbers[0] 
                                    }), 
                    num2: exercise.generated_numbers[1], 
                    imgstr2: twig({ref: "imageholder"}).render({imgsrc: sNum2, classname: "img-contain-small position-coins position-absolute value"+exercise.generated_numbers[1] }), 
                    mathSignOperator: exercise.params.operationSign,
                    imgstr3: twig({ref: "answer"}).render({classname: "full-height dashed"}),
                    mathsignclass: "has-text large"
                }) );
//        $(".exe-container-answer").data("value", '').html( twig({ref: "answer"}).render() );
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({image: oImg1.html(1, "answer-drag-item a3 left")}) );
        
        draggables.init({
            selector: ".drag-answer-container > img",
            clone: true,
            revert: false
        });
        droppables.init({
            selector: ".answer-container",
            accept: ".answer-drag-item",
            centerContent: false,
            dropcallback: function() {
                exercise.count_drops();
            }
        });
        $(".drag-answer-container").droppable({
            drop: function(event, ui) {
                $(ui.helper).attr("force-remove", "yes");
                $(ui.helper).remove();
                exercise.count_drops();
            }
        });
    },
    
    clear_answers: function(callback) {
        
        if (typeof(callback) == "function") {
            callback();
        }
    },
    
    count_drops: function() {
        $(".answer-container").attr("data-value", $(".answer-container > img").length ).data("value", $(".answer-container > img").length);
    },
    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");
            for(var i=0; i<correct; i++) {
                $(".drag-answer-container > img[data-value='1']").clone().css({display: "none"}).addClass("solution").appendTo(".answer-container");
            }
            $(".answer-container").find("img").fadeIn(300);
            $(".answer-container").attr("data-value", correct);
        });
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
        $("#page-wrapper-inner > img," + answer_analyser.params.selectors[1] + " > img").fadeOut(300, function() {
            $(this).remove();
            exercise.count_drops();
        });
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