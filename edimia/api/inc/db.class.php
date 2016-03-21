<?php

//require("log.class.php");

class DB {
# @object, The PDO object

    private $pdo;

# @object, PDO statement object
    private $sQuery;

# @array, The database settings
    private $settings;

# @bool , Connected to the database
    private $bConnected = false;

# @object, Object for logging exceptions
    private $log;

# @array, The parameters of the SQL query
    private $parameters;
    
    private $bLog = false;

    /**
     * Default Constructor
     *
     * 1. Instantiate Log class.
     * 2. Connect to database.
     * 3. Creates the parameter array.
     */
    public function __construct() {
//        $this->log = new Log();
        $this->Connect();
        $this->parameters = array();
    }

    /**
     * This method makes connection to the database.
     *
     * 1. Reads the database settings from a ini file.
     * 2. Puts the ini content into the settings array.
     * 3. Tries to connect to the database.
     * 4. If connection failed, exception is displayed and a log file gets created.
     */
    private function Connect() {
        $this->settings = parse_ini_file( dirname(__FILE__) . "/settings.ini.php");
        $dsn = 'mysql:dbname=' . $this->settings["dbname"] . ';host=' . $this->settings["host"] . '';
        try {
# Read settings from INI file
            $this->pdo = new PDO($dsn, $this->settings["user"], $this->settings["password"]);

# We can now log any exceptions on Fatal error.
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

# Disable emulation of prepared statements, use REAL prepared statements instead.
            $this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

# Connection succeeded, set the boolean to true.
            $this->bConnected = true;
            
            $this->query("SET NAMES 'utf8'");
            
        } catch (PDOException $e) {
# Write into log
            echo $this->ExceptionLog($e, null);
            die();
        }
    }

    /**
     * Every method which needs to execute a SQL query uses this method.
     *
     * 1. If not connected, connect to the database.
     * 2. Prepare Query.
     * 3. Parameterize Query.
     * 4. Execute Query.
     * 5. On exception : Write Exception into the log + SQL query.
     * 6. Reset the Parameters.
     */
    private function Init($query, $parameters = "") {
# Connect to database
        if (!$this->bConnected) {
            $this->Connect();
        }
        try {
# Prepare query;
            $this->sQuery = $this->pdo->prepare($query);

# Add parameters to the parameter array
            $this->bindMore($parameters);

# Bind parameters
            if (!empty($this->parameters)) {
                foreach ($this->parameters as $param) {
                    $parameters = explode("\x7F", $param);
                    
                    // allow for positional parameters
                    if (filter_var(str_replace(":", "", $parameters[0]), FILTER_VALIDATE_INT) !== false) {
                        $parameters[0] = intval(str_replace(":", "", $parameters[0])) + 1;
                    }
                    
                    $this->sQuery->bindParam($parameters[0], $parameters[1]);
                }
            }

# Execute SQL
            $this->succes = $this->sQuery->execute();
        } catch (PDOException $e) {
# Write into log and display Exception
            
//            echo "<prE>";
//            print_r($e);
//            die;
            
            echo $this->ExceptionLog($e, is_object($this->sQuery) ? $this->sQuery->queryString: null);
            die();
        }

# Reset the parameters
        $this->parameters = array();
    }

    /**
     * @void
     *
     * Add the parameter to the parameter array
     * @param string $para
     * @param string $value
     */
    public function bind($para, $value) {
        $this->parameters[sizeof($this->parameters)] = ":" . $para . "\x7F" . $value;
    }

    /**
     * @void
     *
     * Add more parameters to the parameter array
     * @param array $parray
     */
    public function bindMore($parray) {
        if (empty($this->parameters) && is_array($parray)) {
            $columns = array_keys($parray);
            foreach ($columns as $i => &$column) {
                $this->bind($column, $parray[$column]);
            }
        }
    }

    /**
     * If the SQL query contains a SELECT statement it returns an array containing all of the result set row
     * If the SQL statement is a DELETE, INSERT, or UPDATE statement it returns the number of affected rows
     *
     * @param string $query
     * @param array $params
     * @param int $fetchmode
     * @return mixed
     */
    public function query($query, $params = null, $fetchmode = PDO::FETCH_OBJ) {
        $query = trim($query);

        $this->Init($query, $params);

        if (stripos($query, 'select') === 0) {
            return $this->sQuery->fetchAll($fetchmode);
        } elseif (stripos($query, 'insert') === 0) {
            return $this->pdo->lastInsertId();
        } elseif (stripos($query, 'update') === 0 || stripos($query, 'delete') === 0) {
            return $this->sQuery->rowCount();
        } else {
            return NULL;
        }
    }

    public function num_rows() {
        return $this->sQuery->rowCount();
    }
    
    /**
     * Returns an array which represents a column from the result set
     *
     * @param string $query
     * @param array $params
     * @return array
     */
    public function column($query, $params = null) {
        $this->Init($query, $params);
        $Columns = $this->sQuery->fetchAll(PDO::FETCH_NUM);

        $column = null;

        foreach ($Columns as $cells) {
            $column[] = $cells[0];
        }

        return $column;
    }

    /**
     * Returns an array which represents a row from the result set
     *
     * @param string $query
     * @param array $params
     * @param int $fetchmode
     * @return array
     */
    public function row($query, $params = null, $fetchmode = PDO::FETCH_ASSOC) {
        $this->Init($query, $params);
        return $this->sQuery->fetch($fetchmode);
    }

