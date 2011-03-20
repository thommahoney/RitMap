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
 * This script is a dirt simple database-connectivity layer for the JavaScript application
 * we wanted to do something nicer but ran out of time.
 */
 
if(!isset($_GET['cmd']))
	die("");

require_once("MySQL.php");
$mysql = new MySQL("<username>","<password>","<database>");
$mysql->prepare("updatelocation","UPDATE users SET location=?, floor=?, lastseen=? WHERE session_id=?");
$mysql->prepare("gethandle","SELECT handle FROM users WHERE session_id=?");
$mysql->prepare("addfriend","INSERT INTO friends (`key`,handle,friend_handle) VALUES (?,?,?)");
$mysql->prepare("removefriend","DELETE FROM friends WHERE handle=? AND friend_handle=?");
$mysql->prepare("getfriends","SELECT handle, location, floor, lastseen FROM users WHERE handle IN (SELECT friend_handle FROM friends WHERE handle=(SELECT handle FROM users WHERE session_id=?)) AND lastseen > ?");
$mysql->prepare("adduser","INSERT INTO users (handle,`password`,session_id) VALUES (?,SHA1(?),?)");
$mysql->prepare("login","SELECT handle FROM users WHERE handle=? AND `password`=SHA1(?)");
$mysql->prepare("updatesession","UPDATE users SET session_id=? WHERE handle=?");

switch($_GET['cmd']) {
	case "updateLocation":
		checkNeeded(array("location","floor","session_id"));
		updateLocation($_GET['location'],$_GET['floor'],$_GET['session_id']);
		break;
	case "addFriend":
		checkNeeded(array("handle","friend_handle"));
		addFriend($_GET['handle'],$_GET['friend_handle']);
		break;
	case "removeFriend":
		checkNeeded(array("handle","friend_handle"));
		removeFriend($_GET['handle'],$_GET['friend_handle']);
	case "getFriendsLocations":
		checkNeeded(array("session_id"));
		getFriends($_GET['session_id']);
		break;
	case "addUser":
		checkNeeded(array("handle","password"));
		addUser($_GET['handle'],$_GET['password']);
		break;
	case "login":
		checkNeeded(array("handle","password"));
		login($_GET['handle'],$_GET['password']);
		break;
}


function updateLocation($location,$floor,$session_id) {
	global $mysql;
	try {
		$lastSeen = date("Y-m-d H:i:s");
		$mysql->execute("updatelocation",array($location,$floor,$lastSeen,$session_id));
		echo(json_encode("true"));
	} catch(Exception $e) {
		echo(json_encode("error"));
	}
}
function addFriend($handle,$friend_handle) {
	global $mysql;
	try {
		if(trim($handle)=="" || trim($friend_handle)=="")
			throw new Exception();
			
		$mysql->execute("addfriend",array(getRandomString(10),$handle,$friend_handle));
		echo(json_encode("true"));
	} catch(Exception $e) {
		echo(json_encode("error"));
	}
}
function removeFriend($handle,$friend_handle) {
	global $mysql;
	try {
		$mysql->execute("removefriend",array($handle,$friend_handle));
		echo(json_encode("true"));
	} catch(Exception $e) {
		echo(json_encode("error"));
	}
}
function getFriends($session_id) {
	global $mysql;
	try {
		$t = date("Y-m-d H:i:s",strtotime("now - 5 minutes"));
		$mysql->execute("getfriends",array($session_id,$t));
		echo(json_encode($mysql->fetch_all("getfriends")));
	} catch(Exception $e) {
		echo(json_encode("error"));
	}
}
function addUser($handle,$password) {
	global $mysql;
	try {
		$session_id = getRandomString(10);
		$mysql->execute("adduser",array($handle,$password,$session_id));
		echo(json_encode($session_id));
	} catch(Exception $e) {
		echo(json_encode("error"));
	}
}
function login($handle,$password) {
	global $mysql;
	try {
		$session_id = getRandomString(10);
		$mysql->execute("login",array($handle,$password));
		if(count($mysql->fetch_all("login"))>0) {
			$mysql->execute("updatesession",array($session_id,$handle));
			echo(json_encode($session_id));
		} else {
			throw new Exception();
		}
	} catch(Exception $e) {
		echo(json_encode("error"));
	}
}

function checkNeeded($needed) {
	foreach($needed as $n) {
		if(!isset($_GET[$n]))
			die("Missing needed GET variable.");
	}
}
function getRandomString($length) {
	$chrs = array();
	for($x=48;$x<58;$x++)
		$chrs[] = chr($x);
	for($x=97;$x<123;$x++)
		$chrs[] = chr($x);
		
	$picks = array_rand($chrs,$length);
	$str = "";
	foreach($picks as $p) {
		$str .= $chrs[$p];
	}
	return $str;
}

?>
