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
            "c2E8",
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
        
                var oImg1 = new number_image({
                    collection: "marble",
                    category: "still"
                });    
                
                $(".exe-container-question").data("value", exercise.generated_numbers[0]).html( twig({ref: "imageholder"}).render({classname:"img-contain-small"}) );        
                for (i=0; i<exercise.generated_numbers[0]; i++) {
                    $(".number-image-holder").eq(0).append( oImg1.html(1, "still") );
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

                    var asdfads = $(cont).children().length;
                    var werwer =  $(drag).data("value");
                    var wqrer = $(cont).data("value");

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
      //  $(answer_analyser.params.selectors[1]).addClass("correct");
    },
    mark_wrong: function() {
      //  $(answer_analyser.params.selectors[1]).addClass("wrong");
    },
    revert_wrong: function() {
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




