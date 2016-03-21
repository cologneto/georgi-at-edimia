var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            numpairs: 2,
            selectors: [".selector-marker", ".selector-marker .dragbox"]
        });
        
        var aConfigClasses = [
            "c2DDE",
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
        
        var numb = [_helper.rangeRandom(exercise.params.min,exercise.params.max)];    
        var opr1 = _helper.randomBit() ? "+" : "-";
        var opr2 = _helper.randomBit() ? "+" : "-";
        
        if(opr1 == "+"){
            numb.push(_helper.rangeRandom(exercise.params.min,(10-numb[0])));
        }
        else{
            numb.push(_helper.rangeRandom(exercise.params.min,numb[0]));
        };
        
        var temp = eval(numb[0] + opr1 + numb[1]);
        
        if(opr2 == "+"){
            numb.push(_helper.rangeRandom(exercise.params.min,(10-temp)));
        }
        else{
            numb.push(_helper.rangeRandom(exercise.params.min,temp));
        };
        
        
        
        var res = eval((numb[0] + opr1 + numb[1]) + opr2 + numb[2]);
        
       // sub.push(_helper.rangeRandom(0,sub[0]));
       // sub.push(_helper.rangeRandom(numb,sub[1]));
        exercise.generated_numbers = [numb[0],numb[1],numb[2]];
        
        
        
        
        $(".exe-container-question").html( 
            twig({ref: "equation"}).render({ 
                classname:"contain-eq half-width equation-marg-left5",
                num1class: "has-text med",
                num2class: "has-text med",
                num3class: "has-text med",
                num1: numb[0], 
                imgstr1: numb[0], 
                num2: numb[1],
                imgstr2: numb[1],
                num3: numb[2], 
                imgstr3: numb[2],   
            }) 
        );

        $(".exe-container-question").data("value",res).append( 
            twig({ref: "equation"}).render({ 
                classname:"layout-00011",
                num3class: "has-text med",
                imgstr3: res,
                num3:res
            }) 
        );
    
        $(".math-sign-operator").eq(0).data("value" , opr1).addClass("dashed small square selector-marker");
        $(".math-sign-equal").eq(0).data("value" , opr2).addClass("dashed small square selector-marker");
        
        $(".equation-container-full .math-sign").eq(3).addClass("med");
        $(".equation-container-full .math-sign-equal").eq(0).text("");
        
         $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
            image: twig({ref: "dragbox"}).render({
                        classname: "short small value+",
                        content: "+"
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small value-",
                        content: "-"
                    })
            }) 
        );
        $(".drag-answer-container .dragbox").each(function(k,v) {
            $(v).css({top: ((k+1) * 80) + "px", left: (($(".drag-answer-container").width() - $(this).width())/2) + "px"});
            $(v).data("value", $.trim($(v).text()) );
        });
        
        draggables.init({
            selector: ".drag-answer-container > .dragbox",
            clone: false,
            revert: true,
            revertAppendTo: ".drag-answer-container"
        });
        droppables.init({
            selector: ".exe-container-question .dashed",
            accept: ".dragbox.short",
            centerContent: true
        });
    },

    solve: function() {
        exercise.clear(function() {            
            $(".input-answer-holder").eq(0).removeClass("wrong correct");
            $(".input-answer-holder").eq(0).find("input").val( exercise.generated_numbers[0] ).removeClass("clear");
            
            $(".input-answer-holder").eq(1).removeClass("wrong correct");
            $(".input-answer-holder").eq(1).find("input").val( exercise.generated_numbers[1] ).removeClass("clear");
            
            $(".input-answer-holder").eq(2).removeClass("wrong correct");
            $(".input-answer-holder").eq(2).find("input").val( exercise.generated_numbers[2] ).removeClass("clear");
        });
    },
    mark_correct: function() {
        $(".input-answer-holder").addClass("correct");
    },
    mark_wrong: function() {
        $(".input-answer-holder").addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(".input-answer-holder").find("input").addClass("clear");            
        }
        else {
            $(".input-answer-holder").removeClass("wrong");         
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


