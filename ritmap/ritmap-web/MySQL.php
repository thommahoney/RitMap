<?PHP
/*
 *  wirelesslocation - An API providing simple off-line location services to
 *  applications using the relative signal strengths from known surrounding 802.11 stations.
 *  Copyright (C) 2009  Michael Powers (swedishborgie@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
/**
 * This class wraps up mysqli so that prepared statements are hellishly complicated and are similar in
 * format to their PostgreSQL cousins.
 */
class MySQL extends mysqli {
	private $userName;
	private $password;
	private $server;
	private $port;
	private $database;

	private $statements = array();

	function MySQL($userName, $password, $database, $server="localhost", $port=3306) {
		$this->userName = $userName;
		$this->password = $password;
		$this->server = $server;
		$this->port = $port;
		$this->database = $database;
		parent::init();
		$this->connect();
	}
	function connect() {
		$connected = parent::real_connect($this->server, $this->userName, $this->password, $this->database, $this->port);
		if(!$connected)
			throw new CannotConnectToDatabaseException($str['mysql_error']);
	}
	function prepare($stmtname,$query) {
		if(!isset($this->statements[$stmtname])) {
			$stmt = parent::prepare($query);
			if($stmt==false)
				throw new CannotCreateStatementException($this->error);
			$this->statements[$stmtname] = $stmt;
		} else {
			$stmt = $this->statements[$stmtname];
		}

		return $stmt;
	}
	function execute($stmtname,$params=array()) {
		if(!isset($this->statements[$stmtname]))
			throw new StatementDoesNotExistException("Statement $stmtname hasn't been prepared.");
		$stmt = $this->statements[$stmtname];

		if(count($params)!=$stmt->param_count)
			throw new ParameterCountDoesNotMatchException();

		$paramFormat = "";
		for($x=0;$x<count($params);$x++)
		{
			if(is_int($params[$x]))
				$paramFormat .= "i";
			else if(is_double($params[$x]))
				$paramFormat .= "d";
			else if(is_null($params[$x]))
				$paramFormat .= "i";
			else if(is_string($params[$x]))
				$paramFormat .= "s";
		}
		
		
		call_user_func_array("mysqli_stmt_bind_param", array_merge(array($stmt,$paramFormat),$params));

		$result = $stmt->execute();
		if($result !== false) {
			$stmt->store_result();
			return $result;
		} else {
			throw new CannotExecuteQueryException($this->error);			
		}
	}
	function fetch_assoc($stmtname) {
		$assocArray = array();
		$proxyArray = array();

		$stmt = $this->getStatementByName($stmtname);

		if($stmt === false)
			throw new StatementIsNullException();

		$metadata = $stmt->result_metadata();

		$ctmp = $metadata->fetch_fields();
		$columns = array();

		foreach($ctmp as $column)
			$columns[] = $column->name;

		$proxyArray[0] = $stmt;
		for($x=1;$x<=count($columns);$x++) {
			$proxyArray[$x] = &$assocArray[$columns[$x-1]];
		}

		if(count($columns)>0)
			call_user_func_array('mysqli_stmt_bind_result',$proxyArray);

		if($stmt->fetch())
			return $assocArray;
		else
			return false;
	}
	function fetch_all($stmtname) {
		$arr = array();
		while(($line = $this->fetch_assoc($stmtname))!==false) {
			$arr[] = $line;
		}
		return $arr;
	}
	function getStatementByName($stmtname) {
		if(isset($this->statements[$stmtname]))
			return $this->statements[$stmtname];
		else
			return false;
	}
}

class CannotConnectToDatabaseException extends Exception {}
class CannotCreateStatementException extends Exception {}
class StatementDoesNotExistException extends Exception {}
class ParameterCountDoesNotMatchException extends Exception {}
class CannotExecuteQueryException extends Exception {}
class StatementIsNullException extends Exception {}
?>
