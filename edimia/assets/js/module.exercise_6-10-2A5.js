var exercise = {
 
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }
        //    
        answer_analyser.init({
           type: "sumsequence",
            selectors: [".exe-container-question", ".input-answer-holder"]
        });

         var aConfigClasses = [
            "c6-10-2A5",
            "layout no-question auto-height two-image-center-header one-row-answer"
           
          
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

        _helper.randomPair();
        
        exercise.params.min = 0;

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
       
      
        $(".exe-container-header").data("value", exercise.generated_numbers[0] + "" + exercise.generated_numbers[1]).html( 
                twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[0])}) +
                twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[1])})
            );
   
        $(".exe-container-question").data("value", exercise.generated_numbers[0] + "" + exercise.generated_numbers[1]);
   
        $(".exe-container-answer").data("value", exercise.generated_numbers[0] + "" + exercise.generated_numbers[1]).html( 
                twig({ref: "equation"}).render({       
                    classname:"layout-1111 equation-w80",
                    num1: exercise.generated_numbers[0], 
                    imgstr1: twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}), 
                    num2: exercise.generated_numbers[1], 
                    imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}),
                    mathSignOperator: exercise.params.operationSign
                }) 
            );
     
     
       
        $(".exe-container-answer").data("value", '').append( twig({ref: "answer"}).render() );
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );
        
         var oImg1 = new number_image({
            collection: "coin",
            category: "still",
            type: "kr"
        });
         var oImg2 = new number_image({
            collection: "coin",
            category: "still",
            type: "kr"
        });
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
            classname:"twoitem",
            image1: oImg1.html(1, "answer-drag-item drag-img-small-right-twoitem"),
            image2: oImg2.html(5, "answer-drag-item drag-img-small-right-twoitem")
        })   );
        
      
        draggables.init({
            selector: ".drag-answer-container > img",
            clone: true,
            revert: false
        });
    },
    
    solve: function() {
        exercise.clear(function() {
            var correct = [exercise.generated_numbers[0], exercise.generated_numbers[1], exercise.generated_numbers[0] + exercise.generated_numbers[1] ];
            for (var i = 0; i<3; i++) {
                $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");
                $(answer_analyser.params.selectors[1]).eq(i).find("input").val( correct[i] ).removeClass("clear");
            }
        });
    },
    mark_correct: function() {
//        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
//        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
            $(answer_analyser.params.selectors[1]).find("input").addClass("clear");
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