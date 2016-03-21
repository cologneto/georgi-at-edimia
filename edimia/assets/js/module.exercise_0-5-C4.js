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
            selectors: [".answer-container", ".answer-container.selected"],
            numpairs: exercise.params.numpairs
        });
        
         var aConfigClasses = [
            "c0-5-c4",
            "layout float fluid cols-2 col-w66 no-header "
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

        _helper.randomSequence(3, true);
        
        var tmp = '';
        var equations = [_helper.randomEquation(this.generated_numbers[0])];
        for ( var i = 0; i < 2; i++) {
            do {
                tmp = _helper.randomFalseEquation()
            } while ($.inArray(tmp, equations) > -1);
            equations.push( tmp );
        }
        var solutions = [ eval(equations[0]) ];
        solutions.push( _helper.rangeRandomSkipUsed( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max, solutions) );
        solutions.push( _helper.rangeRandomSkipUsed( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max, solutions) );
        
        $(".exe-container-question").data("value", "0-0")
                .append(twig({ref: "equation"}).render({
                    classname: 'layout-1010 padding-side padding-top padding-bottom bottom-margin',
                    num1: 0,
                    imgstr1: twig({ref: "answer"}).render({
                        classname: 'dashed small rect-widther border-color number-image-holder img-contain-small'
                    }), 
                    num2: 0,
                    imgstr2: twig({ref: "answer"}).render({
                        classname: 'has-text dashed small rect-widther border-color'
                    })
                }))
                .append(twig({ref: "equation"}).render({
                    classname: 'layout-1010 padding-side padding-top padding-bottom bottom-margin',
                    num1: 0,
                    imgstr1: twig({ref: "answer"}).render({
                        classname: 'dashed small rect-widther border-color number-image-holder img-contain-small'
                    }),
                    num2: 0,
                    imgstr2: twig({ref: "answer"}).render({
                        classname: 'has-text dashed small rect-widther border-color'
                    })
                })) 
                .append(twig({ref: "equation"}).render({
                    classname: 'layout-1010 padding-side padding-top padding-bottom bottom-margin',
                    num1: 0,
                    imgstr1: twig({ref: "answer"}).render({
                        classname: 'dashed small rect-widther border-color number-image-holder img-contain-small'
                    }),
                    num2: 0,
                    imgstr2: twig({ref: "answer"}).render({
                        classname: 'has-text dashed small rect-widther border-color'
                    })
                }));
        $(".exe-container-answer").data("value", "0-0")                
                        .append( twig({ref: "answer"}).render({
                            classname: 'animated bounceInRight short click-answer-box  has-text dashed small rect-widther top-margin marg-left10px'
                        }) )
                        .append( twig({ref: "answer"}).render({
                            classname: 'animated bounceInRight short click-answer-box  has-text dashed small rect-widther marg-left10px'
                        }) )
                        .append( twig({ref: "answer"}).render({
                            classname: 'animated bounceInRight short click-answer-box  has-text dashed small rect-widther marg-left10px'
                        }) )
              

        var position = {
            image: _helper.array_shuffle( [0, 2, 4] ),
            equation: _helper.array_shuffle( [1, 3, 5] ),
            solution: _helper.array_shuffle( [6, 7, 8] )
        };
        
        var oImg1 = null, oImg2 = null;
        for (var i = 0; i < exercise.params.numpairs; i++) {
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
            
            var substr = equations[i].split("-");
            
            for (var m = 0; m < parseInt(substr[0]) - parseInt(substr[1]); m++) {
                $(".answer-container").eq( position.image[i] ).append( oImg1.html( 1, "" ));
            }
            for (var m = 0; m < parseInt(substr[1]); m++) {
                $(".answer-container").eq( position.image[i] ).append( oImg2.html( 1, "" ));
            }
            $(".answer-container").eq( position.image[i] ).data("value", exercise.generated_numbers[i] );
            
            $(".answer-container").eq( position.equation[i] ).data("value", exercise.generated_numbers[i] ).append( equations[i] );
            
            $(".answer-container").eq( position.solution[i] ).data("value", exercise.generated_numbers[i] ).append( solutions[i] );
        }
    },
    solve: function() {
        $(answer_analyser.params.selectors[1]).removeClass("selected");
        var correct_sum = exercise.generated_numbers[0];
        $(answer_analyser.params.selectors[0]).each(function() {
            alert ("!" + $(this).data("value") +"!");
            if ( $(this).data("value") == correct_sum ) {
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