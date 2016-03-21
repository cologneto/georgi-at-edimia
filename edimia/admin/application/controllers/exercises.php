<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Exercises extends CI_Controller {
    var $project_path = "/var/www/edimiadev.voksnet.com";

    function __construct() {
        parent::__construct();
        $this->load->vars(array(
           "navigation" => $this->load->view('navigation', array("active"=>"exercises"), true)
        ));
        $this->load->model('Exercise_model');
    }
    public function index() {
        
        $blockFK = $this->uri->segment(3);
        $momentFK = $this->uri->segment(4);
        $exerciseFK = $this->uri->segment(5);
        
        $blocks = form_dropdown('blocks', $this->Exercise_model->get_blocks_array(), $blockFK, "autocomplete='off' class='exe-filter filter-block'");
        $moments = form_dropdown('moments', $this->Exercise_model->get_moments_array($blockFK), $momentFK, "autocomplete='off' class='exe-filter filter-moment' " . (!$blockFK?"disabled":""));
        $exercises = form_dropdown('exercises', $this->Exercise_model->get_exercises_array($momentFK), $exerciseFK, "autocomplete='off' class='exe-filter filter-exercise' " . (!$momentFK?"disabled":"") );
        
        $data = array(
            "blocks" => $blocks, 
            "moments" => $moments, 
            "exercises" => $exercises,
            "button_disabled" => $exerciseFK ? "" : "disabled",
            "exercise_form" => $this->load->view('exercise_force_select', '', true)
        );

        if ($exerciseFK) {
            $oExe = $this->Exercise_model->get_exercise_data($exerciseFK);
            $oExe->params_string = json_encode(json_decode($oExe->params), JSON_PRETTY_PRINT);
            $oExe->params = json_decode($oExe->params);
            $oExe->config = json_decode($oExe->config);
            $oExe->modules = json_decode($oExe->modules);
//        echo "<prE>";
//        print_r($oExe->modules);
//        die;
            $params = array(
                "oExe" => $oExe,
                "templates" => "",
                "modules" => ""
            );
            
            $params['template_callbacks'] = "";
            foreach ($this->Exercise_model->get_templates() as $tpl) {
                $bHasTemplate = $this->Exercise_model->exercise_has_template($oExe->params->templates, $tpl->reference, $tpl->filename);
                $params["templates"] .= '<div class="span4">'.
                                            $this->load->view("exercise_checkbox", 
                                                    array("name" => "templates", "id" => $tpl->id, "hash"=>md5($tpl->filename), "label" => $tpl->filename." [".$tpl->reference."]", "checked" => $bHasTemplate ? "checked" : "" ), 
                                                    true)
                                        . '</div>';
                if ($bHasTemplate && $tpl->callback != "") {
                    $params['template_callbacks'] .= '<div>'.implode('</div><div>', explode("\n", trim($tpl->callback))).'</div>';
                }
            }
            foreach ($this->Exercise_model->get_modules() as $tpl) {
                $bHasModule = $this->Exercise_model->exercise_has_module($oExe->modules, $tpl->id, $tpl->filename);
                $params["modules"] .= '<div class="span3">'.
                                            $this->load->view("exercise_checkbox", 
                                                    array("name" => "modules", "id" => $tpl->id, "hash"=>md5($tpl->filename), "label" => $tpl->name."<div class='module-descriptor'>".$tpl->description."</div>", "checked" => $bHasModule ?"checked":"" ), 
                                                    true)
                                        . '</div>';
            }
            $data["exercise_form"] = $this->load->view('exercise_form', $params, true);
        }
        
        $content = $this->load->view('exercises', $data, true);
        $this->load->view('html', array("content" => $content));
    }
    
    public function save() {
//        echo "<pre>";
//        print_r($_POST);
//        echo "</pre>";
//        die;
        
        $title = $this->input->post("exercise_title");
        $exerciseFK = $this->input->post("exerciseFK");
        $operation = $this->input->post("operation");
        $exeparams = $this->input->post("params");
        $templates = $this->input->post("templates");
        $modules = $this->input->post("modules");
        $num_pairs = $this->input->post("num_pairs");
        $num_range = explode("-", $this->input->post("number_range"));
        $scroll_amount = $this->input->post("scroll_amount");
        
        $params = new stdClass();
        
        if ( count($operation) == 1) {
            $params->operation = $operation[0];
        }
        else {
            $params->operationMix = $operation;
        }
        $params->min = $num_range[0];
        $params->max = $num_range[1];
        
        if (is_numeric($num_pairs)) {
            $params->num_pairs = $num_pairs;
        }
        
        foreach ($exeparams as $p) {
            $params->$p = true;
        }
        $params->templates = array();
        foreach ($this->Exercise_model->get_templates($templates) as $tpl) {
            $tmp = new stdClass();
            $tmp->id = $tpl->reference;
            $tmp->file = $tpl->filename;
            $tmp->callback = $tpl->callback;
            $params->templates[] = $tmp;
        }
        $aModules = array();
        foreach ($this->Exercise_model->get_modules($modules) as $tpl) {
            $tmp = new stdClass();
            $tmp->id = $tpl->id;
            $tmp->file = $tpl->filename;
            $aModules[] = $tmp;
        }
        
//        echo "<pre>";
//        print_r($params);
//        echo "</pre>";
//        die;
        
        $config = new stdClass();
        $config->answer_function = $this->input->post("answer_function");
        $config->answer_selectors = $this->input->post("answer_selectors");
        $config->config_classes = $this->input->post("config_classes");
        
        $filename = "c".$this->input->post("number_range")."-".$title;
        
        $cache = $this->db->get_where("exercise", array("id" => $exerciseFK))->row()->cache;
        
        $data = array();
        $data["title"] = $title;
        $data["params"] = json_encode($params);
        $data["callback"] = trim($this->input->post("callback"));
        $data["fn_set"] = $this->input->post("fn_set");
        $data["fn_revert"] = $this->input->post("fn_revert");
        $data["fn_solve"] = $this->input->post("fn_solve");
        $data["fn_markcorrect"] = $this->input->post("fn_markcorrect");
        $data["fn_markwrong"] = $this->input->post("fn_markwrong");
        $data["config"] = json_encode($config);
        $data["js_filename"] = $filename;
        $data["modules"] = json_encode($aModules);
        $data["js_min"] = md5( $data["modules"] );
        
//        echo "<pre>";
//        print_r($data);
//        echo "</pre>";
//        die;
        
        $this->db->where("id", $exerciseFK);
        $this->db->update("exercise", $data);
        
        $ids = $this->Exercise_model->get_exercise_ids($exerciseFK);
        
        $new_cache = md5(json_encode($data));
        
        if ($new_cache != $cache || $this->input->post("force_cache_recalc") == "yes" ) {
            $data = array();
            $data["answer_function"] =  $config->answer_function;
            $data["answer_selectors"] =  $config->answer_selectors;
            $data["exe_id_hash"] =  $filename;
            $data["config_classes"] =  $config->config_classes;
            $data["fn_set"] =  $this->input->post("fn_set");
            $data["fn_revert"] =  $this->input->post("fn_revert");
            $data["fn_solve"] =  $this->input->post("fn_solve");
            $data["fn_markcorrect"] =  $this->input->post("fn_markcorrect");
            $data["fn_markwrong"] =  $this->input->post("fn_markwrong");
            file_put_contents( $this->project_path . "/assets/js/cache/".$filename.".js", $this->load->view("exercise_js_template", $data, true));
            $this->db->where("id", $exerciseFK);
            $this->db->update("exercise", array("cache"=>$new_cache));
        }
        
        
        redirect("exercises/index/".$ids->blockFK."/".$ids->momentFK."/".$ids->exerciseFK."/".$scroll_amount);
    }

}
//operation: "subtraction",
//"operationMix": [
//        "addition",
//        "substraction"
//    ],
//Array
//(
//    [operation] => Array
//        (
//            [0] => addition
//            [1] => subtraction
//        )
//
//    [params] => Array
//        (
//            [0] => bExcludeZero
//            [1] => bShowDragArea
//            [2] => bShowNumbrDots
//        )
//
//    [num_pairs] => 3
//    [templates] => Array
//        (
//            [0] => 2
//            [1] => 1
//            [2] => 3
//            [3] => 4
//            [4] => 5
//            [5] => 6
//            [6] => 7
//            [7] => 8
//            [8] => 9
//            [9] => 10
//            [10] => 11
//            [11] => 12
//            [12] => 13
//            [13] => 14
//            [14] => 15
//            [15] => 16
//            [16] => 17
//        )
//
//)
?>