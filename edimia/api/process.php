<?php
include_once("inc/db.class.php");
$db = new DB();

$cmd = filter_input(INPUT_POST, "cmd");

//foreach ($_POST as $k => $v) {
//    error_log("POST PARAM ".$k.": " . $v);
//}

switch ($cmd) {

        case "getExerciseParams" :
            $id = filter_input(INPUT_POST, "id");
            $res = $db->query("SELECT js_filename, js_min, params, callback, modules FROM exercise WHERE id = ? ", array($id));
//            echo $res[0]->params;
            header('Content-type: application/json');
            echo json_encode(array("error" => false, "filename" => $res[0]->js_filename, "js_min" => $res[0]->js_min, "modules" => json_decode($res[0]->modules), "params" => json_decode($res[0]->params), "callback" => $res[0]->callback ));
            break;
        
        case "saveExerciseParams" :
            $id = filter_input(INPUT_POST, "id");
            $params = filter_input(INPUT_POST, "params");
            $callback = filter_input(INPUT_POST, "callback");
            $params = trim(preg_replace('/\s/', '', $params));
            $params = json_decode(json_encode($params));
            $db->query("UPDATE exercise SET params = ?, callback = ? WHERE title = ? ", array($params, $callback, $id));
            
            break;
}

?>