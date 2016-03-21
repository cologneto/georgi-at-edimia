var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "selector_sequence",
            numpairs: exercise.params.number_pairs,
            selectors: [".equation-container-full", ".equation-num-right .dragbox", ".equation-num-result .dragbox"]
        });
        
        var aConfigClasses = [
            "layout no-header"
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

        exercise.params.min = 2;       
        exercise.generated_numbers = [_helper.rangeRandom(exercise.params.min,exercise.params.max) , _helper.rangeRandom(exercise.params.min,exercise.params.max)];
        exercise.params.min = 0;        
        
        var sum1 = _helper.randomBit() ? 1 : 2;
        var sum2 = _helper.randomBit() ? 1 : 2;                
        var Answers = [exercise.generated_numbers[0],exercise.generated_numbers[1]];        
        var equations = [sum1+"+"+(Answers[0]-sum1) , (Answers[0]-sum1)+"+"+sum1 ,sum2+"+"+(Answers[1]-sum2) , (Answers[1]-sum2)+"+"+sum2 ];
        
        $(".exe-container-question").data("value", Answers[0] ).html( 
          $(  twig({ref: "equation"}).render({
                classname: "pad-sides narrow-signs",
                num1class: "has-text med",
                num1: Answers[0], 
                imgstr1: Answers[0], 
                mathSignOperator: "=",
                imgstr2: twig({ref: "answercontainer"}).render({classname: "short dashed", value: Answers[0]}),
                mathsignclass: "med",
                imgstr3: twig({ref: "answercontainer"}).render({classname: "short dashed", value: Answers[0]})
            })).attr("data-value", Answers[0]) 
        );
        $(".exe-container-answer").data("value", Answers[1] ).html( 
          $(  twig({ref: "equation"}).render({
                classname: "pad-sides narrow-signs",
                num1class: "has-text med",
                num1: Answers[1], 
                imgstr1: Answers[1], 
                mathSignOperator: "=",
                imgstr2: twig({ref: "answercontainer"}).render({classname: "short dashed", value: Answers[1]}),
                mathsignclass: "med",
                imgstr3: twig({ref: "answercontainer"}).render({classname: "short dashed", value: Answers[1]})
            }) ).attr("data-value", Answers[1]) 
        ).addClass("no-margin");

        equations = _helper.array_shuffle(equations);

         var drag_eq = "";         
        $.each(equations, function(k,v) {
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
            selector: ".answer-container ",
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
    //    $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
    //    $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
         
            var correct = $(answer_analyser.params.selectors[0]).eq(1).data("value");
            if ($(answer_analyser.params.selectors[2]).eq(1).length > 0 && 
                $(answer_analyser.params.selectors[2]).eq(1).data("value") != correct) {
                exercise.revertDropped( $(answer_analyser.params.selectors[2]).eq(1) );
            }
            if ($(answer_analyser.params.selectors[1]).eq(1).length && 
                $(answer_analyser.params.selectors[1]).eq(1).data("value") != correct) {
                exercise.revertDropped( $(answer_analyser.params.selectors[1]).eq(1) );
            }
            
            correct = $(answer_analyser.params.selectors[0]).eq(0).data("value");
            if ($(answer_analyser.params.selectors[2]).eq(0).length > 0 && 
                $(answer_analyser.params.selectors[2]).eq(0).data("value") != correct) {
                exercise.revertDropped( $(answer_analyser.params.selectors[2]).eq(0) );
            }
            if ($(answer_analyser.params.selectors[1]).eq(0).length && 
                $(answer_analyser.params.selectors[1]).eq(0).data("value") != correct) {
                exercise.revertDropped( $(answer_analyser.params.selectors[1]).eq(0) );
            }
            
        
    },  
};

for (var sAttributeName in exercise_global) {
    if (exercise[sAttributeName]) {
        alert("Exercise object already has '" + sAttributeName + "' implemented.\n\nPlease consider rewriting that code");
    }
    else {
        exercise[sAttributeName] = exercise_global[sAttributeName];
    }
}