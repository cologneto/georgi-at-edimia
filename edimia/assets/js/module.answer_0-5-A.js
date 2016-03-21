var answer_analyser = {
    hideAlertDelay: 2, // seconds
    bCheckInProgress: false,
    params: {
        type: "match",
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
        answer_analyser.bCheckInProgress = true;
        
        exercise.data.currentTries++;
        exercise.data.tries++;

        exercise.saveData(function() {
            
            var bError = false;
            if ( answer_analyser.params.type == "match" ) {
                bError = answer_analyser.check_matchpair();
            }
            else if ( answer_analyser.params.type == "matchselectorseval" ) {
                bError = answer_analyser.check_matchselectorseval();
            }
            else if ( answer_analyser.params.type == "matchselectors" ) {
                bError = answer_analyser.check_matchselectors();
            }
            else if ( answer_analyser.params.type == "listvalue" ) {    // A8, C4
                bError = answer_analyser.check_listvalue();
            }
            else if ( answer_analyser.params.type == "sumsequence" ) {  // A9
                bError = answer_analyser.check_sumsequence();
            }
            else if ( answer_analyser.params.type == "equationcreator" ) {  // A10
                bError = answer_analyser.check_equationcreator();
            }
            else if ( answer_analyser.params.type == "equationcreator_ansrs" ) {  // 2E8,2E6
                bError = answer_analyser.check_equationcreator_ansrs();
            }
            else if ( answer_analyser.params.type == "equalselectors" ) {  // 2DDB
                bError = answer_analyser.check_equalselectors();
            }
            else if ( answer_analyser.params.type == "listsum" ) {  // A10
                bError = answer_analyser.check_listsum();
            }
            else if ( answer_analyser.params.type == "substr_equation" ) {  // C5
                bError = answer_analyser.substr_equation();
            }
            else if ( answer_analyser.params.type == "selector_sequence" ) {  // C10
                bError = answer_analyser.selector_sequence();
            }
            else if ( answer_analyser.params.type == "selector_sequence_four" ) {  // 2B4
                bError = answer_analyser.selector_sequence_four();
            }
            else if ( answer_analyser.params.type == "singleselector" ) {  // C10
                bError = answer_analyser.check_singleselector();
            }
            else if ( answer_analyser.params.type == "sequence_mix" ) {  // 2E9
                bError = answer_analyser.check_sequence_mix();
            }
            else if ( answer_analyser.params.type == "sequence_mix_value" ) {  // 2DDE
                bError = answer_analyser.check_sequence_mix_value();
            }

            if (bError) {
                if (exercise.data.currentTries >= exercise.data.maxTries) { // no more guesses
                    //exercise.revert_wrong();
                    exercise.mark_wrong();
                    answer_analyser.alert("over", function() {
                        exercise.revert_wrong(true);
                        window.setTimeout(function() {
                            exercise.solve();
                            $(".exercise-btn-next").css({opacity: 1});
                            window.setTimeout(function() {
                                exercise.walk();
                            }, answer_analyser.hideAlertDelay * 1000);
                        }, typeof(exercise.iSolveDelay) != "undefined" ? exercise.iSolveDelay : 0 );
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
                exercise.mark_correct();
                exercise.data.successCounter++;
//                exercise.solve();
                answer_analyser.alert("correct", function() {
                    exercise.walk();
                    $(".exercise-btn-next").css({opacity: 1});
                });
            }
        });

    },
    check_equationcreator: function() {
        var eq = "";
        $(answer_analyser.params.selectors.join(",")).each(function() {
            eq += $(this).data("value");
        });
        var a = eq.match(/^(\d)([\+\-])(\d)\=(\d)$/);

        if (a != null) { // A+B=C or A-B=C
            if ( ( (a[1] == exercise.generated_numbers[0] && a[3] == exercise.generated_numbers[1]) ||
                    (a[1] == exercise.generated_numbers[1] && a[3] == exercise.generated_numbers[0])) && 
                (a[4] == eval(a[1]+""+a[2]+""+a[3]) ) ) {
                return false;
            }
        }
        else {  // C=A+B or C=A-B
            a = eq.match(/^(\d)\=(\d)\+(\d)$/);
            if (a == null) {
                return true;
            }
            a = eq.match(/^(\d)\=(\d)\+(\d)$/);
            if ( ( (a[2] == exercise.generated_numbers[0] && a[4] == exercise.generated_numbers[1]) ||
                    (a[2] == exercise.generated_numbers[1] && a[4] == exercise.generated_numbers[0])) && 
                ((a[1] == eval(a[2]+""+a[3]+""+a[4]) ) ) ) {                
                return false;
            }
        }
        return true;
    },
    check_equalselectors: function() {
        for (i = 0; i < answer_analyser.params.numpairs; i++) {
        var eq =[ $(answer_analyser.params.selectors[0]).eq(i).data("value"),
                $(answer_analyser.params.selectors[1]).eq(i).data("value"),
                $(answer_analyser.params.selectors[2]).eq(i).data("value"),
                $(answer_analyser.params.selectors[3]).eq(i).data("value")];

        if (eq != null) { 
            if ((eq[3] == eval(eq[0]+""+eq[1]+""+eq[2]) )) {
                
            }else{
                return true;
            }
        };
    };
        return false;
    },
    check_equationcreator_ansrs: function() {
        var eq = "";
        $(answer_analyser.params.selectors.join(",")).each(function() {
            eq += $(this).data("value");
        });
        var a = eq.match(/^(\d)([\+\-])(\d)\=(\d)(\d)$/);

        if (a != null) { // A+B=C or A-B=C
            if ( ( (a[1] == exercise.generated_numbers[0] && a[3] == exercise.generated_numbers[1]) ||
                    (a[1] == exercise.generated_numbers[1] && a[3] == exercise.generated_numbers[0])) && 
                (a[4] == eval(a[1]+""+a[2]+""+a[3]) ) ) {
                if((a[5] == a[4]) && (a[4] == exercise.generated_numbers[2])){
                    return false;
                }else{
                    return true;
                }
            }
        }
        else {  // C=A+B or C=A-B
            a = eq.match(/^(\d)\=(\d)\+(\d)$/);
            if (a == null) {
                return true;
            }
            a = eq.match(/^(\d)(\d)\=(\d)\+(\d)$/);
            if ( ( (a[2] == exercise.generated_numbers[0] && a[4] == exercise.generated_numbers[1]) ||
                    (a[2] == exercise.generated_numbers[1] && a[4] == exercise.generated_numbers[0])) && 
                ((a[1] == eval(a[2]+""+a[3]+""+a[4]) ) ) ) {
                if(a[5] == a[4] ){
                    return false;
                }else{
                    return true;
                }
            }
        }
        return true;
    },
    check_sumsequence: function() {
        
        var sequence = $(answer_analyser.params.selectors[0]).data("value");
        var correct_sum = exercise.generated_numbers[0] + exercise.generated_numbers[1];
           
        
        
        if (sequence != $(answer_analyser.params.selectors[1]).eq(0).data("value") + "" + $(answer_analyser.params.selectors[1]).eq(1).data("value") || 
            correct_sum != $(answer_analyser.params.selectors[1]).eq(2).data("value") ) {
            
            return true;
        }
        else {
            return false;
        }
    },
    selector_sequence: function() {
        var bError = false;
        var s = 0, i = 0;
        for (i = 0; i < answer_analyser.params.numpairs; i++) {
            if (!( $(answer_analyser.params.selectors[0]).eq(i).data("value") === $(answer_analyser.params.selectors[1]).eq(i).data("value") && 
                $(answer_analyser.params.selectors[1]).eq(i).data("value") === $(answer_analyser.params.selectors[2]).eq(i).data("value")) ) {
                bError = true;
                break;
            }
        }
        return bError;
    },
    selector_sequence_four: function() {
        var bError = false;
        var s = 0, i = 0;
        for (i = 0; i < answer_analyser.params.numpairs; i++) {
            var sum_selectors = eval($(answer_analyser.params.selectors[0]).eq(i).attr("data-value-help")+ "+" + $(answer_analyser.params.selectors[1]).eq(i).data("value"));
            if (!( $(answer_analyser.params.selectors[0]).eq(i).data("value") == $(answer_analyser.params.selectors[2]).eq(i).data("value") && 
                $(answer_analyser.params.selectors[0]).eq(i).data("value") == sum_selectors) ) {
                bError = true;
                break;
            }
        }
        return bError;
    },
    substr_equation: function() {
        var bError = false;
        var s = 0;
        $(answer_analyser.params.selectors[1]).each(function(k, v) {
            if (k<2) {
                if ( $(v).data("value") != exercise.generated_numbers[k] ) {
                    bError = true;
                }
            }
            else {
                if ( $(v).data("value") != exercise.generated_numbers[0] - exercise.generated_numbers[1] ) {
                    bError = true;
                }
            }
        });
        return bError;
    },
    check_listsum: function() {
        var s = 0, t = 0;
        for (var i = 0; i < answer_analyser.params.numpairs; i++) {
            if ( typeof($( answer_analyser.params.selectors[1] ).eq(i).data("value")) == "undefined") {
                s = 0;
            }
            else {
                s = parseInt( $( answer_analyser.params.selectors[1] ).eq(i).data("value") );
            }
            t = parseInt( $.trim($( answer_analyser.params.selectors[0] ).eq(i).text()) );
            if ( s + t != exercise.generated_numbers[0]) {
                return true;
                break;
            }
        }
        return false;
    },
    check_sequence_mix: function() {
        var startValue = $(answer_analyser.params.selectors[0]).text();
        for(i = 0; i < answer_analyser.params.numpairs ; i++)
        {
            startValue = eval(startValue + $(answer_analyser.params.selectors[1]).eq(i).text());
            if(startValue != $(answer_analyser.params.selectors[2]).eq(i).data("value"))
            {
                return true;
                break;
            }
        }
        return false;
    },
    check_sequence_mix_value: function() {
        var startValue = $(answer_analyser.params.selectors[0]).data("value")
        for(i = 0; i < answer_analyser.params.numpairs ; i++)
        {
            startValue = eval(startValue + exercise.params.operationSign +$(answer_analyser.params.selectors[1]).eq(i).data("value"));            
        }
        if(startValue != $(answer_analyser.params.selectors[2]).data("value"))
            {
                return true;              
            }
        return false;
    },
    check_listvalue: function() {
        if ( $(answer_analyser.params.selectors[1]).length != answer_analyser.params.numpairs) {
            return true;
        }
        else {
            var correct_sum = $(answer_analyser.params.selectors[1]).eq(0).data("value");   //xercise.generated_numbers[0] + exercise.generated_numbers[1];
            for (var i = 0; i < answer_analyser.params.numpairs; i++) {
                if ( $(answer_analyser.params.selectors[1]).eq(i).data("value") != correct_sum ) {
                    return true;
                    break;
                }
            }
        }
        return false;
    },
    check_singleselector: function() {
        if ( $(answer_analyser.params.selectors[1]).length != answer_analyser.params.numpairs) {
            return true;
        }
        else {
            var correct_sum = $(answer_analyser.params.selectors[0]).eq(0).data("value");   //xercise.generated_numbers[0] + exercise.generated_numbers[1];
            for (var i = 0; i < answer_analyser.params.numpairs; i++) {
                if ( $(answer_analyser.params.selectors[1]).eq(i).data("value") != correct_sum ) {
                    return true;
                    break;
                }
            }
        }
        return false;
    },
    check_matchpair: function() {
        
        if ( $(answer_analyser.params.selectors[0]).length != $(answer_analyser.params.selectors[1]).length ) {
            return true;
        }
        else {            
            for (var i = 0; i < answer_analyser.params.numpairs; i++) {
                if ($(answer_analyser.params.selectors[0]).eq(i).data("value") != $(answer_analyser.params.selectors[1]).eq(i).data("value")) {
                    return true;
                    break;
                }
            }
        }
        return false;
    },
    check_matchselectors: function() {
        var correct = $(answer_analyser.params.selectors[0]).data("value");
        for (var i = 1; i < answer_analyser.params.selectors.length; i++) {
            if ( $(answer_analyser.params.selectors[i]).data("value") != correct ) {
                return true;
                break;
            }
        }
        return false;
    },
    check_matchselectorseval: function() {
        var correct = eval( $(answer_analyser.params.selectors[0]).data("value") );
        for (var i = 1; i < answer_analyser.params.selectors.length; i++) {
            if ( eval( $(answer_analyser.params.selectors[i]).data("value") ) != correct ) {
                return true;
                break;
            }
        }
        return false;
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
            
            answer_analyser.bCheckInProgress = false;
            
            if (typeof(callback) != "undefined") {
                callback();
            }
        });
    }
}