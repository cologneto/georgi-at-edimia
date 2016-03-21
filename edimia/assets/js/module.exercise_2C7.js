var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "substr_equation",
            selectors: [".exe-container-header", ".input-answer-holder"]
        });

        var aConfigClasses = [
            "c2C7",
            "layout no-answer"
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
        
        exercise.params.min = 6;
        exercise.params.max = 10;
        var numb = _helper.rangeRandom(exercise.params.min,exercise.params.max);
        exercise.params.min = 0;
        exercise.generated_numbers = [numb , _helper.rangeRandom(exercise.params.min,numb)];
        
        var oImg1 = new number_image({
        collection: "coin",
        category: "still",
        type: "kr"
        });
        var oImg2 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });

        $(".exe-container-header").data("value", exercise.generated_numbers[0] - exercise.generated_numbers[1]).html(
                twig({ref: "imageholder"}).render({classname: "half-width img-contain-small position-coins has-label label-youhave"}) +
                twig({ref: "imageholder"}).render({classname: "add-pricetag half-width text-center has-label label-tobuy"})
                );
        $(".number-image-holder:first").addClass("value" + exercise.generated_numbers[0]);
        var i = 0;
        for (i = 0; i < exercise.generated_numbers[0]; i++) {
            $(".number-image-holder:first").append(oImg1.html(1, "small"));
        }

        $(".number-image-holder:last").append(oImg2.html(1, "big no-float", exercise.generated_numbers[1]));
        
        
            
        $(".exe-container-question").append( 
           $( twig({ref: "equation"}).render({
                classname: "",
                mathsignclass: "large",                
                imgstr1: twig({ref: "answer"}).render(), 
                imgstr2: twig({ref: "answer"}).render(),
                imgstr3: twig({ref: "answer"}).render(),
                mathSignOperator: exercise.params.operationSign
                
            })).attr("data-value",eval(numb - exercise.generated_numbers[0])).addClass("space-top")
        );  
        
        $(".answer-container").eq(0).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );     
        $(".answer-container").eq(1).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );   
        $(".answer-container").eq(2).html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );   
        $(".equation-container-full .math-sign").addClass("large");
        
        
    },

    solve: function() {
        exercise.clear(function() {
           $(answer_analyser.params.selectors[1]).each(function(k,v) {
                $(this).removeClass("wrong correct");
                if (k<2) {
                    $(this).find("input").val( exercise.generated_numbers[k] ).removeClass("clear");
                }
                else {    
                    $(this).find("input").val( exercise.generated_numbers[0] - exercise.generated_numbers[1] ).removeClass("clear");
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
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(answer_analyser.params.selectors[1]).find("input").addClass("clear");
        }
        else {
            $(answer_analyser.params.selectors[1]).removeClass("wrong");
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







