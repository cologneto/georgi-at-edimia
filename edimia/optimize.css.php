<?php
header('Content-type: text/html; charset=utf-8');

if (isset($_POST['cmd']) && $_POST['cmd'] == "download") {
    download();
    die;
}
?>
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>CSS Optimizer - analyze your css code</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="description" content="CSS Optimizer">

        <style>
            * { 
                font-family: verdana; 
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            } 
            ul > li, a, button, input[type='submit'], input[type='button'] {
                -webkit-tap-highlight-color: transparent;
                -webkit-user-select: none;
                outline: 0;
            }
            body, html {
                padding: 0;
                margin: 0;
            }
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
            .css-line:hover{
                background-color: #EEEEEE;
            }
            label {
                font-weight: bold;
            }
            input[type="text"], textarea {
                border: 1px solid #E8E8E8;
                border-radius: 3px;
                color: #888888;
                font-size: 1.1em;
                padding: 3px;
            }
            input[type="submit"] {
                background-color: #F4F4F4;
                background-image: url("css_optimizer_gear_single.png");
                background-position: 10px center;
                background-repeat: no-repeat;
                background-size: 40px 40px;
                border: 1px solid #E8E8E8;
                border-radius: 3px;
                color: #888888;
                font-size: 1.1em;
                margin-top: 25px;
                padding: 3px 0;
                position: relative;
                width: 100%;
            }
            header {
                background-color: #F4F4F4; border-bottom: 1px solid #E8E8E8; width: 100%;
                border-top: 1px solid #5198c6;
            }
            footer {
                background-color: #F4F4F4; width: 100%;
            }
            header img {
                position: relative;
                top: 10px;
                width: 300px;
                float: left;
            }
            .content {
                margin: 0 auto;
                padding: 0 10px;
                position: relative;
            }
            header ul {
                float: right;
                list-style: none outside none;
                position: relative;
                top: 21px;
                padding-left: 0;
            }
            header ul li {
                display: inline-block;
                height: 50px;
                line-height: 50px;
                cursor: pointer;
                padding: 0 3px;
                border-bottom: 3px solid rgba(0,0,0,0);
                -webkit-transition: border-bottom 0.1s ease-in-out;
                -moz-transition: border-bottom 0.1s ease-in-out;
                transition: border-bottom 0.1s ease-in-out;
            }
            header ul li.active {
                border-bottom: 3px solid #5198C6 ! important;
            }
            header ul li:hover {
                border-bottom: 3px solid #888888;
            }
            div.row {
                border-bottom: 1px solid rgba(0,0,0,0);
            }
            div.row:hover {
                border-bottom: 1px dashed #DADADA;
            }
            .col {
                float: left;
            }
            .w40 {
                width: 40%;
            }
            .w60 {
                width: 60%;
            }
            .w15 {
                width: 15%;
            }
            .w25 {
                width: 25%;
            }
            .w30 {
                width: 30%;
            }
            .w35 {
                width: 35%;
            }
            .menu-icon {
                display: none;
            }
            footer .col {
                line-height: 35px;
                float: left;
            }
            footer .col.left {
                text-align: left;
                padding-top: 5px;
            }
            footer .col.middle {
                text-align: center;
                padding-top: 5px;
            }
            footer .col.right {
                text-align: right;
            }
            #footer-separator {
                display: none;
            }
            label {
                font-weight: normal;
            }
            @media (min-width: 980px) {
                .content {
                    width: 960px;
                }
            }
            @media (max-width: 979px) and (min-width: 768px) {
                .content {
                    width: 100%;
                }
                footer .col {
                    line-height: 20px;
                }
                footer .col.w15 {
                    width: 15%;
                }
                footer .col.left {
                    float: left;
                    width: 85%;
                    text-align: right;
                }
                footer .col.middle {
                    float: left;
                    width: 50%;
                    text-align: left;
                }
                footer .col.right {
                    float: left;
                    width: 50%;
                    text-align: right;
                }
                #footer-separator {
                    display: block;
                }
            }
            @media (max-width: 767px) {
                .content {
                    width: 100%;
                }
                .col {
                    float: none;
                    width: 100%;
                }
                header {
                    height: 66px;
                }
                header img {
                    width: 180px;
                    top: 19px;
                }
                header ul {
                    top: -2px;
                }
                header ul li {
                    padding: 0 1px;
                }
                footer .col.left,
                footer .col.middle,
                footer .col.right {
                    text-align: left;
                    padding-top: 5px;
                    line-height: 20px;
                }
            }
            @media (max-width: 480px) {
                header {
                    overflow: hidden;
                    height: 66px;
                    -webkit-transition: height 0.5s ease-out;
                    -moz-transition: height 0.5s ease-out;
                    transition: height 0.5s ease-out;
                }
                header.opened {
                    height: 268px;
                }
                header ul {
                    display: block;
                    height: 150px;
                    width: 100%;
                }
                header ul li {
                    display: block;
                }

                .content {
                    width: 100%;
                }
                .col {
                    float: none;
                    width: 100%;
                }
                .menu-icon {
                    display: inline-block;
                    float: right;
                }
                header img.logo {
                    width: 180px;
                    top: 5px;
                }
                header img.menu-icon {
                    top: 19x;
                }
            }
        </style>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script>
            $(function() {
                $("header ul > li").click(function() {
                    $("header ul > li").removeClass("active");
                    $(this).addClass("active");
                    $("header").toggleClass("opened");

                    if (typeof($(this).attr("data-scroll")) != "undefined") {
                        console.log($($(this).attr("data-scroll")).offset().top);
                        $("html,body").animate({scrollTop: $($(this).attr("data-scroll")).offset().top}, 500, 'swing');
                    }
                    else {
                        window.location = $(this).attr("data-href");
                    }

                });

                $(".menu-icon").click(function() {
                    $("header").toggleClass("opened");
                });

                $("#option-minify").click(function() {
                    if ($(this).is(":checked")) {
                        $(".option-container").css({opacity: 0.3});
                        $(".option-container").find("input[type='radio'],label").attr("disabled", true);
                    }
                    else {
                        $(".option-container").css({opacity: 1});
                        $(".option-container").find("input[type='radio'],label").removeAttr("disabled");
                    }
                });

                $("#download").click(function(e) {
                    e.preventDefault();
                    $("#export").submit();
                });

            });

            function viewport() {
                var e = window, a = 'inner';
                if (!('innerWidth' in window)) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }
                return {width: e[ a + 'Width' ], height: e[ a + 'Height' ]};
            }
            console.log(viewport());
        </script>
    </head>

    <body>


        <header class="clearfix">
            <div class="content">
                <a href="/optimize.css.php"><img class="logo" src="css_optimizer.png" /></a>
                <img class="menu-icon" src="css_optimizer_menu.png" style="width: 32px;"/>
                <ul>
                    <li data-href="http://www.voksnet.com" class="active">Voksnet</li>
                    <li data-scroll="#label-donate">Contacts</li>
                    <li data-href="http://edimia.voksnet.com/optimize.css.php">Blog</li>
                    <li data-scroll="#label-donate">Donate</li>
                </ul>
            </div>
        </header>
        <div style="border-bottom: 1px solid #e8E8E8; padding-top: 25px;">
            <div class="content">
                <div class="clearfix" style="width: 100%;">
                    <div class="col w40">
                        <div style="padding-right: 20px; line-height: 30px;">
                            <h3>CSS Optimizer</h3>
                            <p>Paste your CSS file URL or the contents of your CSS file into the boxes on the right
                                and watch our CSS Optimizer do its magic. It will analyze your code and report of any rulesets with duplicate definitions and 
                                line numbers to find them.</p>
                            <p>Furthermore, your will have an option to minify or adjust display options and download your optimized CSS code.</p>
                            <p>Enjoy!</p>
                        </div>
                    </div>
                    <div class="col w60">
                        <form method="post">
                            <input type="hidden" name="cmd" value="analyze" />
                            <label for="frm-url">CSS file URL</label>
                            <input type="text" id="frm-url" name="url" placeholder="http://" style="display: block; width: 100%;"/>
                            <div style="margin: 10px 0;">- or -</div>
                            <label for="frm-css">CSS file content</label>
                            <textarea id="frm-css" name="css" style="display: block; width: 100%;" rows="10" placeholder="root { display: block; }"><?=filter_input(INPUT_POST, 'css');?></textarea>
                            <input type="submit" value="Analyze CSS &raquo;" style="" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <?php
        $content = false;
        $bError = false;
        if (filter_has_var(INPUT_POST, "cmd")) {

            $url = filter_input(INPUT_POST, 'url', FILTER_VALIDATE_URL);
            $css = filter_input(INPUT_POST, 'css');
            if ($url) {
                $content = file_get_contents($url);
            } else {
                $content = $css;
//                echo "<prE>".$content."</pre>";
//                die;
            }

            list($strippedCSS, $mediaQueries) = parseMediaBlocks($content);

            $mediaBlocks = array();
            foreach ($mediaQueries as $media) {
                preg_match('/^(@media.*?){(.*)}\s*$/s', $media, $matches);
                $mediaBlocks[ $matches[1] ] = trim($matches[2]);
            }
            
            $css_lines = explode("\n", $content);
            list($comment_lines, $comment_chars) = get_comments($content);

            $used = $rules = array();
            $css_invalid = $duplicates = false;
            $newcontent = "";
            $newlen = $newlines = 0;

            $braces = do_braces_match($css_lines);
            if (!count($braces)) {
                list($used, $not_sorted, $duplicates, $rules) = process($content);

                list($newcontent, $newlen, $newlines) = get_css($not_sorted, $rules);
            } else {
                $bError = true;
            }
            ?>
            <div style="border-bottom: 1px solid #e8E8E8; background-color: #F4F4F4; padding-bottom: 20px;">
                <div class="content">
                    <div class="clearfix" style="width: 100%;">
                        <h3 style="margin-bottom: 0">CSS file statistics before optimization</h3>
                    </div>
                    <div class="clearfix row" style="width: 100%; padding-left: 20px;">
                        <div style="width: 80%; float: left;">Number of lines</div>
                        <div style="width: 20%; float: left; text-align: right;"><?= count($css_lines); ?></div>
                    </div>
                    <div class="clearfix row" style="width: 100%; padding-left: 20px;">
                        <div style="width: 80%; float: left;">Characters</div>
                        <div style="width: 20%; float: left; text-align: right;"><?= strlen($content); ?></div>
                    </div>
                    <div class="clearfix row" style="width: 100%; padding-left: 20px;">
                        <div style="width: 80%; float: left;">Comment blocks (characters)</div>
                        <div style="width: 20%; float: left; text-align: right;"><?= count($comment_lines) . " (" . $comment_chars . ")"; ?></div>
                    </div>
                    <?php if (!$bError) { ?>
                        <div class="clearfix" style="width: 100%;">
                            <h3 style="margin-bottom: 0">Expected result after optimization</h3>
                        </div>
                        <div class="clearfix row" style="width: 100%; padding-left: 20px;">
                            <div style="width: 80%; float: left;">Number of lines</div>
                            <div style="width: 20%; float: left; text-align: right;"><?= $newlines; ?></div>
                        </div>
                        <div class="clearfix row" style="width: 100%; padding-left: 20px;">
                            <div style="width: 80%; float: left;">Characters</div>
                            <div style="width: 20%; float: left; text-align: right;"><?= strlen($newcontent); ?></div>
                        </div>

                        <div class="clearfix" style="width: 100%;">
                            <h3 style="margin-bottom: 0">CSS optimization summary</h3>
                        </div>
                        <div class="clearfix row" style="width: 100%; padding-left: 20px;">
                            <div style="width: 80%; float: left;">CSS file size (<i>minified</i>) decreased by</div>
                            <div style="width: 20%; float: left; text-align: right;"><span style="color: #008000; font-weight: bold;">
                                    <?= number_format(100 - ( strlen($newcontent) / strlen($content) ) * 100, 2); ?>%
                                </span></div>
                        </div>
                        <form id="export" method="post" action="http://edimia.voksnet.com/optimize.css.php" target="downloadframe">
                            <input type="hidden" name="cmd" value="download" />
                            <input type="hidden" name="css" value='<?= htmlentities(json_encode($not_sorted), ENT_QUOTES); ?>' />
                            <input type="hidden" name="rules" value='<?= htmlentities(json_encode($rules), ENT_QUOTES); ?>' />

                            <div class="clearfix" style="width: 100%;">
                                <h3 style="margin-bottom: 0">Export optimized CSS</h3>
                            </div>
                            <div class="clearfix row" style="width: 100%; padding-left: 20px;">
                                <div style="width: 50%; float: left;">Minified</div>
                                <div style="width: 50%; float: left; text-align: right;">
                                    <input id="option-minify" name="minify" type="checkbox" checked autocomplete="off">
                                </div>
                            </div>
                            <div class="clearfix row option-container" style="width: 100%; padding-left: 20px; opacity: 0.3;">
                                <div style="width: 50%; float: left;">Indent declarations</div>
                                <div style="width: 50%; float: left; text-align: right;">
                                    <input name="option_indent" id="option_indent_yes" type="radio" value="yes" checked disabled autocomplete="off"> <label for="option_indent_yes">Yes</label> <input name="option_indent" id="option_indent_no" type="radio" value="no" disabled autocomplete="off"> <label for="option_indent_no">No</label>
                                </div>
                            </div>
                            <div class="clearfix row option-container" style="width: 100%; padding-left: 20px; opacity: 0.3;">
                                <div style="width: 50%; float: left;">Open curly brace on separate line</div>
                                <div style="width: 50%; float: left; text-align: right;">
                                    <input name="option_brace" id="option_brace_yes" type="radio" value="yes" checked disabled autocomplete="off"> <label for="option_brace_yes">Yes</label> <input name="option_brace" id="option_brace_no" type="radio" value="no" disabled autocomplete="off"> <label for="option_brace_no">No</label>
                                </div>
                            </div>
                            <div class="clearfix row option-container" style="width: 100%; padding-left: 20px; opacity: 0.3;">
                                <div style="width: 50%; float: left;">Closed curly brace on separate line</div>
                                <div style="width: 50%; float: left; text-align: right;">
                                    <input name="option_closebrace" id="option_closebrace_yes" type="radio" value="yes" checked disabled autocomplete="off"> <label for="option_closebrace_yes">Yes</label> <input name="option_closebrace" id="option_closebrace_no" type="radio" value="no" disabled autocomplete="off"> <label for="option_closebrace_no">No</label>
                                </div>
                            </div>
                            <div class="clearfix row option-container" style="width: 100%; padding-left: 20px; opacity: 0.3;">
                                <div style="width: 50%; float: left;">Blank line between rulesets</div>
                                <div style="width: 50%; float: left; text-align: right;">
                                    <input name="option_blank" id="option_blank_yes" type="radio" value="yes" checked disabled autocomplete="off"> <label for="option_blank_yes">Yes</label> <input name="option_blank" id="option_blank_no" type="radio" value="no" disabled autocomplete="off"> <label for="option_blank_no">No</label>
                                </div>
                            </div>
                            <div class="option-container" style="width: 100%; padding-left: 20px; opacity: 0.3; font-size: 0.8em;">
                                <b>Other options enforced in the unminified CSS:</b>
                                <ul style="margin-top: 0;">
                                    <li>There is no empty line between declarations inside a ruleset</li>
                                    <li>No space between the property name and colon and a single space between colon and the property value (ex: <i>border: none;</i>)</li>
                                    <li>Comments are removed</li>
                                </ul>
                            </div>
                            <div style="text-align: center;">
                                <a href="#" id="download" style="color: #000000; text-decoration: none;"><b>Download your optimized CSS</b></a>
                            </div>
                        </form>
                    <?php } ?>

                </div>
            </div>
            <?php
            echo '<div style="border-bottom: 1px solid #e8E8E8;"><div class="content" style="padding: 15px 0;">';


            if ($bError) {
                echo '<h3>Analysis complete. The following errors were encountered:</h3>';
                if (count($braces)) {
                    echo '<div style="color: red">';
                    echo '<b>Mismatching { }:</b><br/>';
                    echo '<span style="margin: 0 10px">&bull;</span>No closing } found for { defined on line' . (count($braces) ? 's' : '') . ': <b>' . implode(", ", $braces) . '</b>';
                    echo '</div>';
                }
            } else if ($duplicates) {
                echo '<h3>Analysis complete. Here\'s your results...</h3>';

                $cnt = 0;
                foreach ($used as $css) {
                    if (count($css) > 1) {
                        echo '<div style="background-color: ' . ($cnt++ % 2 == 1 ? "#FFFFFF" : "#F4F4F4") . '; border-top: 1px solid #E8E8E8; padding: 5px 5px 5px 15px;">';
                        echo '<div style="text-align: right"><b><i>' . count($css) . ' classes with same declaration</i></b></div>';
                        foreach ($css as $r) {
                            echo '<div class="css-line">' . $r . '<span style="float: right;">[<i>Line: <b>' . get_line_number($css_lines, $r) . '</b></i>]</div>';
                        }
                        echo '<div style="padding: 0 0 0 5px;"><b>{</b>
                                <div style="padding: 10px 0px 10px 25px;">' . implode("<br>", $rules[$css[0]]->options) . '</div>
                                    <b>}</b>
                            </div>';
                        echo '</div>';
                    }
                }
            } else {
                echo '<h3>Analysis complete. No duplicate definitions found!</h3>';
            }
            echo '</div></div>';
        }
        ?>

        <footer style="color: #888888;">
            <div class="content">
                <div class="clearfix" style="width: 100%;">
                    <div class="col w15">
                        <img src="css_optimizer_gear.png" style="width: 100px; margin-top: 10px"/>
                    </div>
                    <div class="col w30 left">
                        <p>
                            Have a question? E-mail us at:<br/>
                            <i>css@voksnet.com</i>
                        </p>
                    </div>
                    <br id="footer-separator" style="clear: both;" />
                    <div  class="col w30 middle">
                        <p>
                            Or visit our blog:<br/>
                            <i>Coming soon</i>
                        </p>
                    </div>
                    <div  class="col w25 right">
                        <p id="label-donate">Did you like our service?</p>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_donations">
                            <input type="hidden" name="business" value="bobev@zero.bg">
                            <input type="hidden" name="lc" value="US">
                            <input type="hidden" name="item_name" value="Voksnet Ltd">
                            <input type="hidden" name="no_note" value="0">
                            <input type="hidden" name="currency_code" value="USD">
                            <input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest">
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                        </form>

                    </div>
                </div>
            </div>
        </footer>
        <div class="content">
            <div class="clearfix content" style="width: 100%; font-size: 0.8em; color: #CCCCCC; text-align: right; margin: 10px auto;">
                <div style="float: left; width: 50%; text-align: left;">
                    CSS Optimizer v1.0 by <a href="http://www.voksnet.com" style="text-decoration: none; color: #CCCCCC; font-weight: bold;">Voksnet Ltd.</a>
                </div>
                <div style="float: left; width: 50%; text-align: right;">
                    Copyright &copy; 2008-<?= date("Y"); ?>
                </div>
            </div>
        </div>
        <iframe name="downloadframe" style="width: 0; height: 0; opcity: 0"></iframe>
    </body>
