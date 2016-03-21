<?php
include_once( realpath(__DIR__ . "/..") . "/api/inc/db.class.php");
$db = new DB();

?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">
        <title>Edimia :: Exercise Admin</title>
        <link rel="stylesheet" href="/admin/assets/css/styles.css">
        <script src="/assets/js/jquery-1.10.2.js"></script>
        <script type="text/javascript">
            $(function() {
                
            });
        </script>
    </head>
    <body>
        <header>
            <img src="/admin/assets/image/edimia_logo.png" class="logo">
        </header>
        
        <div id="main-container">
            
            <nav>
                <div class="item arrow">dashboard</div>
                <div class="item">Blocks</div>
                <div class="item">Moments</div>
                <div class="item">Exercises</div>
                <div class="item">static js</div>
            </nav>
            
            <div class="center-content">
                <?php
                echo "<prE>";
                print_r($_SERVER);
                echo "</prE>";
                ?>
            </div>
        </div>
    </body>
</html>