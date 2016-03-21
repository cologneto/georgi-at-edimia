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
            selectors: [".equation-container", ".exe-container-question .answer-container .dragbox", ".exe-container-answer .answer-container .dragbox"]
        });
        
        var aConfigClasses = [
            "c0-5-c10",
            "layout fluid cols-2 col-w80 no-header"
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
        _helper.randomSequence(3, true);

        var equations = [];
        var images = ['', '', ''];
        var oImg1 = null, oImg2 = null, i = 0;
        for (i = 0; i < exercise.params.number_pairs; i++) {
            var eq = _helper.randomEquation( exercise.generated_numbers[i] );
            equations.push( eq );
            
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
            
            var substr = eq.split("-");
            for (var m = 0; m < parseInt(substr[0]) - parseInt(substr[1]); m++) {
                images[i] += oImg1.html( 1, "max-height40 top-margin" );
            }
            for (var m = 0; m < parseInt(substr[1]); m++) {
                images[i] += oImg2.html( 1, "max-height40 top-margin" );
            }
        }
        equations = _helper.array_shuffle( equations );
        
        for (i = 0; i < exercise.params.number_pairs; i++) {
            $(".exe-container-question").append(
                $( twig({ref: "equation"}).render({
                    classname: " layout-1111 wide-num1 small-signs ", 
                    num1: '',
                    imgstr1: twig({ref: "imageholder"}).render({classname: "full-width paddin-only-left",imgsrc: images[i]}),
                    //imgstr1: images[i],
                    num2: '',
                    imgstr2: twig({ref: "answercontainer"}).render({classname:"answer-border",value: exercise.generated_numbers[i]})
                }) ).attr("data-value", exercise.generated_numbers[i])
            );
        } 
        

        $(".exe-container-answer")
                .append( $(twig({ref: "answercontainer"}).render({classname: "answer-border smaller-width animated bounceInLeft "})).data("value", exercise.generated_numbers[0] ) )
                .append( $(twig({ref: "answercontainer"}).render({classname: "answer-border smaller-width animated bounceInLeft"})).data("value", exercise.generated_numbers[1] ) )
                .append( $(twig({ref: "answercontainer"}).render({classname: "answer-border smaller-width animated bounceInLeft"})).data("value", exercise.generated_numbers[2] ) );
 
        $("#exercise-drag-target-area").addClass('width-extended').html( twig({ref: "dragitem"}).render({ 
                    image: twig({ref: "dragbox"}).render({
                                content: equations[0],
                                classname: "equation no-left"
                            }) + 
                            twig({ref: "dragbox"}).render({
                                content: equations[1],
                                classname: "equation no-left"
                            }) + 
                            twig({ref: "dragbox"}).render({
                                content: equations[2],
                                classname: "equation no-left"
                            }) +
                            twig({ref: "dragbox"}).render({
                                content: exercise.generated_numbers[0],
                                classname: "number"
                            }) + 
                            twig({ref: "dragbox"}).render({
                                classname: "no-left",
                                content: exercise.generated_numbers[1],
                                classname: "number"
                            }) + 
                            twig({ref: "dragbox"}).render({
                                
                                content: exercise.generated_numbers[2],
                                classname: "number"
                            }) 
                        }) );
        $(".drag-answer-container .dragbox.equation").each(function(k,v) {
            $(v).css({top: ((k+1) * 100) + "px"});
            $(v).data("value", eval($.trim($(v).text())) );
        });
        $(".drag-answer-container .dragbox.number").each(function(k,v) {
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
            accept: ".dragbox.number",
            centerContent: true
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