<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Exercise_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    
    public function check_object_existance($object, $objectFK) {
        return $this->db->query("SELECT id FROM `".$object."` WHERE id = ?", array($objectFK))->num_rows() > 0;
    }
    
    function get_blank_option() {
        return $this->load->view("select_option", array("value" => "", "text" => "---"), true);
    }
    
    public function get_blocks() {
        $this->db->where("del", "no");
        $this->db->select("id, name");
        $this->db->order_by("sort_order", "asc");
        $query = $this->db->get('block');
        return $query->result();
    }

    public function get_blocks_array() {
        $blocks = $this->get_blocks();

        $ret = array(0 => "---");
        foreach ($blocks as $b) {
            $ret[ $b->id ] = $b->name;
        }
        return $ret;
    }
    
    public function get_moments($blockFK=false) {
        $this->db->where("del", "no");
        if ($blockFK !== false) {
            $this->db->where("blockFK", $blockFK);
        }
        $this->db->select("id, description");
        $this->db->order_by("sort_order", "asc");
        $query = $this->db->get('moment');
        return $query->result();
    }

    public function get_moments_array($blockFK=false) {
        $moments = $this->get_moments($blockFK);
        
        $ret = array(0 => "---");
        if (preg_match('/^\d+$/', $blockFK)) {
            foreach ($moments as $b) {
                $ret[ $b->id ] = $b->description;
            }
        }
        return $ret;
    }
    
    public function get_exercises($momentFK=false) {
        $this->db->where("del", "no");
        if ($momentFK !== false) {
            $this->db->where("momentFK", $momentFK);
        }
        $this->db->select("id, title");
        $this->db->order_by("sort_order", "asc");
        $query = $this->db->get('exercise');
        return $query->result();
    }

    public function get_exercises_array($momentFK=false) {
        $exercises = $this->get_exercises($momentFK);
        
        $ret = array(0 => "---");
        if (preg_match('/^\d+$/', $momentFK)) {
            foreach ($exercises as $b) {
                $ret[ $b->id ] = $b->title;
            }
        }
        return $ret;
    }
    
    public function get_exercise_data($exerciseFK) {
        
        $qry = "SELECT E.*, M.description AS moment_description, M.id AS momentFK, M.number_range, 
                    B.id AS blockFK, B.name AS block_name, B.description AS block_description 
                FROM exercise E 
                INNER JOIN moment M ON M.id = E.momentFK 
                INNER JOIN block B ON B.id = M.blockFK
                WHERE E.id = ?";
        $res = $this->db->query($qry, array($exerciseFK));
        if ($res->num_rows() == 0) {
            return false;
        }
        $oExe = $res->row();
        
//        {"operationMix":["addition","subtraction"],"min":"0","max":"10","bExcludeZero":true,
//        "templates":[{"id":"button","file":"click_button","callback":"_helper.answer_button_handler();"},{"id":"equation","file":"equation_container","callback":null},{"id":"imageholder","file":"imageholder","callback":null},{"id":"layout","file":"main_exercise_layout","callback":null},{"id":"numberimage","file":"numberimage","callback":null},{"id":"progressindicator","file":"progress_indicator","callback":null},{"id":"instruction","file":"text_instruction","callback":null}]}
        if ($oExe->params!= "") {
            $oExe->params = json_decode( $oExe->params );
        }
        else {
            $oExe->params = new stdClass();
        }
        if (!isset($oExe->params->templates)) {
            $oExe->params->templates = array();
        }
        $oExe->params = json_encode($oExe->params);
//        echo "<pre>";
//        print_r($oExe);
//        die;
        
        return $oExe;
    }
    
    public function get_exercise_ids($exerciseFK) {
        
        $qry = "SELECT E.id AS exerciseFK, M.id AS momentFK, B.id AS blockFK
                FROM exercise E 
                INNER JOIN moment M ON M.id = E.momentFK 
                INNER JOIN block B ON B.id = M.blockFK
                WHERE E.id = ?";
        $res = $this->db->query($qry, array($exerciseFK));
        
        return $res->row();
    }
    
    public function exercise_has_template($templates=false, $id, $file) {
//        echo "<pre>";
//        print_r($templates);
//        die;
        if ($templates!==false && is_array($templates)) {
            foreach ($templates as $tpl) {
                if ($tpl->id == $id && $tpl->file == $file) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public function get_templates($templateFKs=false) {
        $this->db->where("del", "no");
        if ($templateFKs !== false) {
            $this->db->where_in("id", $templateFKs);
        }
        $this->db->select("id, filename, reference, callback");
        $this->db->order_by("filename", "asc");
        $query = $this->db->get('template');
        return $query->result();
    }
    
    public function exercise_has_module($modules=false, $id, $file) {
        if ($modules!==false && is_array($modules)) {
            foreach ($modules as $tpl) {
                if ($tpl->id == $id && $tpl->file == $file) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public function get_modules($moduleFKs=false) {
        $this->db->where("del", "no");
        if ($moduleFKs !== false) {
            $this->db->where_in("id", $moduleFKs);
        }
        $this->db->select("id, name, description, filename");
        $this->db->order_by("name", "asc");
        $query = $this->db->get('module');
        return $query->result();
    }
}
