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
            selectors: [".exe-container-question", ".exe-container-question .selected", ".answer-container"],
            numpairs: exercise.params.numpairs
        });

        var aConfigClasses = [
            "c2B7",
            "layout no-header no-answer"
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
        
        var i = 0;
        var solutions = [];
        
        var numb = _helper.rangeRandom(2,4); 
        exercise.params.numpairs = numb;
        answer_analyser.params.numpairs = numb;        
        
        for (i = 0; i < 6; i++) { 
            if(i < numb)
            {
                solutions.push( _helper.randomEquationAddition(10, solutions) );
            }else{
                solutions.push( _helper.randomEquationAddition(_helper.rangeRandom(7,9), solutions) );
            }
            
        }
        
        solutions = _helper.array_shuffle(solutions);
        
       
        $(".exe-container-question").data("value", "10")
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
            }))
            .append(twig({ref: "equation"}).render({
                classname: "layout-1010",
                num1: 0,
                imgstr1: twig({ref: "answer"}).render({classname: "has-text dashed small rect centered", content: solutions[4], value: eval(solutions[4])}),
                num2: 0,
                imgstr2: twig({ref: "answer"}).render({classname: "has-text dashed small rect centered", content: solutions[5], value: eval(solutions[5])})
            }));
      
    },
    solve: function() {
        $(answer_analyser.params.selectors[2]).removeClass("selected");
        var correct_sum = 10;
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