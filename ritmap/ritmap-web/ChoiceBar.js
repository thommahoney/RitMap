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
 * This class is really just a wrapper for a couple CSS elements and a couple DOM
 * elements that allows buttons and spinners to be added.
 * To use this class effectively the following CSS attributes must be given sensible attributes:
 * choicebar - Style for the entire bar.
 */
function ChoiceBar() {
	this.element = document.createElement("div");
	this.element.className = "choicebar"
	this.element.style.position = "absolute";
	this.element.style.left = "0px";
	this.element.style.width = "100%";
	
	this.element.ontouchstart = function(e) { e.preventDefault() };
	this.element.ontouchmove = function(e) { e.preventDefault() };
	this.element.ontouchend = function(e) { e.preventDefault() };
	
	document.body.appendChild(this.element);
	
	this.adjust();
}
/**
 * This method "adjusts" the position of the Choice bar to be absolutely
 * positioned at the bottom of the screen because fixed positioning doesn't
 * work properly on Mobile Safari.
 */
ChoiceBar.prototype.adjust = function() {
	var top  = 480-50;
	var height = 50;
	this.element.style.top = top+"px";
	this.element.style.height = height+"px";
}
/**
 * This method will add our button object to the button bar.
 * @param btn Button Button to add the the bar.
 */
ChoiceBar.prototype.addButton = function (btn) {
	this.element.appendChild(btn.element);
}
/**
 * This method will add our spinner object to the button bar.
 * @param btn SpinnerButton Button to add to the bar.
 */
ChoiceBar.prototype.addSpinner = function(btn) {
	this.element.appendChild(btn.element);
}

