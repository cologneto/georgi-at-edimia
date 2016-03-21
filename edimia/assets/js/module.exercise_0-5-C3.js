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
            "c0-5-c3",
            "layout float fluid cols-2 col-w80 no-header "
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
        
        var oImg1 = null, oImg2 = null;
        
        var equations = [_helper.randomEquation( exercise.generated_numbers[0] ), _helper.randomEquation( exercise.generated_numbers[1] ), _helper.randomEquation( exercise.generated_numbers[2] )];
        $(".exe-container-question").html('');
        
        console.log(equations);
           
        for (var kk = 0; kk < exercise.params.number_pairs; kk++) {
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
            
           var temp_classname = "full-height layout-0011 equation-num-right math-sign-equal margin";
            
            if(kk > 0){
                temp_classname = temp_classname + " top-margin"; 
            }
            
            $(".exe-container-question").append( twig({ref: "equation"}).render({
                    
                    classname:temp_classname,
                    num1: '',
                    imgstr1: '',
                    num2: exercise.generated_numbers[0],
                    imgstr2: twig({ref: "imageholder"}).render({
                        
                        classname:'img-contain-big width_90'
                        
                    }),
                    numberdots: exercise.params.bShowNumbrDots?"number-dots":""
                    //mathSignOperator: exercise.params.operationSign
                })
            );
    
            var i = 0;
            var nums = equations[kk].split("-");
            for (i=0; i<nums[0] - nums[1]; i++) {
                $(".equation-container").eq(kk).find(".number-image-holder").append( oImg1.html(1, "still") );
            }
            for (i=0; i<nums[1]; i++) {
                $(".equation-container").eq(kk).find(".number-image-holder").append( oImg2.html(1, "still") );
            }
        }
        
        $(".exe-container-answer")
                .append( $(twig({ref: "answercontainer"}).render({ classname:"answer-border smaller-width"})).data("value", exercise.generated_numbers[0] ) )
                .append( $(twig({ref: "answercontainer"}).render({ classname:"answer-border smaller-width"})).data("value", exercise.generated_numbers[1] ) )
                .append( $(twig({ref: "answercontainer"}).render({ classname:"answer-border smaller-width"})).data("value", exercise.generated_numbers[2] ) );
        var equations = _helper.array_shuffle([
            equations[0],
            equations[1],
            equations[2],
            _helper.randomFalseEquation()
        ]);
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
                    classname:" no-left",
                    image: twig({ref: "dragbox"}).render({
                                content: equations[0]
                            }) + 
                            twig({ref: "dragbox"}).render({
                                content: equations[1]
                            }) + 
                            twig({ref: "dragbox"}).render({
                                content: equations[2]
                            }) + 
                            twig({ref: "dragbox"}).render({
                                content: equations[3]
                            })  }) );
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 100) + "px"});
            $(v).css({left: 0 });            
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
        $(answer_analyser.params.selectors[1]).each(function(k, v) {
             if ($(v).data("value") != exercise.generated_numbers[k]) {
                 exercise.revertDropped(v);
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