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
            selectors: [".equation-container-full", ".equation-num-result .dragbox"]
        });
        
        var aConfigClasses = [
            "c2D10",
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
        
        var Answers = [];         
        
        for (i = 0; i < exercise.params.number_pairs; i++) {
            _helper.randomPair();
            Answers.push(exercise.generated_numbers[0]-exercise.generated_numbers[1]);
            $(".exe-container-question").append(
                $( twig({ref: "equation"}).render({
                    classname: '',
                    num1class: 'has-text med', 
                    num2class: 'has-text med', 
                    num1: exercise.generated_numbers[0], 
                    imgstr1: exercise.generated_numbers[0], 
                    num2: exercise.generated_numbers[1], 
                    imgstr2: exercise.generated_numbers[1],
                    imgstr3: twig({ref: "answercontainer"}).render({classname: "short dashed", value: eval(exercise.generated_numbers[0]-exercise.generated_numbers[1])}),
                    mathSignOperator: exercise.params.operationSign
                }) ).attr("data-value", Answers[i])
            );
        }
        Answers.push(_helper.rangeRandom(exercise.params.min,exercise.params.max));
        Answers = _helper.array_shuffle( Answers );
        var drag_eq = "";
        $.each(Answers, function(k,v) {
            drag_eq += twig({ref: "dragbox"}).render({
                            content: v,
                            classname: "equation short"
                        });
        });
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({ image:  drag_eq }) );
        
        $(".drag-answer-container .dragbox.equation").each(function(k,v) {
            $(v).css({top: ((k+1) * ( $(v).hasClass("short") ? 80 : 100) ) + "px", left: (($(v).parent().width()-$(v).width())/2) + "px"});
            $(v).data("value", eval($.trim($(v).text())) );
        });
        draggables.init({
            selector: ".drag-answer-container > .dragbox",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".exe-container-question .answer-container ",
            accept: ".dragbox.equation",
            centerContent: true
        });
    },
    solve: function() {
        $(".drag-answer-container .dragbox").each(function(k,drag) {
            var parentElement = ".exe-container-question";
            $( parentElement + " .answer-container").each(function(kk,cont) {
                                
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
        for (var i = exercise.params.number_pairs; i > -1; i--) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            
            if ($(answer_analyser.params.selectors[1]).eq(i).length > 0 && 
                $(answer_analyser.params.selectors[1]).eq(i).data("value") == correct) {
               $(answer_analyser.params.selectors[1]).eq(i).addClass("correct") ;
            }            
        }        
    },
    mark_wrong: function() {        
        for (var i = exercise.params.number_pairs; i > -1; i--) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            
            if ($(answer_analyser.params.selectors[1]).eq(i).length > 0 && 
                $(answer_analyser.params.selectors[1]).eq(i).data("value") != correct) {
                $(answer_analyser.params.selectors[1]).eq(i).addClass("wrong") ;
            }            
        }      
    },
    revert_wrong: function() {     
       if ( $(answer_analyser.params.selectors[0]).length == $(answer_analyser.params.selectors[1]).length ) {
       for (var i = exercise.params.number_pairs; i > -1; i--) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            
            if ($(answer_analyser.params.selectors[1]).eq(i).length > 0 && 
                $(answer_analyser.params.selectors[1]).eq(i).data("value") != correct) {
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