</html>
<?php

function download() {
//  minify=on
//  option_indent=no&option_brace=yes&option_closebrace=no&option_blank=yes
    $used = json_decode(html_entity_decode($_POST['css']));
    $rules = json_decode(html_entity_decode($_POST['rules']));

    $content = "";
    if (isset($_POST['minify']) && $_POST['minify'] == "on") {
        foreach ($used as $css) {
            $content .= implode(",", array_map(function($a) {
                                return trim($a);
                            }, $css));
            $content .= "{" . implode(";", array_map(function($a) {
                                return trim($a);
                            }, $rules->{$css[0]}->options) ) . ";}";
        }
    } else {
        foreach ($used as $css) {
            $content .= implode(",", array_map(function($a) {
                                return trim($a);
                            }, $css));
            if ($_POST['option_brace'] == "yes") {
                $content .= "\n{\n";
            } else {
                $content .= " {\n";
            }

            if ($_POST['option_indent'] == "yes") {
                $content .= "\t";
            }
            $content .= implode(";\n" . (($_POST['option_indent'] == "yes") ? "\t" : ""), $rules->{$css[0]}->options) . ";";
            $content .= ($_POST['option_closebrace'] == "yes") ? "\n}\n" : " }\n";

            if ($_POST['option_blank'] == "yes") {
                $content .= "\n";
            }
        }
    }

    header("Content-Disposition: attachment; filename=\"styles.cssoptimizer.css\"");
    header("Content-Type: application/force-download");
    header("Content-Length: " . strlen($content));
    header("Connection: close");

    echo $content;
}

