var exercise_global = {
    generated_numbers: [],
    params: {
        operationMix: null,
        operation: "addition",
        operationSign: "+",
        min: 0,
        max: 0,
        number_pairs: 1,
        callback: false,
        templates: [],
        clear: false,
        bShowDragArea: false,
        bShowOKButton: false,
        bExcludeZero: false,
        bShowNumbrDots: false
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
            
    _init: function(callback) {

       if (typeof(callback) == "undefined") {
           callback = function() {};
       }
       if (this.params.bShowOKButton) {
            $(".exercise-btn-next").addClass("animated bounceInRight").show();
        }
        if (this.params.bShowDragArea) {
            $("#exercise-drag-target-area").addClass("animated bounceInRight").show();
        }
        
        if (this.params.operation == "subtraction") {
            this.params.operationSign = "-";
        }
        
        if ( exercise.params.templates.length > 0) {
            templates.init( exercise.params.templates, callback );
        }
    },
    clear_canvas: function(callback) {
        $(".exe-container-header, .exe-container-question, .exe-container-answer").html('');
        $(".drop_area .number_image_holder, #page-wrapper-inner > .number_image_holder, #page-wrapper-inner > .number_image_content").remove();
        if (typeof(callback) == "function") {
            callback();
        }
    },
            
    clear: function(callback) {
        exercise.data.currentTries = 0;
        exercise.saveData(function() {
            $(".number_image_holder").fadeOut(500).promise().done(function() {
                $(".number_image_holder").html('');

//                exercise_global.clear_canvas();

                if (typeof(callback) != "undefined") {
                    callback();
                }
                else {
                    exercise.init({
                        clear: true
                    });
                }

            });
        });
    },
    
    setOperation: function(operation) {
        if ( operation == "addition" ) {
            exercise.params.operation = "addition";
            exercise.params.operationSign = "+";
        }
        else if ( operation == "subtraction") {
            exercise.params.operation = "subtraction";
            exercise.params.operationSign = "-";
        }
    },
    
    getOperation: function() {
        if ( exercise.params.operationMix != null ) {
            exercise.params.operation = exercise.params.operationMix[ _helper.rangeRandom(0, exercise.params.operationMix.length - 1) ];
            if (exercise.params.operation == "addition") {
                exercise.params.operationSign = "+";
            }
            else if (exercise.params.operation == "subtraction") {
                exercise.params.operationSign = "-";
            }
        }
    },
    
    revertDropped: function(v) {
        var m = $(v).offset().left - $(".drag-answer-container").offset().left;
        var n = $(v).offset().top - $(".drag-answer-container").offset().top;

        $(v).css({
            top: n,
            left: m,
            right: "auto"
        });
        $(v).detach().appendTo( ".drag-answer-container" ).removeClass("dropped");
        var pos = $(v).data("position");
        $(v).stop().animate({
            left: pos.left,
            top: pos.top
        }, 300);
    },
    
    showInstruction: function(init) {
        if (typeof (init) == "undefined") {
            init = false;
        }
        var text = exercise.tmp.img_type[0] == "kr" ?
                "Titta hur mycket pengar det är. Dra lika många klossar till den tomma rutan." :
                "Räkna hur många klossar det är. Dra lika mycket pengar till den tomma rutan.";
        $(".speaklink").html(twig({ref: "instruction"}).render({effect: init ? "bounceInRight" : "bounce", text: text}));
    },
            
    getData: function(callback) {
        progress.init({
                current: 2
            });
        callback();
        return;
        
        jQuery.support.cors = true;
        
        var url = "http://todor.edimia.se/student/matte/exercise/har-ar-talen-10-20/1/getData";
        $.getJSON(url, function(data) {
            exercise.data = data;

            progress.init({
                current: data.currentEx
            });
            
            if (data.currentTries >= data.maxTries) {
                exercise.reset();
            }
            else if (data.currentEx >= exercise.data.totalEx) {
                exercise.reset();
            }
            else {
                callback();
            }
        });
    },
            
    saveData: function(callback) {
      
        var url = "http://todor.edimia.se/student/matte/exercise/har-ar-talen-10-20/1/saveData";
        $.post(url, {
            currentTries: exercise.data.currentTries,
            tries: exercise.data.tries
        },
        function(data) {
            callback();
        });
    },
    
    reset: function() {
        progress.reset();
        var url = "http://todor.edimia.se/student/matte/exercise/har-ar-talen-10-20/1/";
        $.post(url + "walk", {
            currentTries: 0,
            data: {},
            exindex: 0,
            success_counter: 0,
            tries: 0
        }, function() {
            exercise.set();
        });
    },
    
    walk: function() {

        exercise.data.currentEx++;
        exercise.data.currentTries = 0;
        
        var url = "http://todor.edimia.se/student/matte/exercise/har-ar-talen-10-20/1/";
        $.post(url + "walk", {
            currentTries: 0,
            data: {},
            exindex: exercise.data.currentEx,
            success_counter: exercise.data.successCounter,
            tries: exercise.data.tries
        },
        function(data) {
            progress.next();

            ////////////////////////////////////////////////////////////
            if (exercise.data.currentEx == exercise.data.totalEx) {
                var successRate = Math.floor(exercise.data.successCounter / exercise.data.tries * 100);
                $.post(url + "saveSuccess", {
                    success: successRate
                }, function(e) {
                    //                window.location.href = currentUrl + "results"
                    exercise.summary();
                })

            } else {
                exercise.set();
//                typeof type != "undefined" && oldType != type && $(".instructions").removeClass("animated bounceInRight").addClass("animated bounce").one("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function () {})
            }

        });

    },
    
    summary: function() {
        alert("all done");
    }
}