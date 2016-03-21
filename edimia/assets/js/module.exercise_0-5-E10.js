var exercise = {
    iSolveDelay: 300,   // ms
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
            "c0-5-E10",
            "layout no-header no-answer auto-height padding-side"
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
        $(".exe-container-question").html('');
        
        exercise.getOperation();
        _helper.randomSequence(3, true);

        var equations = [];
        var i = 0;
        for (i = 0; i < exercise.params.number_pairs; i++) {
            exercise.setOperation( "addition" );
            equations.push( _helper.randomEquation( exercise.generated_numbers[i] ) );
            
            exercise.setOperation( "subtraction" );
            equations.push( _helper.randomEquation( exercise.generated_numbers[i] ) );
        }
        equations = _helper.array_shuffle( equations );
        
        for (i = 0; i < exercise.params.number_pairs; i++) {
            $(".exe-container-question").append(
                $( twig({ref: "equation"}).render({
                    classname: '',
                    num1class: 'has-text',
                    mathSignOperator: '=',
                    imgstr1: exercise.generated_numbers[i],
                    imgstr2: twig({ref: "answercontainer"}).render({classname: "short dashed", value: exercise.generated_numbers[i]}),
                    imgstr3: twig({ref: "answercontainer"}).render({classname: "short dashed", value: exercise.generated_numbers[i]})
                }) ).attr("data-value", exercise.generated_numbers[i])
            );
        }
        
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
            selector: ".exe-container-question .answer-container ",
            accept: ".dragbox.equation",
            centerContent: true
        });
    },
    solve: function() {
        $(".drag-answer-container .dragbox").each(function(k,drag) {
            var parentElement = $(drag).hasClass("equation") ? ".exe-container-question" : ".exe-container-answer" ;
//            console.log( parentElement + " .answer-container -> " + $( parentElement + " .answer-container").length );
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
//        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
//        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {

        for (var i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            
            if ($(answer_analyser.params.selectors[1]).eq(i).length > 0 && 
                $(answer_analyser.params.selectors[1]).eq(i).data("value") != correct) {
                exercise.revertDropped( $(answer_analyser.params.selectors[1]).eq(i) );
            }
            if ($(answer_analyser.params.selectors[2]).eq(i).length && 
                $(answer_analyser.params.selectors[2]).eq(i).data("value") != correct) {
                exercise.revertDropped( $(answer_analyser.params.selectors[2]).eq(i) );
            }
        }
    },
    revertDropped: function(v) {
        var m = $(v).offset().left - $(".drag-answer-container").offset().left;
        var n = $(v).offset().top - $(".drag-answer-container").offset().top;

        $(v).css({
            top: n,
            left: m,
            right: "auto"
        });
        $(v).detach().appendTo( ".drag-answer-container" ).removeClass("dropped");
        var pos = $(v).data("position");
        $(v).stop().animate({
            left: pos.left, //$(".drag-answer-container").width() / 2 - $(db).width() / 2,
            top: pos.top    //$(".drag-answer-container").height() / 2 - $(db).height() / 2
        }, 300);
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