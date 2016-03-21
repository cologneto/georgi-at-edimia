var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {
    
        for (var sAttributeName in exercise_global) {
            if (exercise[sAttributeName]) {
                alert("Exercise object already has '" + sAttributeName + "' implemented.\n\nPlease consider rewriting that code");
            }
            else {
                exercise[sAttributeName] = exercise_global[sAttributeName];
            }
        }
        
        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "<?=$answer_function;?>",
            selectors: [<?=$answer_selectors;?>]
        });

        var aConfigClasses = ["<?=$exe_id_hash;?>", "<?=$config_classes;?>"];
        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render());
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
        <?=$fn_set;?>
    },
    solve: function() {
        <?=$fn_solve;?>
    },
    mark_correct: function() {
        <?=$fn_markcorrect;?>
    },
    mark_wrong: function() {
        <?=$fn_markwrong;?>
    },
    revert_wrong: function(bForceSolve) {
        <?=$fn_revert;?>
    },
    
};

