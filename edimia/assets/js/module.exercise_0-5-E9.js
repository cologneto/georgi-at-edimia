var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "singleselector",
            selectors: [".exe-container-header", ".answer-container.selected", ".answer-container"],
            numpairs: exercise.params.numpairs
        });

        var aConfigClasses = [
            "c0-5-E9",
            "layout fluid cols-2 col-w66"
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

        exercise.getOperation();
        _helper.randomSequence(1, true);
        
        exercise.params.numpairs = _helper.rangeRandom( 2, _helper.possibleNumberEquations(exercise.generated_numbers[0]) );
        answer_analyser.params.numpairs = exercise.params.numpairs;
        var i = 0;
        var solutions = [], limitOffset = 0;
        if ( exercise.params.operationSign == "-") {
            solutions.push( exercise.generated_numbers[0] + "-0" );
            limitOffset = 1;
        }
        for (i = 0; i < exercise.params.numpairs - limitOffset; i++) {
            solutions.push( _helper.randomEquation(exercise.generated_numbers[0], solutions) );
        }
        for (i = exercise.params.numpairs; i < 6; i++) {
            exercise.getOperation();
            solutions.push( _helper.randomFalseEquation(exercise.generated_numbers[0], solutions) );
        }
        solutions = _helper.array_shuffle(solutions);
        
        $(".exe-container-header").addClass("has-text large")
                                  .html( exercise.generated_numbers[0] )
                                  .data("value", exercise.generated_numbers[0]);
        $(".exe-container-question").data("value", "0-0")
            .append(twig({ref: "equation"}).render({
                classname: "layout-1010",
                num1: 0,
                imgstr1: twig({ref: "answer"}).render({classname: "has-text dashed small rect centered", content: solutions[0], value: eval(solutions[0]) }),
                num2: 0,
                imgstr2: twig({ref: "answer"}).render({classname: "has-text dashed small rect centered", content: solutions[1], value: eval(solutions[1])})
            }))
            .append(twig({ref: "equation"}).render({
                classname: "layout-1010",
                num1: 0,
                imgstr1: twig({ref: "answer"}).render({classname: "has-text dashed small rect centered", content: solutions[2], value: eval(solutions[2])}),
                num2: 0,
                imgstr2: twig({ref: "answer"}).render({classname: "has-text dashed small rect centered", content: solutions[3], value: eval(solutions[3])})
            }));
        $(".exe-container-answer").data("value", "0-0")
            .html( $("<div>").addClass("animated bounceInRight")
                    .append( twig({ref: "answer"}).render({classname: "has-text dashed small rect centered gap-bottom", content: solutions[4], value: eval(solutions[4])}) )
                    .append( twig({ref: "answer"}).render({classname: "has-text dashed small rect centered", content: solutions[5], value: eval(solutions[5])}) )
            );
    },
    solve: function() {
        $(answer_analyser.params.selectors[2]).removeClass("selected");
        var correct_sum = exercise.generated_numbers[0];
        $(answer_analyser.params.selectors[2]).each(function() {
            $(this).data("value") == correct_sum ? $(this).addClass("correct") : $(this).removeClass("correct");
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