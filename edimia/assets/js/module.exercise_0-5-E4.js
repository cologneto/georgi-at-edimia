var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "listvalue",
            selectors: [".answer-container,.number-image-holder", ".answer-container.selected,.number-image-holder.selected"],
            numpairs: exercise.params.numpairs
        });

        var aConfigClasses = [
            "c0-5-E4",
            "layout no-header fluid cols-2 col-w75 row-narrow answer-no-margin"
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

        _helper.randomSequence(exercise.params.numpairs, true);
        
        var equations = {correct: [], wrong: [], list: []}, tmp = null;
        for ( var i = 0; i < exercise.params.numpairs; i++) {
            
            exercise.getOperation();

            equations.correct.push( _helper.randomEquation(exercise.generated_numbers[i], equations.correct.concat(equations.wrong) ) );
            do {
                tmp = _helper.randomFalseEquation( )
            } while ($.inArray(tmp, equations.correct.concat(equations.wrong)) > -1);
            equations.wrong.push( tmp );
        }
        equations.list = _helper.array_shuffle( equations.correct ).slice(0, 1);
        exercise.correctValue = eval(equations.list[0]);
        console.log( exercise.correctValue )
        var solutions = [ exercise.correctValue ];
        equations.list = equations.list.concat( _helper.array_shuffle( equations.wrong ).slice(0, 2) );
        equations.list = _helper.array_shuffle( equations.list );
        
        solutions.push( _helper.rangeRandomSkipUsed( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max, solutions) );
        solutions.push( _helper.rangeRandomSkipUsed( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max, solutions) );
        
        $(".exe-container-question").data("value", "0-0")
                .append(twig({ref: "equation"}).render({
                    classname: "layout-1010 padding-side padding-bottom",
                    num1: 0,
                    imgstr1: twig({ref: "imageholder"}).render({classname: "dashed img-contain-small text-center"}),
                    num2: 0,
                    imgstr2: twig({ref: "answer"}).render({classname: "dashed has-text"})
                }))
                .append(twig({ref: "equation"}).render({
                    classname: "layout-1010 padding-side padding-bottom",
                    num1: 0,
                    imgstr1: twig({ref: "imageholder"}).render({classname: "dashed img-contain-small text-center"}),
                    num2: 0,
                    imgstr2: twig({ref: "answer"}).render({classname: "dashed has-text"})
                }))
                .append(twig({ref: "equation"}).render({
                    classname: "layout-1010 padding-side padding-bottom",
                    num1: 0,
                    imgstr1: twig({ref: "imageholder"}).render({classname: "dashed img-contain-small text-center"}),
                    num2: 0,
                    imgstr2: twig({ref: "answer"}).render({classname: "dashed has-text"})
                }));
        $(".exe-container-answer").addClass("padding-side padding-bottom").data("value", "0-0")
                .html( $("<div>").addClass("animated bounceInRight").css({height: "100%"})
                        .append( twig({ref: "answer"}).render({classname: "dashed has-text"}) )
                        .append( twig({ref: "answer"}).render({classname: "dashed has-text"}) )
                        .append( twig({ref: "answer"}).render({classname: "dashed has-text"}) )
                );

        var position = {
            image: _helper.array_shuffle( [0, 1, 2] ),
            equation: _helper.array_shuffle( [0, 1, 2] ),
            solution: _helper.array_shuffle( [3, 4, 5] )
        };
        
        var oImg1 = null, oImg2 = null;
        for (var i = 0; i < exercise.params.numpairs; i++) {
            
            var eq_parts = new RegExp(/(\d+)([\-\+])(\d+)/).exec( equations.correct[i] );

            var imgstr = "";
            if (eq_parts[2] == "-") {
                oImg1 = new number_image({
                    collection: "fruit",
                    category: "still"
                });
                oImg2 = new number_image({
                    collection: "fruit",
                    category: "still",
                    type: oImg1.params.type,
                    subtype: "minus"
                });
                for (m=0; m<eq_parts[1] - eq_parts[3]; m++) {
                    imgstr += oImg1.html(1, "still no-float");
                }
                for (m=0; m<eq_parts[3]; m++) {
                    imgstr += oImg2.html(1, "still no-float");
                }
            }
            else {
                oImg1 = new number_image({
                    collection: "animal",
                    category: "still"
                });
                oImg2 = new number_image({
                    collection: "animal",
                    category: "motion",
                    type: oImg1.params.type
                });
                for (m=0; m<eq_parts[1]; m++) {
                    imgstr += oImg1.html(1, "still");
                }
                for (m=0; m<eq_parts[3]; m++) {
                    imgstr += oImg2.html(1, "motion");
                }
            }
            $(".number-image-holder").eq( position.image[i] ).data("value", eval(equations.correct[i])).html(imgstr);
            
            $(".answer-container").eq( position.equation[i] ).data("value", eval(equations.list[i]) ).append( equations.list[i] );
            
            $(".answer-container").eq( position.solution[i] ).data("value", solutions[i] ).append( solutions[i] );
        }
    },
    solve: function() {
        $(answer_analyser.params.selectors[1]).removeClass("selected");
        $(answer_analyser.params.selectors[0]).each(function() {
            if ( $(this).data("value") == exercise.correctValue ) {
                $(this).addClass("correct");
            }
        });
    },
    mark_correct: function() {
//        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
//        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function(bForceClear) {
        if (typeof(bForceClear) != "undefined" && bForceClear) {
            $(answer_analyser.params.selectors[1]).removeClass("selected correct");
        }
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