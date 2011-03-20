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
 
//This file stores an access point in the data xml file.
//Make sure it's 775 or 777 depending on how your server is set up!

$dom = new DomDocument();
$dom->load("data.xml");

$gather = $dom->getElementsByTagName("gather");
$max = 0;
foreach($gather as $g) {
	$num = $g->getAttribute("id");
	if($num>$max)
		$max = $num;
}

$gather = $dom->createElement("gather");
$gather->setAttribute("id",$max+1);
$gather->setAttribute("description",$_GET['desc']);
$cSeq = -1;
$sampleNode = false;

$count = $_GET['count'];
for($x=0;$x<$count;$x++) {
	$ap = $_GET["ap$x"];
	$ap = explode(",",$ap);
	$mac = $ap[0];
	$ssid = $ap[1];
	$str = $ap[2];
	$channel = $ap[3];
	$seq = $ap[4];
	
	if($seq != $cSeq) {
		if($sampleNode!==false)
			$gather->appendChild($sampleNode);
		$sampleNode = $dom->createElement("sample");
		$cSeq = $seq;
	}
	
	$apNode = $dom->createElement("accesspoint");
	$apNode->setAttribute("mac",$mac);
	$apNode->setAttribute("strength",$str);
	$apNode->setAttribute("ssid",$ssid);
	$apNode->setAttribute("channel",$channel);

	$sampleNode->appendChild($apNode);
	
}
$gather->appendChild($sampleNode);
$root = $dom->getElementsByTagName("data")->item(0);
$root->appendChild($gather);
$dom->save("data.xml");

?>