function get_css($used, $rules) {
    $content = "";
    $lines = 0;
    foreach ($used as $css) {
        $lines += count($css);
        $content .= implode(",", $css);
        $content .= "{" . implode(";", $rules[$css[0]]->options) . ";}";
        $lines += count($rules[$css[0]]) + 2;
    }
    return array($content, strlen($content), $lines);
}

function do_braces_match($css_lines) {
    $braces = array();
    foreach ($css_lines as $num => $line) {
        for ($i = 0; $i < strlen($line); $i++) {
            if ($line[$i] == "{") {
                array_push($braces, $num + 1);
            } else if ($line[$i] == "}") {
                array_pop($braces);
            }
        }
    }
    return $braces;
}

function process($content) {

    $content = strip_stuff($content);

    $content = preg_replace('/[\t\n]/', "", $content);

    $regex = '/[}]?(.*?){(.*?)}/s';
    preg_match_all($regex, $content, $matches);

    $rules = array();
    foreach ($matches[1] as $idx => $selector) {
        $options = array_filter(array_map(function($a) {
                            return $a != "" ? trim($a) : false;
                        }, explode(";", $matches[2][$idx])));
        sort($options, SORT_NATURAL);
        $tmp = new stdClass();
        $tmp->options = $options;
        $tmp->hash = md5(json_encode($options));
        $rules[$selector] = $tmp;
    }

    $duplicates = false;
    $used = array();
    foreach ($rules as $selector => $css) {
        if (!array_key_exists($css->hash, $used)) {
            $used[$css->hash] = array($selector);
        } else {
            $duplicates = true;
            $used[$css->hash][] = $selector;
        }
    }
    $not_sorted = $used;
    usort($used, function($a, $b) {
                return count($a) == count($b) ? 0 : (count($a) < count($b) ? 1 : -1);
            });

    return array($used, $not_sorted, $duplicates, $rules);
}

