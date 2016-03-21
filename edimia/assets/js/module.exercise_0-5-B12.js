var exercise = {
    iSolveDelay: 300,   // ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "listsum",
            numpairs: 4,
            selectors: [".answer-container .equation-num-left", ".input-answer-holder"]
        });
        
         var aConfigClasses = [
            "c0-5-B12",
            "layout no-header auto-height padding-side"
        ];
        
        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render());
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

        exercise.generated_numbers[0] = _helper.rangeRandom( exercise.params.min + 3, exercise.params.max);
        
        var eqs = [];
        eqs.push( _helper.randomEquation( exercise.generated_numbers[0] ) );
        var tmp = null;
        for ( var i = 0; i < 3; i++) {
            do {
                tmp = _helper.randomEquation( exercise.generated_numbers[0] );
            } while ( $.inArray(tmp, eqs) > -1);
            eqs.push( tmp );
        }
        var eq_ad = [];
        $.each(eqs, function(k,v) {
           var tmp = v.split("+");
           eq_ad.push( tmp[0] );
        });
        
        $(".exe-container-question").height( $(".exe-container-question").width() * 0.6);
        $(".exe-container-question").addClass("relative-position background-image").data("value", exercise.generated_numbers[1]).html( 
            twig({ref: "answer"}).render({
                classname: " pos-topleft", 
                content: twig({ref: "equation"}).render({
                    classname: "layout-1110",
                    num1: eq_ad[0],
                    num1class: "has-text large",
                    imgstr1: eq_ad[0], 
                    num2: 0, 
                    imgstr2: twig({ref: "answer"}).render({content: twig({ref: "answerinput"})
                                .render({startvalue: exercise.params.min}) } ),
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                    mathSignOperator: exercise.params.operationSign
                })
            }) + 
            twig({ref: "answer"}).render({
                classname: "pos-topright", 
                content: twig({ref: "equation"}).render({
                    classname: "layout-1110",
                    num1: eq_ad[1],
                    num1class: "has-text large",
                    imgstr1: eq_ad[1], 
                    num2: 0, 
                    imgstr2: twig({ref: "answer"}).render({content: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) } ),
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                    mathSignOperator: exercise.params.operationSign
                })
            }) + 
            twig({ref: "answer"}).render({
                classname: "pos-bottomleft", 
                content: twig({ref: "equation"}).render({
                    classname: "layout-1110",
                    num1: eq_ad[2],
                    num1class: "has-text large",
                    imgstr1: eq_ad[2], 
                    num2: 0, 
                    imgstr2: twig({ref: "answer"}).render({content: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) } ),
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                    mathSignOperator: exercise.params.operationSign
                })
            }) + 
            twig({ref: "answer"}).render({
                classname: "pos-bottomright", 
                content: twig({ref: "equation"}).render({
                    classname: "layout-1110",
                    num1: eq_ad[3],
                    num1class: "has-text large",
                    imgstr1: eq_ad[3], 
                    num2: 0, 
                    imgstr2: twig({ref: "answer"}).render({content: twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) } ),
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                    mathSignOperator: exercise.params.operationSign
                })
            }) +
            twig({ref: "answer"}).render({classname: "pos-center animated bounceInLeft has-text large", content: exercise.generated_numbers[0]}) 
        );
        $(".input-answer-holder").addClass("input-borderbox");
    },

    solve: function() {
        exercise.clear(function() {
            var correct = 0;
            for (var i = 0; i < answer_analyser.params.numpairs; i++) {
                correct = exercise.generated_numbers[0] - parseInt( $.trim($( answer_analyser.params.selectors[0] ).eq(i).text()) )
                $( answer_analyser.params.selectors[1] ).eq(i).removeClass("wrong");
                $( answer_analyser.params.selectors[1] ).eq(i).find("input").val( correct ).removeClass("clear");
            }
        });
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        var s = 0, t = 0;
        for (var i = 0; i < answer_analyser.params.numpairs; i++) {
            if ( typeof($( answer_analyser.params.selectors[1] ).eq(i).data("value")) == "undefined") {
                s = 0;
            }
            else {
                s = parseInt( $( answer_analyser.params.selectors[1] ).eq(i).data("value") );
            }
            t = parseInt( $.trim($( answer_analyser.params.selectors[0] ).eq(i).text()) );
            if ( s + t != exercise.generated_numbers[0]) {
                $( answer_analyser.params.selectors[1] ).eq(i).addClass("wrong");
            }
            else {
                $( answer_analyser.params.selectors[1] ).eq(i).removeClass("wrong");
            }
        }
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {   
            $( answer_analyser.params.selectors[1] + ".wrong" ).find("input").addClass("clear");
        }
        else {
            $( answer_analyser.params.selectors[1] + ".wrong" ).removeClass("wrong");
        }
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