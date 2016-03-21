<?php
$content = "@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans'), local('OpenSans'), url('../font/opensansnormal400.woff') format('woff');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  src: local('Open Sans Semibold'), local('OpenSans-Semibold'), url('../font/opensansnormal600.woff') format('woff');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  src: local('Open Sans Bold'), local('OpenSans-Bold'), url('../font/opensansnormal700.woff') format('woff');
}
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 400;
  src: local('Open Sans Italic'), local('OpenSans-Italic'), url('../font/opensansitalic400.woff') format('woff');
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    
    font-family: 'Open Sans', Verdana;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
    font-size: 14px;
}
.block {
    display: block;
    width: 100%;
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
.text-center {
    text-align: center;
}

#overlay {
    width: 100%;
    
    background-color: rgba(0,0,0,0.6);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 150;
    display: none;
}
#overlay > div {
    width: 300px;
    background: #3686BE;
    /*
    background: #56beff;
    background: -moz-linear-gradient(top,  #56beff 0%, #0084d6 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#56beff), color-stop(100%,#0084d6));
    background: -webkit-linear-gradient(top,  #56beff 0%,#0084d6 100%);
    background: -o-linear-gradient(top,  #56beff 0%,#0084d6 100%);
    background: -ms-linear-gradient(top,  #56beff 0%,#0084d6 100%);
    background: linear-gradient(to bottom,  #56beff 0%,#0084d6 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#56beff', endColorstr='#0084d6',GradientType=0 );
    */
    /*border: 1px solid #0070b5;*/
    /*box-shadow: 2px 2px 4px #555555;*/
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -75px;
    z-index: 101;
    height: auto;
}
#overlay .text-container {
    color: #FFFFFF; 
    font-size: 1.2em; 
    display: table-cell; 
    vertical-align: middle; 
    height: 80px; 
    padding: 10px 0px;
    text-shadow: 0px 0px 1px #004f80;
}
#overlay .alert-icon,
#overlay .loader-icon {
    color: #FFFFFF;
    float: left;
    font-size: 4em;
    height: 100%;
    text-align: center;
    text-shadow: 0 0 4px #004F80;
    width: 20%;
    position: absolute;
}
#overlay .alert-icon {
    line-height: 80px;
}
#overlay .header-text {
	padding-top: 10px;
	text-align: center;
	font-weight: bold;
	display: none;
	color: #FFFFFF; 
    font-size: 1.2em; 
}
#overlay .action-buttons {
    float: right; 
    margin: 0px 15px 15px; 
    font-size: 1.2em; 
    margin-bottom: 10px; 
}
#overlay .action-buttons .app-button {
    float: right;
    padding: 6px 20px 6px 32px;
    background-repeat: no-repeat;
    background-size: 16px 16px;
    background-position: 10px center;
}
#overlay .action-buttons .app-button-green {
    margin-left: 10px;
    background-image: url('../image/icon-accept-32.png');
}
#overlay .action-buttons .app-button-red {
    background-image: url('../image/icon-remove-user-32.png');
}
#overlay ul, #overlay li {
    background-color: transparent;
}
.app-button {
    text-shadow: 0 0 1px #004F80;
    background-color: #008EE6; 
    color: #FFFFFF; 
    border-radius: 5px 5px 5px 5px; 
    font-size: 1.2em; 
    padding: 10px 6px;
    text-align: center;
}
.app-button-white {
    background: #FFFFFF; 
    border: 1px solid #008EE6; 
    color: #008EE6; 
    font-size: 1em; 
    padding: 6px;
    text-align: center;
}";

preg_match_all('/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*?\n)/s', $content, $matches); // comments


echo "<pre>";
print_r($matches[0]);

?>