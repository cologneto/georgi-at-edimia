var exercise = {
    iSolveDelay: 300,   //ms
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
            "c0-5-E6",
            "layout fluid cols-2 col-w80 answer-no-margin",
            "show-drag-area"
        ];
        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render());
            $("#exercise-drag-target-area").parent().addClass( aConfigClasses.join(" ") );
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

        exercise.getOperation();
        _helper.randomPair();

        exercise.correct_equation = exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1];
        
        $(".exe-container-header").data("value", eval(exercise.correct_equation) ).append(
            twig({ref: "imageholder"}).render({
                classname: "text-center img-contain-med",
                imgsrc: process_image.html( exercise.generated_numbers[0], exercise.generated_numbers[1] )
            })
        );

        $(".exe-container-question")
                .append(twig({ref: "equation"}).render({
                    classname: "layout-1111 same-width drop-signs",
                    imgstr1: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}),
                    mathSignOperator: exercise.params.operationSign,
                    imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min})
                }));
        $(".exe-container-answer").addClass("padding-side")
                .html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
        
//        var equations = [ exercise.correct_equation ];
//        exercise.getOperation();
//        equations.push( _helper.randomFalseEquation( equations) );
//        exercise.getOperation();
//        equations.push( _helper.randomFalseEquation( equations) );
//        equations = _helper.array_shuffle( equations );
//        var solutions = _helper.array_shuffle( [ eval(equations[0]), eval(equations[1]), eval(equations[2]) ] );
//
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
            image: twig({ref: "dragbox"}).render({
                        classname: "short small",
                        content: "+"
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small",
                        content: "-"
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small",
                        content: "="
                    })
            }) 
        );
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 80) + "px", left: (($(".drag-answer-container").width() - $(this).width())/2) + "px"});
            $(v).data("value", $.trim($(v).text()) );
        });
        
        draggables.init({
            selector: ".drag-answer-container > .dragbox",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".exe-container-question .math-sign",
            accept: ".dragbox.short",
            centerContent: true
        });
    },
    solve: function() {
        exercise.clear(function() {
            var correct = [exercise.generated_numbers[0], exercise.generated_numbers[1], eval(exercise.generated_numbers[0]+""+exercise.params.operationSign+""+exercise.generated_numbers[1]) ];
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
            if ( $.trim($(".math-sign-operator .dragbox").text()) != exercise.params.operationSign )  {
                $( answer_analyser.params.selectors[1] ).fadeOut(300);
                window.setTimeout(function() {
                    $(".math-sign").addClass("solved");
                }, 300);
            }
        }
        else {
            $(".math-sign .dragbox").each(function(k, el) {
                exercise.revertDropped( el );
            });
        }
    },
    revertDropped: function(v) {
        var m = $(v).offset().left - $(".drag-answer-container").offset().left;
        var n = $(v).offset().top - $(".drag-answer-container").offset().top;

        $(v).css({
            top: n,
            left: m,
            right: "auto"
        });
        $(v).detach().appendTo( ".drag-answer-container" ).removeClass("dropped");
        var pos = $(v).data("position");
        $(v).stop().animate({
            left: pos.left, //$(".drag-answer-container").width() / 2 - $(db).width() / 2,
            top: pos.top    //$(".drag-answer-container").height() / 2 - $(db).height() / 2
        }, 300);
    }
};

for (var sAttributeName in exercise_global) {
    if (exercise[sAttributeName]) {
        alert("Exercise object already has '" + sAttributeName + "' implemented.\n\nPlease consider rewriting that code");
    }
    else {
        exercise[sAttributeName] = exercise_global[sAttributeName];
    }
}