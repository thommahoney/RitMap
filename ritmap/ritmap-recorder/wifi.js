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

//This is identical to wifi.js in the main project.
function Wifi() {
	this.accessPoints = new Array();
	this.callback = function() {};
}
Wifi.prototype.startList = function() {
	this.accessPoints = new Array();
}
Wifi.prototype.endList = function() {
	this.callback(this.accessPoints);
}
Wifi.prototype.addAccessPoint = function(mac,str,ssid,channel) {
	var ap = new AccessPoint();
	ap.mac = mac;
	ap.strength = str;
	ap.ssid = ssid;
	ap.channel = channel;
	this.accessPoints[this.accessPoints.length] = ap;
}
Wifi.prototype.registerCallback = function(callback) {
	this.callback = callback;
}
function AccessPoint() {
	this.mac 		= "";
	this.strength 	= "";
	this.ssid		= "";
	this.channel	= "";
}
