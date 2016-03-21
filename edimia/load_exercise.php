<?php
header('Content-Type: text/html; charset=utf-8');

$params = new stdClass();
$params->blockFK = filter_input(INPUT_GET, "blockFK", FILTER_VALIDATE_INT);
$params->momentFK = filter_input(INPUT_GET, "momentFK", FILTER_VALIDATE_INT);
$params->exerciseFK = filter_input(INPUT_GET, "exerciseFK", FILTER_VALIDATE_INT);

?>
<!doctype html>
<html lang="en"> 
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <title>Edimia</title>
        <link rel="stylesheet" href="assets/css/page.css">
        <link rel="stylesheet" href="assets/css/imagexy.css">
        <link rel="stylesheet" href="assets/css/layout.css">
        <link rel="stylesheet" href="assets/css/edimia.css">
        <link rel="stylesheet" href="assets/css/animate.css">
        <script src="assets/js/jquery-1.10.2.js"></script>
        <script src="assets/js/twig.min.js"></script>
        <script src="assets/js/jquery-ui-1.10.4.custom.min.js"></script>
        <script src="assets/js/jquery.ui.touch-punch.min.js"></script>
        <script src="assets/js/jquery.getscripts.js"></script>
        <script type="text/javascript">
            var exerciseID = <?= $params->exerciseFK ? "'" . $params->exerciseFK . "'" : 'false'; ?>;
            $(function() {

                if (exerciseID) {
                    $.post("api/process.php", {cmd: "getExerciseParams", id: exerciseID}, function(data) {
                        if (data.params != null) {
                            var init_callback = data.callback != null ? data.callback : "";
                            $.each(data.params.templates, function(k,v) {
                                if (v.callback != null && v.callback != "") {
                                    init_callback += v.callback;
                                }
                            });
                            var urls = ["/assets/js/cache/loadScripts.php?fn=" + data.js_min +"&id=" + exerciseID, 
                                        "/assets/js/cache/" + data.filename + ".js"];
                            $.getScripts( {
                                urls: urls,
                                cache: true,
                                async: false,
                                success: function() {
                                    if (init_callback != "") {
                                        data.params.callback = function() {
                                            eval(init_callback);
                                        }
                                    }
                                    exercise.init(data.params);
                                }
                            });

                        }
                        else {
                            alert("ERROR: missing exercise params");
                            $("#lnk-edit").trigger("click");
                        }
                    });
                }
            });
        </script>
    </head>
    <body>

        <div id="page-wrapper">

            <div class="exercise-progress-container">
                <div class="wizard-content">
                    <ul class="wizard-steps form-wizard"></ul>
                </div><!-- /wizard-content -->
            </div>

            <div class="instruction-holder">
                <a href="javascript:void(0);" class="speaklink">
                </a>
            </div>

            <div id="page-wrapper-inner">

                <div id="exercise-content" class="animated bounceInLeft">



                </div>

                <div id="exercise-drag-target-area" class="hidden">
    
                </div>
                
            </div>

            <div class="exercise_notification_holder">
                <div class="exercise_notification correct">Rätt!</div>
                <div class="exercise_notification error">Försök igen!</div>
                <div class="exercise_notification over">Här ser du rätt svar.</div>
            </div>
            <div class="exercise-btn exercise-btn-next hidden">
                <span>ok</span>
            </div>

        </div>

    </body>
</html>