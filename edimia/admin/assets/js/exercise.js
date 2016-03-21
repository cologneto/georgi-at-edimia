$(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    $("#exercise-form-submit").trigger("click");
    event.preventDefault();
    return false;
});

var exercise = {
    bAnimating: false,
    params: {
        site_path: "/admin/index.php/"
    },
    editor_params: {}
}
$(function() {

    if ( m = window.location.href.match(/exercises\/index\/\d+\/\d+\/\d+\/(\d+)$/) ) {
        $("body,html").animate({scrollTop: m[1]}, 0);
    }

    $(".exe-filter.filter-block").change(function() {
        window.location = exercise.params.site_path + "/exercises/index/" + $(this).val()
    });
    $(".exe-filter.filter-moment").change(function() {
        window.location = exercise.params.site_path + "/exercises/index/" + $(".exe-filter.filter-block").val() + "/" + $(this).val();
    });
    $(".exe-filter.filter-exercise").change(function() {
        window.location = exercise.params.site_path + "/exercises/index/" + $(".exe-filter.filter-block").val() + "/" + $(".exe-filter.filter-moment").val() + "/" + $(this).val();
    });
    
    $("#exercise-form-submit").click(function() {
        if ($(this).hasClass("disabled")) {
            return false;
        }
        if ($("input[type='checkbox'][name='operation[]']:checked").length < 1) {
            alert("ERROR: please select at least one operation");
            return false;
        }
        else if ($("input[type='checkbox'][name='params[]']:checked").length < 1) {
            alert("ERROR: please select at least one parameter");
            return false;
        }
        else if ($("input[type='checkbox'][name='templates[]']:checked").length < 1) {
            alert("ERROR: please select required templates");
            return false;
        }
        else if ( $("#frm-num-range").val().match(/^\d+\-\d+$/) === null) {
            alert("ERROR: invalid number range.\n\nPlease edit the moment.");
            return false;
        }
        else {
            
            $.each(exercise.editor_params.editors, function(k,v) {
                $("#" + v.replace("code-", "frm-")).val( exercise.editor_params.objects[k].getValue() );
            });
            $("#frm-scroll_amount").val( $(window).scrollTop() );$
            
            $("#exercise-form").submit();
        }
    });
    
    $("#lnk-expand-params").click(function() {
        if (exercise.bAnimating) {
            return false;
        }
        exercise.bAnimating = true;
        var bVisible = $("textarea.params").is(":visible");
        if (!bVisible) {
            $("textarea.params").show();
        }
        console.log(bVisible);
        $("textarea.params").animate({height: (bVisible?0:250) + "px"}, 500, function() {
            if (bVisible) {
                $("textarea.params").hide();
            }
            $("#lnk-expand-params").text(bVisible?"+":"-");
            exercise.bAnimating = false;
        });
        return false;
    });
    
    $(".exe-funcs,.exe-params").on("change", function() {
       $("#frm-force_cache_recalc").val( 'yes' );
       $("#cb_force_cache_recalc").attr("checked", 'checked');
    });
    
    $("#cb_force_cache_recalc").click(function() {
       $("#frm-force_cache_recalc").val( $(this).is(":checked") ? 'yes' : 'no' ); 
    });
    
    exercise.editor_params = {theme: "ace/theme/chrome", mode: "ace/mode/javascript", editors: ["code-fn_set","code-fn_revert","code-fn_solve","code-fn_markcorrect","code-fn_markwrong","code-callback"], objects: []};
    $.each(exercise.editor_params.editors, function(k,v) {
        exercise.editor_params.objects.push( ace.edit( v ) );
        exercise.editor_params.objects[k].setTheme( exercise.editor_params.theme );
        exercise.editor_params.objects[k].getSession().setMode( exercise.editor_params.mode );
    });
});