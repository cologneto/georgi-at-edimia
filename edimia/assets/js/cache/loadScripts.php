<?php
$filename = $_GET['fn'];
$exercieFK = $_GET['id'];

header("content-type: application/javascript");

if ( $filename != "" && file_exists(dirname(__FILE__) . "/" . $filename.".min.js") ) {
    echo file_get_contents( dirname(__FILE__) . "/" . $filename . ".min.js" );
}
else {
    include_once("../../../api/inc/db.class.php");
    $db = new DB();
    
    $res = $db->query("SELECT modules FROM exercise WHERE id = ?", array($exercieFK));
    $content = "";
    $hash = md5($res[0]->modules);
    foreach(json_decode($res[0]->modules) as $m) {
        $c = trim(file_get_contents("../" . $m->file));
        $c .= ";";
        $content .= $c;
    }
    file_put_contents(dirname(__FILE__) . "/" . $hash . ".js", $content);
    system("cd ".dirname(__FILE__)." && yui-compressor --type js -o " . $hash . ".min.js ".$hash . ".js");
    
    $db->query("UPDATE exercise SET js_min = ? WHERE id = ?", array($hash, $exercieFK));
    
    echo file_get_contents( dirname(__FILE__) . "/" . $hash . ".min.js" );
}
?>