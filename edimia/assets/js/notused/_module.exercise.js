var exercise = {
    generated_numbers: [],
    params: {
        min: 0,
        max: 10,
        number_pairs: 1,
        callback: false,
        templates: [],
        clear: false
    },
    data: {
        successCounter: 0,
        tries: 0,
        maxTries: 3,
        exercise_type: "exercise",
        currentTries: 0,
        currentEx: 0
    },
    tmp: {
        img_type: null
    },
            
    init: function() {
        
        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }
        
        if ( exercise.params.templates.length > 0) {
            templates.init( exercise.params.templates );
        }
        answer_analyser.init({
            type: "matchpair",
            numpairs: 1,
            selectors: [".answerrow", ".drop_area .number_image_holder"]
        });
        exercise.getData();
        
        exercise.generated_numbers = [];
        var n = false;
        var fetch_element_position = [];
        for (var i = 0; i < this.params.number_pairs; i++) {
            n = !n ? _helper.rangeRandom(this.params.min, this.params.max - this.params.number_pairs + 1) : n+1;
            exercise.generated_numbers.push(n);
            
            fetch_element_position.push(i);
        }

        var left_digit = fetch_element_position.slice().sort(function() {return 0.5 - Math.random();});
        var right_digit = fetch_element_position.slice().sort(function() {return 0.5 - Math.random();});
        
        exercise.tmp.img_type = (Math.random() * 200 < 100) ? ['kr', 'block'] : ['block', 'kr'];
        
        exercise.showInstruction( !exercise.params.clear );
        
        for (var i = 0; i < this.params.number_pairs; i++) {
            var numberimages = [[],[]];
            var v = [exercise.generated_numbers[ left_digit[ i ] ], exercise.generated_numbers[ right_digit[ i ] ] ];
            var l = [Math.floor(v[0] / 10) * 10, Math.floor(v[1] / 10) * 10];
            var r = [Math.floor(v[0] % 10), Math.floor(v[1] % 10)];

            numberimages[0].push( twig({ref: "numberimage"}).render({type: exercise.tmp.img_type[0], filename: "number-image-"+exercise.tmp.img_type[0]+"-"+l[0]+( exercise.tmp.img_type[0] == "block" ? "-blue" : "" )+".png"}) );
            numberimages[0].push( twig({ref: "numberimage"}).render({type: exercise.tmp.img_type[0], filename: "number-image-"+exercise.tmp.img_type[0]+"-"+r[0]+( exercise.tmp.img_type[0] == "block" ? "-red" : "" )+".png"}) );
            numberimages[1].push( twig({ref: "numberimage"}).render({type: exercise.tmp.img_type[1], filename: "number-image-"+exercise.tmp.img_type[1]+"-"+l[1]+( exercise.tmp.img_type[1] == "block" ? "-blue" : "" )+".png"}) );
            numberimages[1].push( twig({ref: "numberimage"}).render({type: exercise.tmp.img_type[1], filename: "number-image-"+exercise.tmp.img_type[1]+"-"+r[1]+( exercise.tmp.img_type[1] == "block" ? "-red" : "" )+".png"}) );

            if (exercise.params.clear === true) {
                console.log( "Clear: " + v[0]);
                $(".answerrow").eq(i).attr("data-number", v[0]).find(".number_image_holder")
                .removeClass("animated bounceInLeft").html(numberimages[0]).delay(10).queue(function() {
                    $(this).show().addClass("animated bounceInLeft").dequeue();
                });
            }
            else {
                $("#exercise-content").append(
                    twig({ref: "answerrow"}).render({numberimages: numberimages[0], number: v[0]})
                );
            }
            $("#page-wrapper-inner").append(
                twig({ref: "dragitem"}).render({numberimages: numberimages[1], topoffset: (i+1) * 160 - 20, number: v[1]})
            );
        }
        if (exercise.params.clear === true) {
            exercise.params.clear = false;
        }    
//        $(".number_image_holder.bounceInLeft").each(function() {
//            var el = $(this);
//            el.removeClass("bounceInLeft"); 
//            window.setTimeout(function() {
//                el.addClass("bounceInLeft");
//            }, 500);
//        });

        if (this.params.callback) {
            this.params.callback();
        }
    },
            
    clear: function() {
        exercise.data.currentTries = 0;
        exercise.saveData(function() {
            $(".number_image_holder").fadeOut(500).promise().done(function() {
                $(".number_image_holder").html('');
                $(".drop_area .number_image_holder, #page-wrapper-inner > .number_image_holder").remove();

                exercise.init({
                    clear: true
                });

            });
        });
    },
    
    solve: function(callback) {
        answer_analyser.forceSolve = true;
        $.each(exercise.generated_numbers, function(k,v) {
            var z = $(".number_image_holder.draggable[data-number='"+v+"']").offset().left - $(".answerrow[data-number='"+v+"'] .drop_area").offset().left;
            var y = $(".number_image_holder.draggable[data-number='"+v+"']").offset().top - $(".answerrow[data-number='"+v+"'] .drop_area").offset().top;
            $(".number_image_holder.draggable[data-number='"+v+"']").css({    top: y,    left: z,    right: "auto"});
            $(".number_image_holder.draggable[data-number='"+v+"']").addClass("dropped").detach().appendTo($(".answerrow[data-number='"+v+"'] .drop_area"));

            $(".number_image_holder.draggable[data-number='"+v+"']").animate({
                left: $(".answerrow[data-number='"+v+"'] .drop_area").width() / 2 - $(".number_image_holder.draggable[data-number='"+v+"']").width() / 2,
                top: $(".answerrow[data-number='"+v+"'] .drop_area").height() / 2 - $(".number_image_holder.draggable[data-number='"+v+"']").height() / 2
            }, 1000);
        });
        
        if (typeof(callback) != "undefined") {
            callback();
        }
    },
    
    revert_wrong: function() {
        $.each($(".answerrow"), function() {
            var v = $(this).attr("data-number");
            if ( v != $(this).find(".drop_area .number_image_holder").attr("data-number") ) {
                var z = $(".number_image_holder.draggable[data-number='"+v+"']").offset().left - $("#page-wrapper").offset().left;
                var y = $(".number_image_holder.draggable[data-number='"+v+"']").offset().top - $("#page-wrapper").offset().top;
                $(".number_image_holder.draggable[data-number='"+v+"']").css({top: y, left: z, right: "auto"});
                $(".number_image_holder.draggable[data-number='"+v+"']").removeClass("dropped").detach().appendTo( $("#page-wrapper") );
                var p = $(".number_image_holder.draggable[data-number='"+v+"']").data("position");
                $(".number_image_holder.draggable[data-number='"+v+"']").animate({left: p.left + "px", top: p.top + "px"});
            }
        });
    },
            
    showInstruction: function(init) {
        if (typeof(init) == "undefined") {
            init = false;
        }
        var text = exercise.tmp.img_type[0] == "kr" ?
            "Titta hur mycket pengar det är. Dra lika många klossar till den tomma rutan." : 
            "Räkna hur många klossar det är. Dra lika mycket pengar till den tomma rutan.";
        $(".speaklink").html( twig({ref: "instruction"}).render({effect: init ? "bounceInRight" : "bounce", text: text}) );
    },
            
    getData: function() {
//        return JSON.parse('{"successCounter":"2","tries":"17","maxTries":"3","exercise_type":"exercise","currentTries":"0","currentEx":"5"}');
        
        jQuery.support.cors = true;
        var url = "http://todor.edimia.se/student/matte/exercise/har-ar-talen-10-20/1/getData";
        $.getJSON(url, function(data) {
            exercise.data = data;
            progress.init({
               current: data.currentEx 
            });
            
            if (data.currentTries >= data.maxTries) {
                exercise.walk();
            }
        });
    },
            
    saveData: function(callback) {

        var url = "http://todor.edimia.se/student/matte/exercise/har-ar-talen-10-20/1/saveData";
        $.post( url, {
            currentTries: exercise.data.currentTries,
            tries: exercise.data.tries
        },
        function( data ) {
            console.log( data );
            callback();
        });
    },
            
    walk: function() {
        
        exercise.data.currentEx++;
        
        var url = "http://todor.edimia.se/student/matte/exercise/har-ar-talen-10-20/1/";
        $.post( url + "walk", {
            currentTries: 0,
            data: {},
            exindex: exercise.data.currentEx,
            success_counter: exercise.data.successCounter,
            tries: exercise.data.tries
        },
        function( data ) {
            progress.next();
            
            ////////////////////////////////////////////////////////////
            var successRate = Math.floor(exercise.data.successCounter / exercise.data.tries * 100);
            $.post( url + "saveSuccess", {
                success: successRate
            }, function (e) {
//                window.location.href = currentUrl + "results"
                exercise.summary();
            })
        });
        
    },
    
    summary: function() {
        alert("all done");
    }
}