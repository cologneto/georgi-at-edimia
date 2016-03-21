var _helper = {
    window: {
        width: 0,
        height: 0
    },
    rangeRandomSkipUsed: function(min, max, used) {
        console.log( typeof(used) + " -> " + used);
        var n = 0;
        do {
            n = Math.floor(Math.random() * (max - min + 1) + min);
        } while ($.inArray(n, used) >= 0);
        return n;
    },
            
    rangeRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomEquation: function(solution, exclude) {
        if (typeof(exclude) == "undefined") {
            exclude = [];
        }
        if (exercise.params.operation == "addition") {
            return _helper.randomEquationAddition(solution, exclude);
        }
        else if (exercise.params.operation == "subtraction") {
            return _helper.randomEquationSubtraction(solution, exclude);
        }
        else {
            return "n/a";
        }
    },
    randomEquationSubtraction: function(solution, exclude) {
        var rndm_val = 0;
        do {
            rndm_val = _helper.rangeRandom( solution, exercise.params.max );
        } while ( ($.inArray(rndm_val + "-" + ( parseInt(rndm_val - solution) ), exclude) > -1) || 
                  (parseInt(rndm_val - solution) == (exercise.params.bExcludeZero ? 0 : null) ) || 
                  (parseInt(rndm_val - solution) < exercise.params.min) );
        return rndm_val + "-" + ( parseInt(rndm_val - solution) );
    },
    randomEquationAddition: function(solution, exclude) {
        var rndm_val = 0;
        do {
            rndm_val = _helper.rangeRandom( exercise.params.min, solution);
        } while( $.inArray(rndm_val + "+" + ( parseInt(solution - rndm_val) ), exclude) > -1 );
        return rndm_val + "+" + ( parseInt(solution - rndm_val) );
    },
    randomFalseEquation: function(exclude) {
        if (typeof(exclude) == "undefined") {
            exclude = [];
        }
        if (exercise.params.operation == "addition") {
            return _helper.randomFalseEquationAddition(exclude);
        }
        else if (exercise.params.operation == "subtraction") {
            return _helper.randomFalseEquationSubtraction(exclude);
        }
        else {
            return "n/a";
        }
    },
    randomFalseEquationSpecial: function(exclude) {
        do {
            eq = _helper.randomBit() ? _helper.randomFalseEquationAddition(exclude) : _helper.randomFalseEquationSubtraction(exclude);
        } while( $.inArray( eval(eq), exercise.generated_numbers) > -1 );
        return eq;
    },
    randomFalseEquationSubtraction: function(exclude) {
        var exclude_vals = [];
        $.each(exclude, function(k,v) {
            exclude_vals.push( eval(v) );
        });
        var val1 = 0, val2 = 0;
        do {
            val1 = _helper.rangeRandom( exercise.params.min, exercise.params.max);
            val2 = _helper.rangeRandom( exercise.params.min, exercise.params.max);
        } while ( $.inArray(val1 + "-" + val2, exclude) > -1 || 
                  $.inArray(val1 - val2, exclude) > -1 || 
                  $.inArray(val1 - val2, exclude_vals) > -1 || 
                  $.inArray(val1 - val2, exercise.generated_numbers) > -1 || 
                  (val1 - val2) < exercise.params.min || 
                  (val1 - val2) == 0 
                );
        return val1 + "-" + val2;
    },
    randomFalseEquationAddition: function(exclude) {
        var exclude_vals = [];
        $.each(exclude, function(k,v) {
            exclude_vals.push( eval(v) );
        });
        var val1 = 0, val2 = 0;
        do {
            val1 = _helper.rangeRandom( exercise.params.min, exercise.params.max);
            val2 = _helper.rangeRandom( exercise.params.min, exercise.params.max);
        } while ( $.inArray(val1 + "-" + val2, exclude) > -1 || 
                  $.inArray(val1 + val2, exercise.generated_numbers) > -1 || 
                  $.inArray(val1 + val2, exclude_vals) > -1 || 
                  (val1+val2) > exercise.params.max
                );
        return val1 + "+" + val2;
    },
    randomSequence: function(seqCount, bExcludeMax) {    // generate x numberes within one of each other
        if (typeof(seqCount) == "undefined") {
            seqCount = 1;
        }
        if (typeof(bExcludeMax) == "undefined") {
            bExcludeMax = false;
        }
        
        var rndm_val = _helper.rangeRandom( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max - seqCount + 1 - ( bExcludeMax ? 1 : 0) );
        var values = [];
        var i =0;
        for (i = 0; i < seqCount; i++) {
            values.push( rndm_val + i );
        }
        values = _helper.array_shuffle(values);
        for (i = 0; i < seqCount; i++) {
            exercise.generated_numbers[i] = values[i];
        }
    },
            
    randomBit: function() {
        return _helper.rangeRandom(0,1000) <= 500;
    },
            
    probability: function(probPercent) {
        if (typeof(probPercent) == "undefined" || probPercent < 0 || probPercent > 100) {
            probPercent = 50;
        }
        return _helper.rangeRandom(0,10000) <= ( probPercent * 100 );
    },
    
    array_shuffle: function(e) {
        for (var t = e.length - 1; t > 0; t--) {
            var n = Math.floor(Math.random() * (t + 1)),
                r = e[t];
            e[t] = e[n];
            e[n] = r
        }
        return e
    },
            
    randomPair: function(returnValues) {
        if (typeof(returnValues) == "undefined") {
            returnValues = false;
        }
        var pair = [];
        if (exercise.params.operationMix != null) {
            pair = _helper.randomPairSpecial(true);
        }
        else if (exercise.params.operation == "addition") {
            pair = _helper.randomPairAddition(true);
        }
        else if (exercise.params.operation == "subtraction") {
            pair = _helper.randomPairSubtraction(true);
        }
        if (returnValues) {
            return pair;
        }
        else {
            exercise.generated_numbers = [ pair[0], pair[1] ];
        }
    },
    randomPairSpecial: function() {
        var num1 = false, num2 = false;
        do {
            num1 = _helper.rangeRandom( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min + 1, exercise.params.max );
            num2 = _helper.rangeRandomSkipUsed(exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max - 1, [num1]);
        } while (num1 - num2 < exercise.params.min  || num1 + num2 > exercise.params.max);
        return [num1, num2];
    },
    randomPairSubtraction: function(returnValues) {
        var num1 = false, num2 = false;
        var cutoff = 1000;
        do {
            num1 = _helper.rangeRandom( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min + 1, exercise.params.max );
            num2 = _helper.rangeRandomSkipUsed(exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max - 1, [num1]);
            cutoff--;
        } while (num1 - num2 < exercise.params.min  && cutoff > 0);
        
        if (cutoff == 0) {
            alert("Could not generate random numbers within range [" + exercise.params.min + "-" + exercise.params.max + "] " + num1 + ":" + num2);
        }
        else {
            return [num1, num2];
        }
    },
    randomPairAddition: function(returnValues) {
        var num1 = false, num2 = false;
        var cutoff = 1000;
        do {
            num1 = _helper.rangeRandom( exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max - 1);
            num2 = _helper.rangeRandomSkipUsed(exercise.params.bExcludeZero ? Math.max(exercise.params.min, 1) : exercise.params.min, exercise.params.max - 1, num1 == 0 ? [0] : []);
            cutoff--;
        } while (num1 + num2 > exercise.params.max  && cutoff > 0);
        
        if (cutoff == 0) {
            //random 6-10
                num1 = false, num2 = false;
                cutoff = 1000; 
               // var temp = exercise.params.min;
               // exercise.params.min = 0;
                do {
                    num1 = _helper.rangeRandom( exercise.params.bExcludeZero ? Math.max(0, 1) : 0, exercise.params.max - 1);
                    num2 = _helper.rangeRandomSkipUsed(exercise.params.bExcludeZero ? Math.max(0, 1) : 0, exercise.params.max - 1, num1 == 0 ? [0] : []);
                    cutoff--;
                    } while ((((num1 + num2) < exercise.params.min) || ((num1 + num2) > exercise.params.max))  && cutoff > 0);
                if (cutoff == 0) { 
                        alert("Could not generate random numbers within range [" + exercise.params.min + "-" + exercise.params.max + "] " + num1 + ":" + num2);
                }else {
                 //       exercise.params.min = temp;
                        return [num1, num2];
                };
            //end random 6-10      
                    
            alert("Could not generate random numbers within range [" + exercise.params.min + "-" + exercise.params.max + "] " + num1 + ":" + num2);
        }
        else {
            return [num1, num2];
        }
    },
    close_solutions_single: function() {
        if (exercise.params.operation == "addition") {
            return _helper.close_solutions_singleAddition();
        }
        else if (exercise.params.operation == "subtraction") {
          //  return _helper.close_solutions_singleSubtraction();
          var rndm_val = 0;
            do {
                rndm_val = _helper.rangeRandom( exercise.params.min + 2, exercise.params.max );
            } while (
                    Math.abs(exercise.generated_numbers[0] - exercise.generated_numbers[1] - rndm_val) > 2 || 
                    exercise.generated_numbers[0] - exercise.generated_numbers[1] > rndm_val
            );

            return _helper.array_shuffle([rndm_val, rndm_val - 1, rndm_val - 2]);
        }
    },
    close_solutions_singleSubtraction: function() {
        var rndm_val = 0;
        do {
            rndm_val = _helper.rangeRandom( exercise.params.min + 2, exercise.params.max );
        } while (
                Math.abs(exercise.generated_numbers[0] - exercise.generated_numbers[1] - rndm_val) > 2 || 
                exercise.generated_numbers[0] - exercise.generated_numbers[1] > rndm_val
        );
        
        return _helper.array_shuffle([rndm_val, rndm_val - 1, rndm_val - 2]);
    },
    close_solutions_singleAddition: function() {
        var rndm_val = 0;
        do {
            rndm_val = _helper.rangeRandom( Math.min(exercise.generated_numbers[0], exercise.generated_numbers[1]), exercise.params.max - 2);
        } while (Math.abs(exercise.generated_numbers[0] + exercise.generated_numbers[1] - rndm_val) > 2 || exercise.generated_numbers[0]+exercise.generated_numbers[1] < rndm_val);

        return _helper.array_shuffle([rndm_val, rndm_val + 1, rndm_val + 2]);
    },
            
    close_addends: function(toNum) {
        var rndm_val = 0;
        do {
            rndm_val = _helper.rangeRandom( Math.max(exercise.params.min, toNum), Math.min(exercise.params.max-2, toNum));
        } while (Math.abs(toNum - rndm_val) > 2 || toNum < rndm_val);

        return _helper.array_shuffle([rndm_val, rndm_val + 1, rndm_val + 2]);
    },
            
    other_solutions: function(iPairCount) {
        var sum = exercise.generated_numbers[0] + exercise.generated_numbers[1];
        var aUsedSums = [sum];
        var aPairs = [];
        if (typeof(iPairCount) == "undefined") {
            iPairCount = 0;
        }
        var pairs = [], p = [];
        for (var i = 0; i < iPairCount; i++ ) {
            do {
                p = _helper.randomPair(true);
            } while ( exercise.generated_numbers.join() == p.join() || $.inArray(p[0]+p[1], aUsedSums) > -1 );
            aUsedSums.push( p[0]+p[1] );
            aPairs.push( p );
        }
        
        return aPairs;
    },
    
    possibleNumberEquations: function(solution) {
        if (exercise.params.operation == "addition") {
            return solution - exercise.params.min + 1;
        }
        else if (exercise.params.operation == "subtraction") {
            return exercise.params.max - solution + 1;
        }
    },
            
    answer_arrows_handler: function(selector) {

        $(selector).on("change", ".input-answer-holder input", function() {
            $(this).parents(".input-answer-holder").data("value", $(this).val() );
        });

        $(selector).on("click", ".number-adjust", function() {
            var f = $(this).parent().find("input");
            if (f.val() == "") {
                f.val( exercise.params.min );
                $(this).parents(".input-answer-holder").data("value", exercise.params.min );
            }
            else {
                var c = parseInt(f.val()) + parseInt($(this).attr("data-sum"));
                if ( exercise.params.min <= c && c <= exercise.params.max ) {
                    f.val( c );
                    $(this).parents(".input-answer-holder").data("value", c );
                }
            }
        });
    },
            
    answer_button_handler: function() {
        $(".exe-container-answer").on("click", ".click-button-holder > div", function(e) {
            if (!answer_analyser.bCheckInProgress) {
                $(".exe-container-answer .click-button-holder > div").removeClass("checked");
                $(this).addClass("checked").data( "value", $(this).parent().data("value") );

                answer_analyser.check();
            }
        });
    },
    
    init: function() {
        $(function() {
            _helper.browserCheck();
        });
        
        _helper.window = {width: $(window).width(), height: $(window).height()};
        
        $(window).bind("resize", function() {
            var w = $(window).width();
            var h = $(window).height();
            $("#page-wrapper-inner > .answer-drag-item").each(function() {
               $(this).css({
                   left: parseInt($(this).css("left")) - (( _helper.window.width - w ))/2 /*, top: parseInt($(this).css("top")) - (( _helper.window.height - h ))/2 */ 
               }); 
            });
            _helper.window = {width: w, height: h};
        });
    },
    browserCheck: function() {
//        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//        // some code..
//       }
        var res = navigator.userAgent.match(/(Firefox|Safari)\//i);
        if (res != null) {
            $("body").addClass( res[1].toLowerCase() );
        }
    }
}

_helper.init();