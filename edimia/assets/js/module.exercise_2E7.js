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
            "c2E7",
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
        
        var girls_names = ["Alice",
                           "Elsa",
                           "Julia",
                           "Ella",
                           "Maja",
                           "Ebba",
                           "Emma"
        ];
        var boys_names = [
                           "William",
                           "Oscar",
                           "Lucas",
                           "Hugo",
                           "Elias",
                           "Alexander",
                           "Liam"
        ];
        
        var pronouns = [
                           "han",
                           "hon"
        ];
        
        var pronouns_capp = [
                           "Han",
                           "Hon"
        ];
        
        var have_objects = [    
                           "kulor",
                           "kakor",
                           "bollar"            
        ];
        
        var questionTexts = ["param1 har param2 . param3 far param4 till. Hur manga har param5 da ?",
                             "param1 har param2 . param3 har param4 . Hur manga har de tillsammans ?",
                             "param1 har param2 . param3 tappar param4 . Hur manga har param5 kvar ?",
                             "param1 har param2 . param3 har param4 . Hur manga fler har param1 ?",
                             "param1 har param2 . param3 behover param4 . Hur mycket fattas ?"   ];
        var aAnswers = [];
        var Type = _helper.rangeRandom(0,3);
       
        switch(Type){
            
            case 0://78A
                exercise.setOperation( "addition" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                
                var choice = _helper.randomBit();
                var name,pronoun,obj,pronoun_capp;
                if(choice == true)
                {
                    name = girls_names[_helper.rangeRandom(0,6)];
                    pronoun = pronouns[0];
                    pronoun_capp = pronouns_capp[0];
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }else{
                    name = boys_names[_helper.rangeRandom(0,6)];
                    pronoun = pronouns[1];
                    pronoun_capp = pronouns_capp[1];
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }
                
                var txt = questionTexts[Type];
                txt = txt.replace("param1",name);
                txt = txt.replace("param2",exercise.generated_numbers[0] + " " + obj);
                txt = txt.replace("param3",pronoun_capp);
                txt = txt.replace("param4",exercise.generated_numbers[1]);
                txt = txt.replace("param5",pronoun);
                
                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"+"+ exercise.generated_numbers[1])
                        .html(twig({ref: "instruction"}).render({text: txt, classname: "animated bounceInRight"}));    
                
                break;
            case 1://78B
                exercise.setOperation( "addition" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                
                var choice = _helper.randomBit();
                var name,pronoun,obj,pronoun_capp,secondname;
                if(choice == true)
                {
                    name = girls_names[_helper.rangeRandom(0,6)];
                    secondname = boys_names[_helper.rangeRandom(0,6)];
                    
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }else{
                    name = boys_names[_helper.rangeRandom(0,6)];
                    secondname = girls_names[_helper.rangeRandom(0,6)];
                   
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }
                
                var txt = questionTexts[Type];
                txt = txt.replace("param1",name);
                txt = txt.replace("param2",exercise.generated_numbers[0] + " " + obj);
                txt = txt.replace("param3",secondname);
                txt = txt.replace("param4",exercise.generated_numbers[1]);
                
                
                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"+"+ exercise.generated_numbers[1])
                        .html(twig({ref: "instruction"}).render({text: txt, classname: "animated bounceInRight"}));    
           
                break;
            case 2://78C
                exercise.setOperation( "subtraction" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                
                var choice = _helper.randomBit();
                var name,pronoun,obj,pronoun_capp;
               if(choice == true)
                {
                    name = girls_names[_helper.rangeRandom(0,6)];
                    pronoun = pronouns[0];
                    pronoun_capp = pronouns_capp[0];
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }else{
                    name = boys_names[_helper.rangeRandom(0,6)];
                    pronoun = pronouns[1];
                    pronoun_capp = pronouns_capp[1];
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }
                
                var txt = questionTexts[Type];
                txt = txt.replace("param1",name);
                txt = txt.replace("param2",exercise.generated_numbers[0] + " " + obj);   
                txt = txt.replace("param3",pronoun_capp);
                txt = txt.replace("param4",exercise.generated_numbers[1]);
                txt = txt.replace("param5",pronoun);
                
                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"-"+ exercise.generated_numbers[1])
                        .html(twig({ref: "instruction"}).render({text: txt, classname: "animated bounceInRight"}));    
         
                    
                break;
            case 3://78D
                exercise.setOperation( "subtraction" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                
                var choice = _helper.randomBit();
                var name,pronoun,obj,pronoun_capp;
                if(choice == true)
                {
                    name = girls_names[_helper.rangeRandom(0,6)];
                    secondname = boys_names[_helper.rangeRandom(0,6)];
                    
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }else{
                    name = boys_names[_helper.rangeRandom(0,6)];
                    secondname = girls_names[_helper.rangeRandom(0,6)];
                   
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }
                
                var txt = questionTexts[Type];
                txt = txt.replace("param1",name);
                txt = txt.replace("param1",name);
                txt = txt.replace("param2",exercise.generated_numbers[0] + " " + obj);   
                txt = txt.replace("param3",secondname);
                txt = txt.replace("param4",exercise.generated_numbers[1]);
             
                
                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"-"+ exercise.generated_numbers[1])
                        .html(twig({ref: "instruction"}).render({text: txt, classname: "animated bounceInRight"}));    
            
                break;
                
                
            case 4://78E
                exercise.setOperation( "subtraction" );
                _helper.randomPair();
                exercise.generated_numbers[0] = Math.max(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                exercise.generated_numbers[1] = Math.min(exercise.generated_numbers[0],exercise.generated_numbers[1]);
                
                var choice = _helper.randomBit();
                var name,pronoun,obj,pronoun_capp;
                if(choice == true)
                {
                    name = girls_names[_helper.rangeRandom(0,6)];
                    pronoun = pronouns[0];
                    pronoun_capp = pronouns_capp[0];
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }else{
                    name = boys_names[_helper.rangeRandom(0,6)];
                    pronoun = pronouns[1];
                    pronoun_capp = pronouns_capp[1];
                    obj = have_objects[_helper.rangeRandom(0,2)];
                }
                
                var txt = questionTexts[Type];
                txt = txt.replace("param1",name);
                txt = txt.replace("param2",exercise.generated_numbers[0] + " " + obj);   
                txt = txt.replace("param3",pronoun_capp);
                txt = txt.replace("param4",exercise.generated_numbers[1] + " " + obj);
             
                
                $(".exe-container-header").data("value", exercise.generated_numbers[0] +"-"+ exercise.generated_numbers[1])
                        .html(twig({ref: "instruction"}).render({text: txt, classname: "animated bounceInRight"}));    
                
        
                break;
            
        }
        
        
                   
                    aAnswers = [exercise.generated_numbers[0] + "+" + exercise.generated_numbers[1],
                                exercise.generated_numbers[0] + "-" + exercise.generated_numbers[1] 
                                ];
                    aAnswers = _helper.array_shuffle(aAnswers);       
                    
                var oImg1 = new number_image({
                    collection: "marble",
                    category: "still"
                });    
                
                $(".exe-container-question").data("value", exercise.generated_numbers[0]).html( twig({ref: "imageholder"}).render({classname:"img-contain-small"}) );        
                for (i=0; i<exercise.generated_numbers[0]; i++) {
                    $(".number-image-holder").eq(0).append( oImg1.html(1, "still") );
                }
                
                $(".exe-container-answer")
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[0], intvalue: aAnswers[0], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[0] ))
                .append($(twig({ref: "button"}).render({classname:"centered",value: aAnswers[1], intvalue: aAnswers[1], numberdots: exercise.params.bShowNumbrDots?"number-dots":"" })).data( "value", aAnswers[1] ));
         
                 
      
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

