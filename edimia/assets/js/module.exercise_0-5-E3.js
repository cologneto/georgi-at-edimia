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
            selectors: [".exe-container-answer .answer-container", ".exe-container-answer .answer-container .dragbox"]
        });

        var aConfigClasses = [
            "c0-5-E3",
            "show-question",
            "grid-q55-a45",
            "question-equation image-content-limit-45px equation-0011 img-motion-float-right",
            "answer-dotted answer-dotted-pad has-dragboxes dragbox-equation"
        ];
        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render( ));   //{exerciseclassname: aConfigClasses.join(" ") }
            $("#exercise-drag-target-area").parent().addClass( aConfigClasses.join(" ") );
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
        
        var eqs = {}, equations = [];
        var oImg1 = null, oImg2 = null, i = 0;
        var values = [];
        
        var operationIndex = _helper.array_shuffle([0, exercise.params.operationMix.length - 1]);
        $.each(operationIndex, function(k,v) {
            
            exercise.setOperation( exercise.params.operationMix[ v ] );
            exercise.generated_numbers[0] = _helper.rangeRandom( exercise.params.operation == "subtraction" ? 1 : 2, exercise.params.max - (exercise.params.operation == "subtraction"? 1 : 0) );
            do {
                eqs[exercise.params.operation] = _helper.randomEquation( exercise.generated_numbers[0] );
            } while ( eqs[exercise.params.operation].match(/^0|[\-\+]0$/) != null )
        
            values.push( exercise.generated_numbers[0] );
        });
        exercise.generated_numbers = values;        
        
        equations = [ eqs.addition, eqs.subtraction];
        equations.push( _helper.randomFalseEquationSpecial( equations ) );
        equations = _helper.array_shuffle( equations );
        
        operationIndex = _helper.array_shuffle([0, exercise.params.operationMix.length - 1]);
        $.each(operationIndex, function(k,v) {
            exercise.setOperation( exercise.params.operationMix[ v ] );
            var imgstr = "";
            if ( exercise.params.operation == "addition" ) {
                oImg1 = new number_image({
                    collection: "animal",
                    category: "still"
                });
                oImg2 = new number_image({
                    collection: "animal",
                    category: "motion",
                    type: oImg1.params.type
                });
                var p = eqs.addition.split("+");
                for (i=0; i<p[0]; i++) {
                    imgstr += oImg1.html(1, "still");
                }
                for (i=0; i<p[1]; i++) {
                    imgstr += oImg2.html(1, "motion");
                }
            }
            else {
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
                var p = eqs.subtraction.split("-");
                for (i=0; i<p[0] - p[1]; i++) {
                    imgstr += oImg1.html(1, "still no-float");
                }
                for (i=0; i<p[1]; i++) {
                    imgstr += oImg2.html(1, "still no-float");
                }
            }
            
            $(".exe-container-question").append( 
                twig({ref: "equation"}).render({
                    imgstr2: imgstr
                }) 
            );
        });
        
        $(".exe-container-answer")
            .append( $(twig({ref: "answercontainer"}).render({classname: "animated bounceInRight"})).data("value", eqs[exercise.params.operationMix[ operationIndex[0] ]] ) )
            .append( $(twig({ref: "answercontainer"}).render({classname: "animated bounceInRight"})).data("value", eqs[exercise.params.operationMix[ operationIndex[1] ]] ) );
    
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
            image: twig({ref: "dragbox"}).render({
                        content: equations[0]
                    }) + 
                    twig({ref: "dragbox"}).render({
                        content: equations[1]
                    }) + 
                    twig({ref: "dragbox"}).render({
                        content: equations[2]
                    })
            }) 
        );
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 100) + "px"});
            $(v).data("value", $.trim($(v).text()) );
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
            var parentElement = $(drag).hasClass("equation") ? ".exe-container-question" : ".exe-container-answer" ;

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
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {

        $(answer_analyser.params.selectors[0]).each(function(i,v) {
            var correct = $(v).data("value");
            
            if ($(this).find(".dragbox").length > 0 && 
                $(this).find(".dragbox").data("value") != correct) {
                exercise.revertDropped( $(this).find(".dragbox") );
            }
        });
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