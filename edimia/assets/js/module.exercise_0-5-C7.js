var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-header", ".input-answer-holder"]
        });

        var aConfigClasses = [
            "c0-5-c7",
            "layout header fluid cols-2 col-w80"
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

        _helper.randomPair();
        var aAnswers = _helper.close_solutions_single();
        
        var oImg1 = new number_image({
            collection: "fruit",
            category: "still",
            pricetag: true
        });
        var oImg2 = new number_image({
            collection: "coin",
            category: "still",
            type: "kr"
        });
        
        var i = 0;
        var coins = ['', ''];
        
        for (i=0; i < exercise.generated_numbers[0]; i++) {
            coins[0] += oImg2.html(1, "still max-height40");
           
            
            
        }
        for (i=0; i < exercise.generated_numbers[1]; i++) {
            coins[1] += oImg2.html(1, "still max-height40");
        }
        
        $(".exe-container-header").data("value", exercise.generated_numbers[0] - exercise.generated_numbers[1]).html( 
            twig({ref: "equation"}).render({
                classname:"layout-1010 add-pricetag wide-num2 bottom-margin",
                num1: '',
                imgstr1: twig({ref: "imageholder"}).render({
                    classname: "full-width relpos img-center-pricetag",  
                    imgsrc: oImg1.html(1, "still max-height90 pricetag", exercise.generated_numbers[0])} ),
                num2: '',
                imgstr2: twig({ref: "imageholder"}).render({
                    classname: "full-width",  
                    imgsrc: coins[0] } )
            }) + 
            twig({ref: "equation"}).render({
                classname:"layout-1010 add-pricetag wide-num2 bottom-margin",
                num1: '',
                imgstr1: twig({ref: "imageholder"}).render({
                    classname: "full-width relpos img-center-pricetag",    
                    imgsrc: oImg1.html(1, "still max-height90 pricetag", exercise.generated_numbers[1])} ),
                num2: '',
                imgstr2: twig({ref: "imageholder"}).render({
                    classname: "full-width",  
                    imgsrc: coins[1] } ) 
            })
        );
                 ;
        
        
        $(".exe-container-question").data("value", '').html(
            twig({ref: "equation"}).render({
                classname:"top-margin60 layout-1111 same-width ",
                num1class: "has-text large",
                num2class: "has-text large",
                num1: exercise.generated_numbers[0],
                imgstr1: exercise.generated_numbers[0],
                num2: exercise.generated_numbers[1],
                imgstr2: exercise.generated_numbers[1],
                mathSignOperator: exercise.params.operationSign
            })
        );
        $(".exe-container-answer").html(
            twig({ref: "answer"}).render({
                
                classname:"top-margin60"
                
            }) 
        );
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min}) );
    },
    solve: function() {
        exercise.clear(function() {
            var correct = $(answer_analyser.params.selectors[0]).data("value");
            $(answer_analyser.params.selectors[1]).removeClass("wrong correct");
            $(answer_analyser.params.selectors[1]).find("input").val( correct ).removeClass("clear");
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