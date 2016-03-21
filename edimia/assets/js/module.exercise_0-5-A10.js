var exercise = {
    iSolveDelay: 300,   //ms
    bForseSolve: true,
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "equationcreator",
            selectors: [".input-answer-holder", ".math-sign .dragbox"]
        });
        
        var aConfigClasses = [
            "c0-5-A10",
            "layout no-header auto-height padding-side"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render());
            $("#page-wrapper-inner").addClass( aConfigClasses.join(" ") );
            $("#exercise-drag-target-area").parent().addClass("c0-5-A10");
            exercise.getData(function() {
                exercise.set();
                if (exercise.params.callback) {
                    exercise.params.callback();
                }
            });
        });
    },
    set: function() {
        exercise_global.clear_canvas(function() {
            $(".exe-container-answer").html( twig({ref: "inputcontainer"}).render() );
        });

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
            sNum1 += oImg1.html(1, "a10");
        }
        for (i=0; i< exercise.generated_numbers[1]; i++) {
            sNum2 += oImg1.html(1, "a10");
        }
        
        $(".exe-container-question").addClass("padding-top-right margin-left-minus").data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1]).html( 
                twig({ref: "equation"}).render({
                    classname: "layout-1010 number-image-holder img-contain-med-small",
                    num1: exercise.generated_numbers[0], 
                    imgstr1: twig({ref: "imageholder"}).render({imgsrc: sNum1, classname: "img-contain-small position-coins value"+exercise.generated_numbers[0] }), 
                    num2: exercise.generated_numbers[1], 
                    imgstr2: twig({ref: "imageholder"}).render({imgsrc: sNum2, classname: "img-contain-small position-coins value"+exercise.generated_numbers[1] }),
                    mathSignOperator: exercise.params.operationSign
                }) 
            );
        $(".exe-container-input").html(
                twig({ref: "equation_full"}).render({
                    classname:"drop-signs",
                    num1: exercise.params.min, 
                    imgstr1: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}), 
                    num2: exercise.params.min, 
                    imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}),
                    mathSignOperator: "",
                    imgstr3: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}),
                    mathsignclass: "narrow-row-height dashed margin-small-left-right",
                    num1class: "custom-width",
                    num2class: "custom-width",
                    num3class: "custom-width"
                }) 
            );
//        $(".exe-container-bottom").html( twig({ref: "answerinput"})
//                .render({
//                        startvalue: exercise.params.min
//                }) );
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
            image: twig({ref: "dragbox"}).render({
                        classname: "left-math-signs",
                        content: "+" 
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "left-math-signs",
                        content: "=" 
                    })
        }) );
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 200) + "px"});
            $(v).data("value", $.trim($(v).text()));
            $(v).addClass("math-sign-dragbox");
        });
        draggables.init({
            selector: ".drag-answer-container > .dragbox",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".math-sign",
            accept: ".dragbox",
            centerContent: true
        });
    },
    
    solve: function() {
        exercise.clear(function() {
            var correct = [exercise.generated_numbers[0], exercise.generated_numbers[1], exercise.generated_numbers[0] + exercise.generated_numbers[1]];
            for (var i = 0; i < 3; i++) {
                $(answer_analyser.params.selectors[0]).eq(i).removeClass("wrong correct");
                $(answer_analyser.params.selectors[0]).eq(i).find("input").val( correct[i] ).removeClass("clear");
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
            $(answer_analyser.params.selectors[0]).find("input").addClass("clear");
            if ( $.trim($(".math-sign-operator .dragbox").text()) != "+")  {
                $( answer_analyser.params.selectors[1] ).fadeOut(300, function() {
                    $(".math-sign").eq(2).addClass("solved");
                    $(".math-sign").eq(3).addClass("solved");
                });
            }
        }
        else {
            $(".math-sign .dragbox").each(function(k, el) {
                var pos = $(el).data("position");
                var t = $(el).offset().top - $(".drag-answer-container").offset().top;
                var l = $(el).offset().left - $(".drag-answer-container").offset().left;
                $(el).stop().css({top: t, left: l}).appendTo( ".drag-answer-container" ).animate({
                    left: pos.left, 
                    top: pos.top
                }, 300);
               
            });
        }
    },
     
};


for (var sAttributeName in exercise_global) {
    if (exercise[sAttributeName]) {
        alert("Exercise object already has '" + sAttributeName + "' implemented.\n\nPlease consider rewriting that code");
    }
    else {
        exercise[sAttributeName] = exercise_global[sAttributeName];
    }
}