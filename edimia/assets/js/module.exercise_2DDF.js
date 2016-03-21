var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".selector-marker", ".input-answer-holder"],
            numpairs: exercise.params.number_pairs 
        });

        var aConfigClasses = [
            "c2DDF",
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
        
        var frt = ["apple", "pear", "banana", "lemon", "orange"];
        var fruits_numb = [_helper.rangeRandom(0,4)];
        fruits_numb.push(_helper.rangeRandomSkipUsed(0,4,fruits_numb));
        
        
        var oImg1 = new number_image({
            collection: "fruit",
            category: "still",
            type:frt[fruits_numb[0]]
        });
        var oImg2 = new number_image({
            collection: "fruit",
            category: "still",
            type:frt[fruits_numb[1]]
        });
        
        var numbs = [_helper.rangeRandom(exercise.params.min,exercise.params.max)];
        numbs.push(_helper.rangeRandomSkipUsed(exercise.params.min,exercise.params.max,numbs));
        
        var n_min = Math.min(numbs[0],numbs[1]);
       // var n_min = Math.min.apply(Math,numbs);
        
        var second = [_helper.rangeRandom(0,n_min)];
        second.push(_helper.rangeRandom(0,n_min));
      
              
        $(".exe-container-question").append( 
           $( twig({ref: "equation"}).render({
                classname: "",
                num1class: "has-text large",
                num2class: "has-text large",
                num3class: "has-text large",
                mathsignclass: "large",
                num1: numbs[0], 
                imgstr1: numbs[0], 
                num2: second[0], 
                imgstr2: twig({ref: "imageholder"}).render({imgsrc: oImg1.html(1,"still")}),
                imgstr3: numbs[0]-second[0],
                mathSignOperator: "-"
                
            }))
        );  
        
        
            
        $(".exe-container-question").append( 
           $( twig({ref: "equation"}).render({
                classname: "",
                num1class: "has-text large",
                num2class: "has-text large",
                num3class: "has-text large",
                mathsignclass: "large",                 
                imgstr2: second[1], 
                num2: second[1], 
                imgstr1: twig({ref: "imageholder"}).render({imgsrc: oImg2.html(1,"still")}),
                imgstr3: eval(numbs[1] - second[1]),
                mathSignOperator: "-"
                
            })).addClass("space-top")
        );  

         $(".exe-container-question").append( 
           $( twig({ref: "equation"}).render({
                classname: "selector-marker",
                num1class: "has-text large",
                num2class: "has-text large",              
                mathsignclass: "large",                
                imgstr1: twig({ref: "imageholder"}).render({imgsrc: oImg2.html(1,"still")}),                
                imgstr2: twig({ref: "imageholder"}).render({imgsrc: oImg1.html(1,"still")}),
                imgstr3: twig({ref: "answer"}).render(),
                mathSignOperator: "-"
                
            })).data("value",numbs[1] - second[0]).addClass("space-top")
        );  
        
        
        $(".answer-container").html( twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}) );     
       
        
       
        
        $(".equation-container-full .math-sign").addClass("large");
        
        
    },

    solve: function() {
        exercise.clear(function() {
            for (i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            $(answer_analyser.params.selectors[1]).eq(i).removeClass("wrong correct");            
            $(answer_analyser.params.selectors[1]).eq(i).find("input").val( correct ).removeClass("clear");
        };
        });
    },
    mark_correct: function() {
    
    for (i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            if($(answer_analyser.params.selectors[1]).eq(i).data("value") == correct)
            {        
                $(answer_analyser.params.selectors[1]).eq(i).addClass("correct");
            }      
            
        };
    },
    mark_wrong: function() {
         for (i = 0; i < exercise.params.number_pairs; i++) {
            var correct = $(answer_analyser.params.selectors[0]).eq(i).data("value");
            if(!($(answer_analyser.params.selectors[1]).eq(i).data("value") == correct))
            {        
                $(answer_analyser.params.selectors[1]).eq(i).addClass("wrong");
            }      
            
        };
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