function strip_stuff($content) {

    $content = preg_replace('/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/', "", $content); // comments
    $content = preg_replace('/\s{2,}/', " ", $content);     // multiple spaces

    return $content;
}

function get_comments($content) {

    preg_match_all('/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*?\n)/s', $content, $matches); // comments
    $num = 0;
    foreach ($matches[0] as $m) {
        $num += strlen($m);
    }
    return array($matches[0], $num);
}

function get_line_number($content, $findme) {
    $findme = trim($findme);
//    echo "<pre>";
//    print_r($content);
//    die;
//    echo $findme;die;
//    echo "FINDME: '".$findme."'<br>";
    $linenum = -1;
    foreach ($content as $num => $line) {
        if (strpos($line, $findme) !== false) {
            $linenum = $num;
            break;
        }
    }
    return $linenum + 1;
}

function parseMediaBlocks($css) {
    $mediaBlocks = array();
    $stripped = "";
    $start = 0;
    $cssparsestart = 0;
    
    
    while (($start = strpos($css, "@media", $start)) !== false) {
        // stack to manage brackets
        $s = array();

        // get the first opening bracket
        $i = strpos($css, "{", $start);

        $stripped .= substr($css, $cssparsestart, $start - $cssparsestart);
        
        // if $i is false, then there is probably a css syntax error
        if ($i !== false) {
            // push bracket onto stack
            array_push($s, $css[$i]);

            // move past first bracket
            $i++;

            while (!empty($s)) {
                // if the character is an opening bracket, push it onto the stack, otherwise pop the stack
                if ($css[$i] == "{") {
                    array_push($s, "{");
                } elseif ($css[$i] == "}") {
                    array_pop($s);
                }

                $i++;
            }

            // cut the media block out of the css and store
            $mediaBlocks[] = substr($css, $start, ($i + 1) - $start);

            // set the new $start to the end of the block
            $start = $i;
            $cssparsestart = $start;
        }
    }

    return array($stripped, $mediaBlocks);
}
?>