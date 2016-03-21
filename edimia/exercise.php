<?php
require_once("vendor/autoload.php");

$loader = new Twig_Loader_Filesystem('/var/www/edimia.voksnet.com/templates');
$twig = new Twig_Environment($loader, array(
    'cache' => false, //'/var/www/edimia.voksnet.com/templates/cache',
        ));

include_once("api/inc/db.class.php");
$db = new DB();

$params = new stdClass();
$params->blockFK = filter_input(INPUT_GET, "blockFK", FILTER_VALIDATE_INT);
$params->momentFK = filter_input(INPUT_GET, "momentFK", FILTER_VALIDATE_INT);
$params->exerciseFK = filter_input(INPUT_GET, "exerciseFK", FILTER_VALIDATE_INT);

$option_template = '<option value="%s" %s>%s</option>';
$block_list = $moment_list = $exercise_list = '<option value="">---</option>';
$res = $db->query("SELECT id, name FROM block ORDER BY sort_order ASC");
foreach ($res as $r) {
    $block_list .= sprintf($option_template, $r->id, $params->blockFK == $r->id ? "selected" : "", $r->name);
}
if ($params->blockFK) {
    $res = $db->query("SELECT id, description FROM moment WHERE blockFK = ? ORDER BY sort_order ASC", array($params->blockFK));
    foreach ($res as $r) {
        $moment_list .= sprintf($option_template, $r->id, $params->momentFK == $r->id ? "selected" : "", $r->description);
    }
}
if ($params->momentFK) {
    $res = $db->query("SELECT id, title FROM exercise WHERE momentFK = ? ORDER BY sort_order ASC", array($params->momentFK));
    foreach ($res as $r) {
        $exercise_list .= sprintf($option_template, $r->id, $params->exerciseFK == $r->id ? "selected" : "", $r->title);
    }
}
?>
<!doctype html>
<html lang="en"> 
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <title>Edimia</title>
        <link rel="stylesheet" href="assets/css/page.css">
        <link rel="stylesheet" href="assets/css/imagexy.css">
        <link rel="stylesheet" href="assets/css/layout.css">
        <link rel="stylesheet" href="assets/css/edimia.css">
        <link rel="stylesheet" href="assets/css/animate.css">
        <style>
            .clearfix:after {
                content: ".";
                display: block;
                clear: both;
                visibility: hidden;
                line-height: 0;
                height: 0;
            }
            .clearfix {
                display: inline-block;
            }
            html[xmlns] .clearfix {
                display: block;
            }
            * html .clearfix {
                height: 1%;
            }
            #exercise-selector {
                background-color: #687578;
                border-radius: 3px;
                box-shadow: 0 0 1px #fff;
                color: #ffffff;
                font-weight: normal;
                left: 10px;
                padding: 15px;
                position: absolute;
                top: 10px;
                width: 300px;
                z-index: 10;
            }
            #exercise-properties {
                width: 500px;
                height: 460px;
                display: none;
                margin-top: 10px;
            }
            #lnk-edit, .params-save {
                cursor: pointer;
            }
            #lnk-edit:hover, .params-save:hover {
                color: #CCCCCC;
            }
        </style>
        <script src="assets/js/jquery-1.10.2.js"></script>
        <script src="assets/js/twig.min.js"></script>
        <script src="assets/js/jquery-ui-1.10.4.custom.min.js"></script>
        <script src="assets/js/jquery.ui.touch-punch.min.js"></script>
        <script src="assets/js/jquery.getscripts.js"></script>
        <script type="text/javascript">
            var exerciseID = <?= $params->exerciseFK ? "'" . $params->exerciseFK . "'" : 'false'; ?>;
            $(function() {

                $("#btn-load").click(function() {
                    if ($("#exe-list").val() != "") {
                        window.location = "exercise.php?e=" + $("#exe-list").val();
                    }
                });
                $("#block-list").change(function() {
                    window.location = "exercise.php?blockFK=" + $(this).val();
                });
                $("#moment-list").change(function() {
                    window.location = "exercise.php?blockFK=" + $("#block-list").val() + "&momentFK=" + $(this).val();
                });
                $("#exe-list").change(function() {
                    window.location = "exercise.php?blockFK=" + $("#block-list").val() + "&momentFK=" + $("#moment-list").val() + "&exerciseFK=" + $(this).val();
                });

                $("#lnk-edit").click(function() {
                    if (!$("#exercise-properties").is(":visible")) {
                        $("#params,#callback").val('').attr("disabled", true);
                        $("#exercise-properties").show(500, function() {
                            $("#lnk-edit").find("span").text("x");
                            $.post("api/process.php", {cmd: "getExerciseParams", id: $("#exe-list").val()}, function(data) {
                                if (data.params != null) {
                                    $("#params").val(JSON.stringify(data.params, undefined, 4));
                                }
                                if (data.callback != null) {
                                    $("#callback").val(data.callback);
                                }
                                $("#params,#callback").removeAttr("disabled");
                            });
                        });
                    }
                    else {
                        $("#exercise-properties").hide(500, function() {
                            $("#lnk-edit").find("span").text("edit");
                        });
                    }
                });

                $(".params-save").click(function() {
                    var lnk = $(this);
                    $.post("api/process.php", {
                        cmd: "saveExerciseParams", id: $("#exe-list").val(),
                        params: $("#params").val(),
                        callback: $("#callback").val()
                    }, function(data) {
                        if (lnk.data("reload") == "yes") {
                            window.location = "exercise.php?e=" + $("#exe-list").val();
                        }
                        else {
                            $("#exercise-properties").hide(500, function() {
                                $("#lnk-edit").find("span").text("edit");
                            });
                        }
                    });
                    return false;
                });


                if (exerciseID) {
                    $("#lnk-edit").show();
                    $("#btn-load").removeAttr("disabled");
                    $.post("api/process.php", {cmd: "getExerciseParams", id: exerciseID}, function(data) {
                        //console.log( data );
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

        <div id="exercise-selector">
            <div class="clearfix" style="width: 100%;">
                Select block: <select id="block-list" style="width: 150px; float:right;" autocomplete="off"><?= $block_list; ?></select> 
            </div>
            <div class="clearfix" style="width: 100%;">
                Select moment: <select id="moment-list" style="width: 150px; float:right;" autocomplete="off"><?= $moment_list; ?></select> 
            </div>
            <div class="clearfix" style="width: 100%;">
                Select exercise: <select id="exe-list" style="width: 150px; float:right;" autocomplete="off"><?= $exercise_list; ?></select> 
            </div>
            <input id="btn-load" type="button" value="Load" disabled="true" style="display: none" />
            <!--<a id="lnk-edit" style="float: right; display: block; line-height: 24px">[<span>edit</span>]</a>-->
            <div id="exercise-properties">
                <div><b>Params</b></div>
                <textarea id="params" style="width: 100%; height: 300px; resize: none;"></textarea>
                <div><b>Callback</b></div>
                <textarea id="callback" style="width: 100%; height: 100px; resize: none;"></textarea>
                <div style="text-align: right;">
                    [<a class="params-save" data-reload="no">Save</a>]
                    [<a class="params-save" data-reload="yes">Save and reload</a>]
                </div>
            </div>
        </div>

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