<?PHP //sleep(5); ?>
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
 
//This file was a "access point recorder" that wrote to an XML file so I could
//store all of the access points for collection.
?>
<html>
<head>
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<script type="text/javascript" src="wifi.js"></script>
	<script type="text/javascript">
		var neededDataPoints = 5;
		var currentGather = 0;
		var ncount = 0;
		var ajaxStr = "";
		var gathering = false;
		function init() {
			wifi = new Wifi();
			wifi.registerCallback(function(apList) {
				var e = document.getElementById("accesspoints");
				e.innerHTML = "";
				
				if(apList.length == 0) {
					var l = document.createElement("li");
					var sside = document.createElement("div");
					sside.className = "ssid";
					sside.innerHTML = "No networks found.";
					l.appendChild(sside);
					e.appendChild(l);
				}
				
				for(var x=0;x<apList.length;x++) {
					var ap = apList[x];
					
					var l = document.createElement("li");
					var sside = document.createElement("div");
					sside.className = "ssid";
					var stre = document.createElement("div");
					stre.className = "str";
					var mace = document.createElement("div");
					mace.className = "mac";
					var channele = document.createElement("div");
					channele.className = "channel";
					
					sside.innerHTML = ap.ssid;
					stre.innerHTML = ap.strength;
					mace.innerHTML = ap.mac;
					channele.innerHTML = ap.channel;
					
					l.appendChild(sside);
					l.appendChild(stre);
					l.appendChild(mace);
					l.appendChild(channele);
					e.appendChild(l);
					
					if(gathering) {
						ajaxStr += "&ap"+ncount+"=";
						ajaxStr += ap.mac+",";
						ajaxStr += ap.ssid+",";
						ajaxStr += ap.strength+",";
						ajaxStr += ap.channel+",";
						ajaxStr += currentGather;
						ncount++;
					}
				}
				if(gathering) 
					gatherTick();
			});
		}
		function startGather() {
			ajaxStr = "?desc="+document.getElementById("desc").value;
			ncount = 0;
			currentGather = 0;
			gathering = true;
			document.getElementById("gatherstatus").style.display = "block";
			document.getElementById("status").style.display = "block";
			document.getElementById("gatherstatus").innerHTML = "Gathering now.<br />Reading <span id=\"tickid\">0</span> of 5 taken.";
			document.getElementById("start").disabled = true;
			document.getElementById("start").value = "Please wait...";
		}
		function gatherTick() {
			currentGather++;
			document.getElementById("tickid").innerHTML = currentGather;
			if(currentGather == neededDataPoints) {
				sendData();
				gathering = false;
				document.getElementById("tickid").innerHTML = "0";
			}
		}
		function sendData() {
			var request = "recordap.php"+ajaxStr+"&count="+ncount;
			ajaxWithCallback(request,function(e) {
				document.getElementById("gatherstatus").innerHTML = "Success! XML Updated.";
				document.getElementById("start").value = "Start Gather";
				document.getElementById("start").disabled = false;
			});
			document.getElementById("gatherstatus").innerHTML = "Attempting to upload data now...";
		}
		function ajaxWithCallback(url,callback) {
			var xml = new XMLHttpRequest();
			xml.onreadystatechange = function() {
				if(xml.readyState==4) {
					callback(xml);
				}
			}
			xml.open("GET",url,true);
			xml.send(null);
		}
	</script>
	<style type="text/css">
		input {
			width: 80%;
			margin-left: 10%;;
			height: 30px;
			margin-bottom: 5px;
		}
		ul {
			margin: 0;
			padding: 0;
			width: 80%;
			margin: auto;
			border: 2px solid #808080;
			-webkit-border-radius: 8px;
			background-color: #202020;
		}
		li {
			list-style-type: none;
			display: block;
			margin: 0;
			padding: 0;
			border-bottom: 1px solid #808080;
			padding: .25em;
			height: 3em;
		}
		li:last-child {
			border-bottom: none;
		}
		.ssid {
			float: left;
			font-size: 1.5em;
			font-weight: bold;
		}
		.mac {
			float: left;
			clear: left;
		}
		.str {
			float: right;
			font-size: 1.5em;
			color: #606060;
		}
		.channel {
			float: right;
			color: #606060;
		}
		html, body {
			background-color: black;
			color: white;
			margin: 0;
			padding: 0;
			font-family: sans-serif;
		}
		h1 {
			width: 100%;
			margin: 0;
			padding: 0;
			margin-top: 20px;
			height: 40px;
			background-image: url(topgloss.png);
			font-size: 25px;
			text-align: center;
			vertical-align: middle;
			line-height: 40px;
			text-shadow: 2px 2px 2px #888;
			-webkit-text-stroke: 1px black;
		}
		.header {
			margin-top: 10px;
			margin-left: 1em;
			font-weight: bold;
			text-shadow: 2px 2px 2px #888;
		}
		#gatherstatus {
			width: 80%;
			margin: auto;
			background-color: #202020;
			border: 2px solid #808080;
			-webkit-border-radius: 8px;
			padding: .5em;
		}
	</style>
</head>
<body onload="init()">
	<h1>Access Point Recorder</h1>
	<div class="header">
		<div>Gather Description:</div>
		<input type="text" id="desc" />
		<input type="button" id="start" onclick="startGather()" value="Start Gather" />
	</div>
	<div id="status" class="header" style="display: none">Status:</div>
	<div id="gatherstatus" style="display: none">
			Gathering now.<br />Reading <span id="tickid">0</span> of 5 taken.
	</div>
	<br />
	<div class="header" style="margin-bottom: .5em;">Visible Access Points:</div>
	<ul id="accesspoints" class="accesspoints">
		<li><div class="ssid">No Networks Found.</div></li>
	</ul>
	<div id="debug"></div>
</body>
</html>
