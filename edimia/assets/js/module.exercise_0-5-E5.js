var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "matchselectorseval",
            selectors: [".exe-container-header", ".exe-container-question .dragbox,.exe-container-answer .dragbox"],
            numpairs: exercise.params.numpairs
        });

        var aConfigClasses = [
            "c0-5-E5",
            "layout fluid cols-2 col-w55 answer-no-margin",
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
                    classname: "layout-0011 padding-side",
                    imgstr2: twig({ref: "answer"}).render({classname: "dashed small rect pull-right"})
                }));
        $(".exe-container-answer").addClass("padding-side")
                .html( $("<div>").addClass("animated bounceInRight").css({height: "100%"})
                        .append( twig({ref: "answer"}).render({classname: "dashed small square"}) )
                );
        var equations = [ exercise.correct_equation ];
        exercise.getOperation();
        equations.push( _helper.randomFalseEquation( equations) );
        exercise.getOperation();
        equations.push( _helper.randomFalseEquation( equations) );
        equations = _helper.array_shuffle( equations );
        var solutions = _helper.array_shuffle( [ eval(equations[0]), eval(equations[1]), eval(equations[2]) ] );

        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
            image: twig({ref: "dragbox"}).render({
                        classname: "short",
                        content: equations[0]
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short",
                        content: equations[1]
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short",
                        content: equations[2]
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small",
                        content: solutions[0]
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small",
                        content: solutions[1]
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small",
                        content: solutions[2]
                    })
            }) 
        );
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 80) + "px"});
            $(v).data("value", $.trim($(v).text()) );
        });
        
        draggables.init({
            selector: ".drag-answer-container > .dragbox",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".exe-container-answer .answer-container ",
            accept: ".dragbox.short",
            centerContent: true
        });
        droppables.init({
            selector: ".exe-container-question .answer-container ",
            accept: ".dragbox.short",
            centerContent: true
        });
        droppables.init({
            selector: ".exe-container-answer .answer-container ",
            accept: ".dragbox.short.small",
            centerContent: true
        });
    },
    solve: function() {
        $(".drag-answer-container .dragbox").each(function(k,drag) {
            var parentElement = $(drag).hasClass("small") ? ".exe-container-answer" : ".exe-container-question" ;

            $( parentElement + " .answer-container").each(function(kk,cont) {
                
                if ( $(cont).children().length == 0 && eval($(drag).data("value")) == eval(exercise.correct_equation) ) {

                    var m = $(drag).offset().left - $(cont).offset().left;
                    var n = $(drag).offset().top - $(cont).offset().top;

                    $(drag).detach().css({left:m,top:n}).appendTo(cont).animate({
                        left: $(cont).width() / 2 - $(drag).width() / 2,
                        top: $(cont).height() / 2 - $(drag).height() / 2
                    }, 300, function() {
                        $(this).addClass("dropped");
                    });

                }
            });
        });
    },
    mark_correct: function() {
//        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
//        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function(bForceClear) {
        var solution = eval( exercise.correct_equation );
        $(".answer-container .dragbox").each(function() {
           if ( eval($(this).data("value")) != solution) {
               exercise.revertDropped( $(this) );
           }
        });
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