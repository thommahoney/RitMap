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
 * This class immitates the native application to test the application in a
 * pure-Safari window. Obviously will not return real data, but will give you
 * a good idea if things are working or not.
 * This should also give a good example of how to write your own native portion
 * to interface with this code.
 */
function FauxNative() {
	//If this is set to true it will cause location updates to occur every 10 seconds or so.
	this.go = false;
	
	var t = this;
	this.func = function() {
		if(t.go) {
			t.runSample();
			setTimeout(t.func,10*1000);
		}
	}
}
/**
 * This function will run a sample gather.
 */
FauxNative.prototype.runSample = function() {
	var idx =  Math.floor(Math.random()*samples.length);
	var rsample = samples[idx];
	wifi.startList();
	for(var x=0;x<rsample.length;x++) {
		var s = rsample[x];
		wifi.addAccessPoint(s.mac,s.strength,s.ssid,s.channel);
	}
	wifi.endList();
}
/**
 * Starts the test going. 
 */
FauxNative.prototype.goTest = function() {
	this.go = true;
	this.func();	
}
/**
 * Stops testing.
 */
FauxNative.prototype.stopTest = function() {
	this.go = false;
}
