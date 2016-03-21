var exercise = {
    
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-header", ".click-button-holder > div.checked"]
        });
        
        var aConfigClasses = [
            "c2E5",
            "layout clickbuttons-two"
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
        var aAnswers = [];
        var Type = _helper.rangeRandom(0,3);
        switch(Type){
            
            case 0://56A
                exercise.setOperation( "addition" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
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

                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"+"+ exercise.generated_numbers[1]).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[0])}) +
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg2.html(1, "no-float", exercise.generated_numbers[1])})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[Type], classname: "animated bounceInRight"}));    
                
                    aAnswers = [exercise.generated_numbers[0] + "+" + exercise.generated_numbers[1],
                                exercise.generated_numbers[0] + "-" + exercise.generated_numbers[1] 
                                ];
                    aAnswers = _helper.array_shuffle(aAnswers);            
                
                $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[0], intvalue: aAnswers[0], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[0] ))
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[1], intvalue: aAnswers[1], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[1] ));
         
                    
                break;
            case 1://56B
                exercise.setOperation( "subtraction" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
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

                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"-"+ exercise.generated_numbers[1]).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[1])}) +
                        twig({ref: "imageholder"}).render({classname:"half-width text-center" ,imgsrc: oImg2.html(exercise.generated_numbers[0], "no-float")})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[1], classname: "animated bounceInRight"}));    
                
                    aAnswers = [exercise.generated_numbers[0] + "+" + exercise.generated_numbers[1],
                                exercise.generated_numbers[0] + "-" + exercise.generated_numbers[1] 
                                ];
                    aAnswers = _helper.array_shuffle(aAnswers);            
                
                $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[0], intvalue: aAnswers[0], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[0] ))
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[1], intvalue: aAnswers[1], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[1] ));
         
                break;
            case 2://56C
                exercise.setOperation( "subtraction" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
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

                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"-"+ exercise.generated_numbers[1]).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[0])}) +
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg2.html(1, "no-float", exercise.generated_numbers[1])})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[Type] + oImg1.params.type + " ?", classname: "animated bounceInRight"}));    
                
                    aAnswers = [exercise.generated_numbers[0] + "+" + exercise.generated_numbers[1],
                                exercise.generated_numbers[0] + "-" + exercise.generated_numbers[1] 
                                ];
                    aAnswers = _helper.array_shuffle(aAnswers);            
                
                $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[0], intvalue: aAnswers[0], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[0] ))
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[1], intvalue: aAnswers[1], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[1] ));
         
                    
                break;
            case 3://56D
                exercise.setOperation( "addition" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
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

                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"+"+ exercise.generated_numbers[1]).html( 
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg1.html(1, "no-float", exercise.generated_numbers[0])}) +
                        twig({ref: "imageholder"}).render({classname:"add-pricetag half-width text-center has-label" ,imgsrc: oImg2.html(1, "no-float", exercise.generated_numbers[1])})
                    );
            
                $(".exe-container-question").html(twig({ref: "instruction"}).render({text: questionTexts[Type], classname: "animated bounceInRight"}));    
                
                    aAnswers = [exercise.generated_numbers[0] + "+" + exercise.generated_numbers[1],
                                exercise.generated_numbers[0] + "-" + exercise.generated_numbers[1] 
                                ];
                    aAnswers = _helper.array_shuffle(aAnswers);            
                
                $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[0], intvalue: aAnswers[0], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[0] ))
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[1], intvalue: aAnswers[1], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[1] ));
         
                break;
            
        }
      
    },

    solve: function() {
         var correct = $(answer_analyser.params.selectors[0]).data("value");
        $(".click-button-holder[data-value='"+correct+"'] > div").addClass("correct");
    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
         $(".click-button-holder > div.checked.wrong").removeClass("wrong correct");
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




