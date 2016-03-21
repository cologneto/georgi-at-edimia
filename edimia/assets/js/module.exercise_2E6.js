var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "equationcreator_ansrs",
            selectors: [".input-answer-holder", ".math-sign .dragbox"]
        });
        
        var aConfigClasses = [
            "c2E6",
            "layout clickbuttons-two show-drag-area"
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
        
        var questionTexts = ["Hur mycket kostar de tillsammans?",
                             "Hur mycket far du tillbaka?",
                             "Hur mycket dyrare ar den ",
                             "Hur mycket ska du betala?"];
       
        var Type = _helper.rangeRandom(0,3);
      
        switch(Type){
            
            case 0://56A
                exercise.setOperation( "addition" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.correct_equation = exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1];
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

                $(".exe-container-header").data("value", eval(exercise.correct_equation)).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[0])}) +
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg2.html(1, "no-float", exercise.generated_numbers[1])})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[Type], classname: "animated bounceInRight"}));    
                
               
                    
                break;
            case 1://56B
                exercise.setOperation( "subtraction" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.correct_equation = exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1];
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

                $(".exe-container-header").data("value", eval(exercise.correct_equation)).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[1])}) +
                        twig({ref: "imageholder"}).render({classname:"half-width text-center" ,imgsrc: oImg2.html(exercise.generated_numbers[0], "no-float")})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[1], classname: "animated bounceInRight"}));    
                
              
                break;
            case 2://56C
                exercise.setOperation( "subtraction" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.correct_equation = exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1];
                var oImg1 = new number_image({
                collection: "fruit",
                category: "still",
                pricetag: true
                });    
                var fruits = ["apple", "pear", "banana", "lemon", "orange"];
                fruits.splice( $.inArray(oImg1.params.type,fruits) ,1 );
                var randType = _helper.rangeRandom(0,3);
                var oImg2 = new number_image({
                    collection: "fruit",
                    category: "still",
                    type:fruits[randType],
                    pricetag: true
                });

                $(".exe-container-header").data("value", eval(exercise.correct_equation)).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[0])}) +
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg2.html(1, "no-float", exercise.generated_numbers[1])})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[Type] + oImg1.params.type + " ?", classname: "animated bounceInRight"}));    
                
             
                    
                break;
            case 3://56D
                exercise.setOperation( "addition" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.correct_equation = exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1];
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

                $(".exe-container-header").data("value", eval(exercise.correct_equation)).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[0])}) +
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg2.html(1, "no-float", exercise.generated_numbers[1])})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[Type], classname: "animated bounceInRight"}));    
                
                 break;
        }
        
              exercise.generated_numbers.push(eval(exercise.generated_numbers[0] + exercise.params.operationSign + exercise.generated_numbers[1]));
        
              $(".exe-container-answer")
                    .append(twig({ref: "equation"}).render({
                        classname: "same-width drop-signs equation-marg-left5",
                        imgstr1: twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}),
                        mathSignOperator: exercise.params.operationSign,
                        imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2}),
                        imgstr3: twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2})
                    }))
                    .append(twig({ref: "equation"}).render({
                        classname: "layout-10101-txt-in-txt eq2 space-top",
                        num1class: 'has-text',
                        num3class: 'has-text',
                        imgstr1: "Svar: ",
                        imgstr3: "kr",
                        mathSignOperator: exercise.params.operationSign,
                        imgstr2: twig({ref: "answerinput"}).render({startvalue: exercise.params.min,maxlen:2})                    
                    })).addClass("space-top");
                      
              $(".math-sign-operator").eq(0).data("value" , exercise.params.operationSign).addClass("dashed small square");      
              $(".math-sign-equal").eq(0).data("value" , "=").addClass("dashed small square");             
        
        $("#exercise-drag-target-area").html( twig({ref: "dragitem"}).render({
            image: twig({ref: "dragbox"}).render({
                        classname: "short small value+",
                        content: "+"
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small value-",
                        content: "-"
                    }) + 
                    twig({ref: "dragbox"}).render({
                        classname: "short small value=",
                        content: "="
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
            selector: ".exe-container-answer .math-sign",
            accept: ".dragbox.short",
            centerContent: true
        });
        
        
        
        
    },

    solve: function() {
        exercise.clear(function() {
            var correct = [exercise.generated_numbers[0], exercise.generated_numbers[1], eval(exercise.generated_numbers[0]+""+exercise.params.operationSign+""+exercise.generated_numbers[1]),eval(exercise.generated_numbers[0]+""+exercise.params.operationSign+""+exercise.generated_numbers[1]) ];
            for (var i = 0; i < 4; i++) {
                $(answer_analyser.params.selectors[0]).eq(i).removeClass("wrong correct");
                $(answer_analyser.params.selectors[0]).eq(i).find("input").val( correct[i] ).removeClass("clear");
                
                
            }
            
            $(".equation-container-full .math-sign").each(function(k,drag) {
                 $(".equation-container-full .math-sign .dragbox").each(function(kk,cont) {
                      if ( $(cont).children().length == 0 && $(drag).data("value") != $(cont).data("value") ) {
                          exercise.revertDropped( $(cont) );
                      };
                 });   
            });
           
            
            $(".drag-answer-container .dragbox").each(function(k,drag) {   
                $(".equation-container-full .math-sign").each(function(kk,cont) {

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
        });
 
    },
    mark_correct: function() {
    //    $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
    //    $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function(bForceSolve) {
        if (typeof(bForceSolve) == "undefined") {
            bForceSolve = false;
        }
        if (bForceSolve) {
           
        }
        else {
             
            
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