    /**
     * Returns the value of one single field/column
     *
     * @param string $query
     * @param array $params
     * @return string
     */
    public function single($query, $params = null) {
        $this->Init($query, $params);
        return $this->sQuery->fetchColumn();
    }

    /**
     * Writes the log and returns the exception
     *
     * @param exception $e
     * @param string $sql
     * @return string
     */
    private function ExceptionLog($e, $sql = "") {
        
        if (!$this->bLog) {
            return;
        }
        
        $ret = '';
        
        $trace = $e->getTrace();
        $trace = array_pop($trace);
        
        $ret .= "<div style='font-family: verdana; border: 1px solid #CCCCCC; margin: 25px;'>";
        $ret .= "<h3 style='border-bottom: 1px solid #CCCCCC; padding: 0px 0px 15px 15px; '>A Database Error Occurred</h3>";
        $ret .= '<div style="line-height: 45px; padding: 0px 0px 15px 15px;">';
            $ret .= "<b>Error number:</b> ".$e->errorInfo[1]."<br>";
            $ret .= $e->errorInfo[2]."<br>";
            $ret .= $e->getMessage()."<br>";

            if (!empty($sql)) {
                $ret .= $sql."<br>";
            }
            $ret .= "<b>Filename:</b> ".$trace['file']."<br>";
            $ret .= "<b>Line Number:</b> ".$trace['line']."<br>";
            $ret .= "</div>";
        $ret .= "</div>";
        
        
        $message = $e->getMessage();
        if (!empty($sql)) {
            $message .= "\r\nRaw SQL : " . $sql;
        }
        $message .= "\r\nFile : " . $trace['file'] . " : " . $trace['line'];
        $this->log->write($message);

        return $ret;
    }

}

/*
// Creates the instance
$db = new Db();

// 3 ways to bind parameters :                
// 1. Read friendly method        
$db->bind("firstname", "John");
$db->bind("age", "19");

// 2. Bind more parameters
$db->bindMore(array("firstname" => "John", "age" => "19"));

// 3. Or just give the parameters to the method
$db->query("SELECT * FROM Persons WHERE firstname = :firstname AND age = :age", array("firstname" => "John", "age" => "19"));

// Fetching data
$person = $db->query("SELECT * FROM Persons");

// If you want another fetchmode just give it as parameter
$persons_num = $db->query("SELECT * FROM Persons", null, PDO::FETCH_NUM);

// Fetching single value
$firstname = $db->single("SELECT firstname FROM Persons WHERE Id = :id ", array('id' => '3'));

// Single Row
$id_age = $db->row("SELECT Id, Age FROM Persons WHERE firstname = :f", array("f" => "Zoe"));

// Single Row with numeric index
$id_age_num = $db->row("SELECT Id, Age FROM Persons WHERE firstname = :f", array("f" => "Zoe"), PDO::FETCH_NUM);

// Column, numeric index
$ages = $db->column("SELECT age FROM Persons");

// The following statemens will return the affected rows
// Update statement
$update = $db->query("UPDATE Persons SET firstname = :f WHERE Id = :id", array("f" => "Johny", "id" => "1"));

// Insert statement
//        $insert                 = $db->query("INSERT INTO Persons(Firstname,Age)         VALUES(:f,:age)",array("f"=>"Vivek","age"=>"20"));
// Delete statement
//        $delete                 = $db->query("DELETE FROM Persons WHERE Id = :id",array("id"=>"6")); 
 
 */

/** 
 * PDOException
 * PDOException Object
(
    [message:protected] => SQLSTATE[42S02]: Base table or view not found: 1146 Table 'PhoPlay.u1ser' doesn't exist
    [string:Exception:private] => 
    [code:protected] => 42S02
    [file:protected] => /var/www/phoplay.voksnet.com/api/db.class.php
    [line:protected] => 93
    [trace:Exception:private] => Array
        (
            [0] => Array
                (
                    [file] => /var/www/phoplay.voksnet.com/api/db.class.php
                    [line] => 93
                    [function] => prepare
                    [class] => PDO
                    [type] => ->
                    [args] => Array
                        (
                            [0] => SELECT * FROM u1ser WHERE id = :id
                        )

                )

            [1] => Array
                (
                    [file] => /var/www/phoplay.voksnet.com/api/db.class.php
                    [line] => 161
                    [function] => Init
                    [class] => DB
                    [type] => ->
                    [args] => Array
                        (
                            [0] => SELECT * FROM u1ser WHERE id = :id
                            [1] => Array
                                (
                                    [id] => 2
                                )

                        )

                )

            [2] => Array
                (
                    [file] => /var/www/phoplay.voksnet.com/api/user.php
                    [line] => 7
                    [function] => query
                    [class] => DB
                    [type] => ->
                    [args] => Array
                        (
                            [0] => SELECT * FROM u1ser WHERE id = :id
                            [1] => Array
                                (
                                    [id] => 2
                                )

                        )

                )

        )

    [previous:Exception:private] => 
    [errorInfo] => Array
        (
            [0] => 42S02
            [1] => 1146
            [2] => Table 'PhoPlay.u1ser' doesn't exist
        )

)

 */
?>