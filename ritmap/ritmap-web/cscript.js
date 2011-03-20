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
 * This file is here to allow for script compression. You could compress the following
 * scripts to generate one significantly smaller script with much less network
 * lag.
 */
function init() {
	var count = 14;
	var dec = function() {
		count--;
		if(count<=0) {
			init();
			scriptloader = null;
		}
	}
	scriptloader("Button.js",dec);
	scriptloader("ChoiceBar.js",dec);
	scriptloader("Circle.js",dec);
	scriptloader("database.js",dec);
	scriptloader("iPhoneMap.js",dec);
	scriptloader("LocationNode.js",dec);
	scriptloader("Point.js",dec);
	scriptloader("SpinnerButton.js",dec);
	scriptloader("wifi.js",dec);
	scriptloader("WifiLocation.js",dec);
	scriptloader("FriendMenu.js",dec);
	scriptloader("WifiSamples.js",dec); //Take this out later
	scriptloader("FauxNative.js",dec); //This too.
	scriptloader("init.js",dec);
}


function scriptloader(file,callback) {
	var s = document.createElement("script");
	s.setAttribute("type","application/javascript");
	if(callback) {
		s.onload = callback;
	}
	s.src = file;
	document.body.appendChild(s);
}




