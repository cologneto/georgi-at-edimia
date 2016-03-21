var exercise = {
    iSolveDelay: 300,   // ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "equalselectors",
            numpairs: exercise.params.number_pairs,
            selectors: [".equation-num-right .dragbox",".math-sign-operator", ".equation-num-result .dragbox" , ".exe-container-question"]
        });
        
        var aConfigClasses = [
            "c6-10-2DAB",
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
        
        var sum = _helper.rangeRandom(exercise.params.min,exercise.params.max);
        var ansrs1 = sum - _helper.rangeRandom(0 , sum);
        var ansrs2 = sum - ansrs1;
        var aAnswers = [];       
        aAnswers.push(  ansrs1  );  
        aAnswers.push(  ansrs2  );   
        aAnswers.push( _helper.rangeRandom(exercise.params.min,exercise.params.max) );
        
        aAnswers = _helper.array_shuffle( aAnswers );
        
        var oImgRobot = new number_image({
            collection:"robot",            
            category: "robot"
            
        });
        
         $(".exe-container-header").html(
            twig({ref: "imageholder"}).render({
                classname: "text-center",
                imgsrc: oImgRobot.html(1,"no-float no-margin")
            })
        ).addClass("no-margin");
        
        for (i = 0; i < exercise.params.number_pairs; i++) {
            $(".exe-container-question").data("value",sum).append(
                $( twig({ref: "equation"}).render({
                    classname: 'layout-00101-drag',
                    num1class: 'has-text', 
                    imgstr2: twig({ref: "answercontainer"}).render({classname: "dashed",value: ansrs1}),
                    num2: ansrs1,
                    imgstr3: twig({ref: "answercontainer"}).render({classname: "dashed",value: ansrs2}),
                    num3: ansrs2
                }) )
            );
        }
        
        $(".math-sign-operator").data("value","+");
        
        var oImg1 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true            
        });
        var oImg2 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });
        var oImg3 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });
        
          var drag_eq = "";
        
            drag_eq += twig({ref: "dragbox"}).render({
                            content: oImg1.html(1, "answer-drag-item drag-img-large" , aAnswers[0]),
                            classname: "equation short add-pricetag-drag"
                        });
            drag_eq += twig({ref: "dragbox"}).render({
                            content: oImg2.html(1, "answer-drag-item drag-img-large" , aAnswers[1]),
                            classname: "equation short add-pricetag-drag"
                        });
            drag_eq += twig({ref: "dragbox"}).render({
                            content: oImg3.html(1, "answer-drag-item drag-img-large" , aAnswers[2]),
                            classname: "equation short add-pricetag-drag"
                        });         
    
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({ image:  drag_eq }) );
        
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 160 ) + "px", left: (($(v).parent().width()-$(v).width())/2) + "px" , background: "none"});
            $(v).data("value", aAnswers[k]);
        });
        $(".dragbox").css("box-shadow","none");
        draggables.init({
            selector: ".drag-answer-container > .dragbox",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".exe-container-question .answer-container ",
            accept: ".dragbox",
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
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
        $(".equation-container-full .dragbox").each(function(kk,cont) {
        exercise.revertDropped( $(cont) );    
        });
       
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
