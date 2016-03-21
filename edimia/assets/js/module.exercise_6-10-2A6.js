var exercise = {
    iSolveDelay: 300,   // ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            numpairs: exercise.params.number_pairs,
            selectors: [".answer-container", ".answer-container > .dragbox"]
        });
        
        

        var aConfigClasses = [
            "c6-10-2A6",
            "layout no-header fluid cols-2 col-w55 padding-right-answer"
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
        
        if(progress.params.current > 4)
        {            
            exercise.params.min = 8;
            exercise.params.max = 10;
        }else{
            exercise.params.min = 6;
            exercise.params.max = 8;
        }

        _helper.randomSequence(3);
        
        exercise.params.min = 0;
        
        $(".exe-container-question").data("value", exercise.generated_numbers[0] + exercise.generated_numbers[1])
                .html( twig({ref: "equation"}).render({
                    classname:"layout-0011 padding-top-20 small-signs",
                    num1: '',
                    imgstr1: '',
                    num1class: "has-text med right",
                    num2class: "has-text med right",
                    num2: exercise.generated_numbers[0],
                    imgstr2: exercise.generated_numbers[0],
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                    mathSignOperator: exercise.params.operationSign
                }) +
                    twig({ref: "equation"}).render({
                    classname:"layout-0011 padding-top-20 small-signs",
                    num1: '',
                    imgstr1: '',
                    num1class: "has-text med right",
                    num2class: "has-text med right",
                    num2: exercise.generated_numbers[1],
                    imgstr2: exercise.generated_numbers[1],
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                    mathSignOperator: exercise.params.operationSign
                }) +
                    twig({ref: "equation"}).render({
                    classname:"layout-0011 padding-top-20 small-signs",
                    num1: '',
                    imgstr1: '',
                    num1class: "has-text med right",
                    num2class: "has-text med right",
                    num2: exercise.generated_numbers[2],
                    imgstr2: exercise.generated_numbers[2],
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":"",
                    mathSignOperator: exercise.params.operationSign
                }));
        $(".exe-container-answer")
                .append( $(twig({ref: "answercontainer"}).render({classname:"answer-border"})).data("value", exercise.generated_numbers[0] ) )
                .append( $(twig({ref: "answercontainer"}).render({classname:"answer-border"})).data("value", exercise.generated_numbers[1] ) )
                .append( $(twig({ref: "answercontainer"}).render({classname:"answer-border"})).data("value", exercise.generated_numbers[2] ) );
        var equations = _helper.array_shuffle([
            _helper.randomEquation( exercise.generated_numbers[0] ),
            _helper.randomEquation( exercise.generated_numbers[1] ),
            _helper.randomEquation( exercise.generated_numbers[2] ),
            _helper.randomFalseEquation()
        ]);
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
                    image: twig({ref: "dragbox"}).render({
                                classname:"marg-left",
                                content: equations[0]
                            }) + 
                            twig({ref: "dragbox"}).render({
                                classname:"marg-left",
                                content: equations[1]
                            }) + 
                            twig({ref: "dragbox"}).render({
                                classname:"marg-left",
                                content: equations[2]
                            }) + 
                            twig({ref: "dragbox"}).render({
                                classname:"marg-left",
                                content: equations[3]
                            })  }) );
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 100) + "px"});
            $(v).data("value", eval($.trim($(v).text())) );
        });
        draggables.init({
            selector: ".drag-answer-container > .dragbox",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".exe-container-answer .answer-container ",
            accept: ".dragbox",
            centerContent: true
        });
    },
    solve: function() {
        $(".drag-answer-container .dragbox").each(function(k,drag) {

            $(".answer-container").each(function(kk,cont) {
                if ( $(cont).children().length == 0 && $(drag).data("value") == $(cont).data("value") ) {

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
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
      /*  $(answer_analyser.params.selectors[1]).each(function(k, v) {
             if ($(v).data("value") != exercise.generated_numbers[k]) {
                 exercise.revertDropped(v);
             }
        });*/
         if ( $(answer_analyser.params.selectors[0]).length == $(answer_analyser.params.selectors[1]).length ) {
         for (var i = answer_analyser.params.numpairs-1; i > -1 ; i--) {               
                if ($(answer_analyser.params.selectors[0]).eq(i).data("value") != $(answer_analyser.params.selectors[1]).eq(i).data("value")) {
                    exercise.revertDropped( $(answer_analyser.params.selectors[1]).eq(i) );
                }
            }
        };
    },   
}

for (var sAttributeName in exercise_global) {
    if (exercise[sAttributeName]) {
        alert("Exercise object already has '" + sAttributeName + "' implemented.\n\nPlease consider rewriting that code");
    }
    else {
        exercise[sAttributeName] = exercise_global[sAttributeName];
    }
}