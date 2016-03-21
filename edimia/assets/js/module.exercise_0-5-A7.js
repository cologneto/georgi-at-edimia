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
            selectors: [".exe-container-question", ".exe-container-answer"]
        });
        
         var aConfigClasses = [
            "c0-5-A7",
            "layout no-header auto-height padding-side number-image-holder img-contain-med-small"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: "c0-5-A7"}));
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

        var oImg = new number_image({
            category: "still",
            type: "dots",
            subtype: "dark"
            
        });
        
        $(".exe-container-question").data("value", "0-0")
                .html( twig({ref: "equation"}).render({
                    classname: "layout-1110 padding-side-big",
                    num1: exercise.generated_numbers[0],
                    imgstr1: twig({ref: "answer"}).render({classname: "full-height dashed"}),
                    num2: exercise.generated_numbers[1],
                    imgstr2: twig({ref: "answer"}).render({classname: "full-height dashed"}),
                    mathSignOperator: exercise.params.operationSign
                }) );
        $(".exe-container-answer").data("value", exercise.generated_numbers[0] + "-" + exercise.generated_numbers[1])
                .html( twig({ref: "equation"}).render({
                    classname: "layout-1110",
                    num1: exercise.generated_numbers[0],
                    imgstr1: exercise.generated_numbers[0],
                    num2: exercise.generated_numbers[1],
                    imgstr2: exercise.generated_numbers[1],
                    mathSignOperator: exercise.params.operationSign,
                    num1class: 'has-text large',
                    num2class: 'has-text large'
                }) );
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({image: oImg.html(1, "answer-drag-item a7 left-25percent")}) );
        
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
    count_drops: function() {
        ret = [];
        $(".answer-container").each(function() {
            $(this).attr("data-value", $(this).find("img").length );
            ret.push( $(this).find("img").length );
        });
        $(answer_analyser.params.selectors[0]).data("value", ret.join("-") );
    },
    solve: function() {
        $(".exe-container-question .answer-container img.number_image_content").fadeOut(300, function() {
            $(this).remove();
        });
        window.setTimeout(function() {
            var oImg = new number_image({
                category: "still",
                type: "dots",
                subtype: "dark"

            });
            var correct = $(answer_analyser.params.selectors[1]).data("value").split("-");
            $.each(correct, function(k,v) {
                $(".exe-container-question .answer-container").eq(k).attr("data-value", v);
                for (var i=0; i<v; i++) {
                    $(".exe-container-question .answer-container").eq(k).append( $(oImg.html(1, "solution")).css({display: "none"}) );
                }
            });
            $(".answer-container").find("img").fadeIn(300);
//            $(".answer-container").attr("data-value", correct);
        }, 300);
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
        $("#page-wrapper-inner > img,.answer-container > img").fadeOut(300, function() {
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