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
 * This class is simply a reciever for a native element to "inject" wireless
 * network information into the application in a common format.
 */
function Wifi() {
	//A list of all seen access points.
	this.accessPoints = new Array();
	//Callback function to call when we recieve a complete list.
	this.callback = function() {};
}
/**
 * This function wipes the access point list and prepares to recieve new information.
 */
Wifi.prototype.startList = function() {
	this.accessPoints = new Array();
}
/**
 * This function completes the list and ships it off to any current listeners.
 */
Wifi.prototype.endList = function() {
	this.callback(this.accessPoints);
}
/**
 * This function creates a new AccessPoint object with all of the proper
 * parameters and prepares it to be sent to a callback.
 * @param mac String MAC address of an access point in colan format (00:00:00:00:00:00)
 * @param str Integer An integer representing the relative signal strength of the access point.
 * @param ssid String The advertised SSID of the access point.
 * @param channel Integer The channel the access point is advertising on.
 */
Wifi.prototype.addAccessPoint = function(mac,str,ssid,channel) {
	var ap = new AccessPoint();
	ap.mac = mac;
	ap.strength = str;
	ap.ssid = ssid;
	ap.channel = channel;
	this.accessPoints[this.accessPoints.length] = ap;
}
/**
 * This function sets a callback function to be called when a complete gather
 * is completed.
 */
Wifi.prototype.registerCallback = function(callback) {
	this.callback = callback;
}

/**
 * This is a simple struct-type class that represents a single wireless access
 * point.
 */
function AccessPoint() {
	this.mac 		= "";
	this.strength 	= "";
	this.ssid		= "";
	this.channel	= "";
}
