<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Dashboard extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->vars(array(
           "navigation" => $this->load->view('navigation', '', true)
        ));
    }
    public function index() {
        $this->load->view('html', array("content" => "kur"));
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */