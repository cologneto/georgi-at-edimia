<?php
require_once("vendor/autoload.php");

$loader = new Twig_Loader_Filesystem('/var/www/edimia.voksnet.com/templates');
$twig = new Twig_Environment($loader, array(
            'cache' => false, //'/var/www/edimia.voksnet.com/templates/cache',
        ));
?>
<!doctype html>
<html lang="en"> 
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <title>Edimia</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <link rel="stylesheet" href="assets/css/layout.css">
        <link rel="stylesheet" href="assets/css/edimia.css">
        <link rel="stylesheet" href="assets/css/animate.css">
        <script src="assets/js/jquery-1.10.2.js"></script>
        <script src="assets/js/twig.min.js"></script>
        <script src="assets/js/jquery-ui-1.10.4.custom.min.js"></script>
        <script src="assets/js/jquery.ui.touch-punch.min.js"></script>
        <script src="assets/js/module.template.js"></script>
        <script src="assets/js/module.helper.js"></script>
        <script src="assets/js/module.exercise.js"></script>
        <script src="assets/js/module.exercise_0-5-E6.js"></script>
        <script src="assets/js/module.draggable_1.js"></script>
        <script src="assets/js/module.droppable_1.js"></script>
        <script src="assets/js/module.answer_0-5-A.js"></script>
        <script src="assets/js/module.progress.js"></script>
        <script src="assets/js/module.events.js"></script>
        <script src="assets/js/number_image.js"></script>
        <script type="text/javascript">
            $(function() {
            
                exercise.init({
                    operationMix: ["addition", "subtraction"],
                    min: 0,
                    max: 5,
                    numpairs: 3,
                    bShowOKButton: true,
                    bExcludeZero: true,
                    templates: [
                        {
                            id: "layout",
                            file: "main_exercise_layout"
                        },
                        {
                            id: "progressindicator",
                            file: "progress_indicator"
                        },
                        {
                            id: "equation",
                            file: "equation_container"
                        },
                        {
                            id: "numberimage",
                            file: "numberimage"
                        },
                        {
                            id: "imageholder",
                            file: "imageholder"
                        },
                        {
                            id: "answer",
                            file: "answer_container"
                        },
                        {
                            id: "dragbox",
                            file: "0-5-A10_dragbox"
                        },
                        {
                            id: "dragitem",
                            file: "dragitem"
                        },
                        {
                            id: "answerinput",
                            file: "answer_input_arrows"
                        }
                    ],
                    callback: function(){
                        _helper.answer_arrows_handler("#exercise-content");
                    }
                });
            
                            
                            
            
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

                <div id="exercise-drag-target-area">
    
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