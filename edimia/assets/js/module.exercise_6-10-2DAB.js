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
            selectors: [".equation-num-right .dragbox", ".equation-num-result .dragbox"]
        });
        
        var aConfigClasses = [
            "c6-10-2DAA",
            "layout no-answer auto-height padding-side"
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
     
        _helper.randomSequence(1);
        
        var equation = _helper.randomEquation( exercise.generated_numbers[0] );  
        var solutions = equation.split("+");
        solutions.push ( _helper.rangeRandomSkipUsed(exercise.params.min, exercise.params.max, solutions) );
        
        oImg = new number_image({
            collection: "robot",
            category: "robot"
        });
        
        $(".exe-container-header").addClass("small-margin").html( twig({ref: "imageholder"}).render({classname: "text-center", imgsrc: oImg.html(1, "no-float")}) );
       
        $(".exe-container-question").html(
            $( twig({ref: "equation"}).render({
                classname: 'layout-1010 padding-side',                                 
                imgstr1: twig({ref: "answercontainer"}).render({classname: "dashed", value: 0}),
                imgstr2: twig({ref: "answercontainer"}).render({classname: "dashed", value: 0})
            }) )
        );
        
        
        oImg = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });
        
        var drag_eq = "";
        $.each(solutions, function(k,v) {
            drag_eq += twig({ref: "imageholder"}).render({
                classname: "text-center limit-height h100 add-pricetag", 
                imgsrc: oImg.html(1, "no-float pricetag", v)
            });
            oImg.resetType();
        });
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({ image:  drag_eq }) );
        
        $(".drag-answer-container .number-image-holder").each(function(k,v) {
            $(v).css({top: ((k+1) * ( $(v).hasClass("short") ? 80 : 100) ) + "px", left: (($(v).parent().width()-$(v).width())/2) + "px"});
            $(v).data("value", eval($.trim($(v).text())) );
        });
        
        console.log(exercise.generated_numbers[0] + " -> " + solutions);
        return;
        
        draggables.init({
            selector: ".drag-answer-container > .number-image-holder",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".exe-container-question .answer-container ",
            accept: ".number-image-holder",
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

        for (var i = 0; i < exercise.params.number_pairs; i++) {
          //  var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            
           // if ($(answer_analyser.params.selectors[0]).eq(i).length > 0 && 
              if ($(answer_analyser.params.selectors[0]).eq(i).data("value") != $(answer_analyser.params.selectors[1]).eq(i).data("value")) {
                exercise.revertDropped( $(answer_analyser.params.selectors[0]).eq(i) );
                exercise.revertDropped( $(answer_analyser.params.selectors[1]).eq(i) );
            }
         //   if ($(answer_analyser.params.selectors[1]).eq(i).length && 
         //       $(answer_analyser.params.selectors[1]).eq(i).data("value") != correct) {
         //       exercise.revertDropped( $(answer_analyser.params.selectors[1]).eq(i) );
         //   }
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
