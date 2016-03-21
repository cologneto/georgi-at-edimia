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
        
        numberline.init({
            min: exercise.params.min,
            max: exercise.params.max,
            value: 0,
            show: {
                handle: false,
                arches: false
            }
        });
        
         var aConfigClasses = [
            "c0-5-C8",
            "no-header no-question"
        ];
        
        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render( ));
            $("#page-wrapper-inner").addClass( aConfigClasses.join(" ") );
            
            $(".exe-container-header").append( twig({ref: "numberline"}).render() ).show();
            numberline.render();
            
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
        var aAnswers = [ _helper.randomEquation( exercise.generated_numbers[0] - exercise.generated_numbers[1] ) ];
        aAnswers.push( _helper.randomFalseEquation( aAnswers.concat( eval(aAnswers[0]) ) ) );
        aAnswers.push( _helper.randomFalseEquation( aAnswers.concat( eval(aAnswers[0]) ).concat( eval(aAnswers[1]) )) );
        aAnswers = _helper.array_shuffle( aAnswers );
        
        numberline.showRepeatImages([
            {className: "pencil", number: exercise.generated_numbers[0]},
            {className: "caterpillar", number: exercise.generated_numbers[1]}
        ]);
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0] - exercise.generated_numbers[1]);
        $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({classnamechild: "has-text size2em",value: aAnswers[0]+"="+eval(aAnswers[0]), intvalue: aAnswers[0], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", eval(aAnswers[0]) ))
                .append($(twig({ref: "button"}).render({classnamechild: "has-text size2em",value: aAnswers[1]+"="+eval(aAnswers[1]), intvalue: aAnswers[1], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", eval(aAnswers[1]) ))
                .append($(twig({ref: "button"}).render({classnamechild: "has-text size2em",value: aAnswers[2]+"="+eval(aAnswers[2]), intvalue: aAnswers[2], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", eval(aAnswers[2]) ));
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