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
            numpairs: 3
        });
        
         var aConfigClasses = [
            "c0-5-A8",
            "layout no-header auto-height padding-side"
        ];

        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render({exerciseclassname: "c0-5-A8"}));
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
        
        if (exercise.generated_numbers[1] > exercise.generated_numbers[0]) {
            var tmp = exercise.generated_numbers[0];
            exercise.generated_numbers[0] = exercise.generated_numbers[1];
            exercise.generated_numbers[1] = tmp;
        }
        
        var other_solutions = _helper.other_solutions(3);
        
        var oImg1 = new number_image({
            category: "number_image",
            type: "dice"
        });
        var oImg2 = new number_image({
            collection: "animal",
            category: "still"
        });
        var oImg3 = new number_image({
            collection: "animal",
            category: "motion",
            type: oImg2.params.type
        });

        $(".exe-container-question").data("value", "0-0")
                .append(twig({ref: "equation"}).render({
                    classname: "layout-10101 has-text padding-side-big",
                   
                    imgstr1:twig({ref: "answer"}).render({
                             classname: "dashed small-height",
                             content:twig({ref: "imageholder"})
                                     .render({classname: "img-contain-med-small full-width"})
                        }),                       
                    num2: exercise.generated_numbers[0],
                    imgstr2: twig({ref: "answer"}).render({
                             classname: "dashed small-height"
                        }),
                    num3: exercise.generated_numbers[1],
                    imgstr3: twig({ref: "answer"}).render({
                             classname: "dashed small-height"
                        }),
                    mathSignOperator: exercise.params.operationSign
                }))
                .append(twig({ref: "equation"}).render({
                    classname: "layout-10101 has-text padding-side-big margin-top-minus",
                   
                    imgstr1:twig({ref: "answer"}).render({
                             classname: "dashed small-height",
                             content:twig({ref: "imageholder"})
                                     .render({classname: "img-contain-med-small full-width"})
                        }),   
                    num2: exercise.generated_numbers[0],
                    imgstr2: twig({ref: "answer"}).render({
                             classname: "dashed small-height"
                        }),
                    num3: exercise.generated_numbers[1],
                    imgstr3: twig({ref: "answer"}).render({
                             classname: "dashed small-height"
                        }),
                    mathSignOperator: exercise.params.operationSign
                }));
//        $(".exe-container-answer").data("value", "0-0")
//                .html( $("<div>").addClass("animated bounceInRight")
//                        .append(twig({ref: "answer"}).render({
//                            classname: "dashed small rect full-height "
//                            
//                        }) )
//                        .append( twig({ref: "answer"}).render({
//                             classname: "dashed small rect full-height "
//                        }) )
//                );

        var ns1 = _helper.array_shuffle( [0, 1] );
        var ns2 = _helper.array_shuffle( [0, 1] );
        var pos_image = _helper.array_shuffle( [0, 3] );
        var pos_eq = _helper.array_shuffle( [1, 4] );
        var pos_ans = _helper.array_shuffle( [2, 5] );

        $(".answer-container").eq( pos_image[0] ).data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1] )
                .find(".number-image-holder").addClass("padding-left").append( oImg1.html( exercise.generated_numbers[ ns1[0] ], "" ) + oImg1.html( exercise.generated_numbers[ ns1[1] ], "padding-left" ) );
        $(".answer-container").eq( pos_eq[0] ).data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1] )
                .append( exercise.generated_numbers[ ns2[0] ] + "+" + exercise.generated_numbers[ ns2[1] ] );

        var i = 0;
        $(".answer-container").eq( pos_image[1] ).data("value", other_solutions[0][0] + other_solutions[0][1]);
        for (i = 0; i < other_solutions[0][0]; i++) {
            $(".answer-container").eq( pos_image[1] ).find(".number-image-holder").append( oImg2.html( 1, "no-margin" ));
        }
        for (i = 0; i < other_solutions[0][1]; i++) {
            $(".answer-container").eq( pos_image[1] ).find(".number-image-holder").append( oImg3.html( 1, "no-margin float-right" ) );
        }
        $(".answer-container").eq( pos_eq[1] ).data("value", other_solutions[1][0] + other_solutions[1][1])
                .append( other_solutions[1][0] + "+" + other_solutions[1][1] );

        $(".answer-container").eq( pos_ans[0] ).data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1])
                .html( exercise.generated_numbers[0] + exercise.generated_numbers[1] );
        $(".answer-container").eq( pos_ans[1] ).data("value", other_solutions[2][0] + other_solutions[2][1])
                .html( other_solutions[2][0] + other_solutions[2][1] );
    },
    solve: function() {
        $(answer_analyser.params.selectors[1]).removeClass("selected");
        var correct_sum = exercise.generated_numbers[0] + exercise.generated_numbers[1];
        $(answer_analyser.params.selectors[0]).each(function() {
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
        if (typeof(bForceClear) !== "undefined" && bForceClear) {
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