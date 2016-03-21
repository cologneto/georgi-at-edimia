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

    gameOver: function() {
        exercise.saveData(function() {
            answer_analyser.alert("over", function() {
                window.setTimeout(function() {
                    exercise.solve(function() {
                        window.setTimeout(function() {
                            $(".exercise-btn-next").css({opacity: 1});
                        }, 1000);
                    });
                }, 500);
            });
        });
    },
    error: function() {
        if (exercise.data.currentTries == exercise.data.maxTries) { // no more guesses
            answer_analyser.gameOver();
        }
        else {
            exercise.saveData(function() {
                answer_analyser.alert("error", function() {
                    $(".exercise-btn-next").css({opacity: 1});
                });
            });
        }
    },
    check: function() {
        exercise.data.currentTries++;
        exercise.data.tries++;
        if ($(answer_analyser.params.selectors[0]).length != $(answer_analyser.params.selectors[1]).length) {
            answer_analyser.error();
        }
        else {
            var bError = false;
            for (var i = 0; i < answer_analyser.params.numpairs; i++) {
                if ($(answer_analyser.params.selectors[0]).eq(i).attr("data-number") != $(answer_analyser.params.selectors[1]).eq(i).attr("data-number")) {
                    bError = true;
                    break;
                }
            }
            if (bError) {
                answer_analyser.error();
            }
            else {
                exercise.data.successCounter++;
                exercise.saveData(function() {
                    answer_analyser.alert("correct", function() {
                        if ( progress.params.current < progress.params.total - 1 ) {
                            exercise.clear();
                        }
                        else {
                            exercise.summary();
                        }
                        $(".exercise-btn-next").css({opacity: 1});
                    });
                });
            }
        }
    },
    bind: function() {
        $(".exercise-btn-next").unbind("click").bind("click", function() {
            alert("1234");
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
        $(".exercise_notification").animate({right: "-300px"}, 400, function() {
            if (typeof(callback) != "undefined") {
                callback();
            }
        });
    }
}