var answer_analyser = {
    hideAlertDelay: 2, // seconds
    params: {
        type: "matchpair",
        numpairs: 1,
        selectors: []
    }, 
    forceSolve: false,
    init: function() {
        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                answer_analyser.params[k] = v;
            });
        }
        this.bind();
    },
// success: 5 total tries: 16 max tries: 3 current tries: 0 current exercise: 7

    check: function() {
        
        
        exercise.data.currentTries++;
        exercise.data.tries++;

        exercise.saveData(function() {
            
            var bError = false;
            if ( $(answer_analyser.params.selectors[0]).length != $(answer_analyser.params.selectors[1]).length ) {
                bError = true;
            }
            else {
                for (var i = 0; i < answer_analyser.params.numpairs; i++) {
                    if ($(answer_analyser.params.selectors[0]).eq(i).data("value") != $(answer_analyser.params.selectors[1]).eq(i).data("value")) {
                        bError = true;
                        break;
                    }
                }
            }

            if (bError) {
                if (exercise.data.currentTries >= exercise.data.maxTries) { // no more guesses
                    exercise.revert_wrong();
                    exercise.mark_wrong();
                    answer_analyser.alert("over", function() {
                        exercise.revert_wrong();
                        exercise.solve();
                        $(".exercise-btn-next").css({opacity: 1});
                        window.setTimeout(function() {
                            exercise.walk();
                        }, answer_analyser.hideAlertDelay * 1000);
                    });
                }
                else {
                    exercise.mark_wrong();
                    answer_analyser.alert("error", function() {
                        exercise.revert_wrong();
                        $(".exercise-btn-next").css({opacity: 1});
                    });
                }
            }
            else {
                exercise.data.successCounter++;
                exercise.solve();
                answer_analyser.alert("correct", function() {
                    exercise.walk();
                    $(".exercise-btn-next").css({opacity: 1});
                });
            }
        });

    },
    bind: function() {
        $(".exercise-btn-next").unbind("click").bind("click", function() {
            if (answer_analyser.forceSolve) {
                answer_analyser.forceSolve = false;
                if ( progress.params.current < progress.params.total - 1 ) {
                    exercise.clear();
                }
                else {
                    exercise.summary();
                }
            }
            else {
                if (parseInt($(this).css("opacity")) == 1) {
                    answer_analyser.check();
                }
            }
        });
    },
    alert: function(state, callback) {
        if (typeof(callback) == "undefined") {
            callback = function() {
            };
        }
        $(".exercise-btn-next").css({opacity: 0.5});
        $(".exercise_notification." + state).animate({right: 0}, 400);
        window.setTimeout(function() {
            answer_analyser.hide(callback);
        }, answer_analyser.hideAlertDelay * 1000);
    },
    hide: function(callback) {
        $.when(
            $(".exercise_notification").animate({right: "-300px"}, 400)
        ).done(function() {
            if (typeof(callback) != "undefined") {
                callback();
            }
        });
    }
}