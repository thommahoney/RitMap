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
  * This is a button that contains other buttons that will displayed when this
  * button is clicked. Buttons will "spin" out from this element.
  * @param text String Text to display.
  * @param image String Url to to the button image.
  */
function SpinnerButton(text,image) {
	this.element = document.createElement("div");
	this.buttons = new Array();
	this.extended = false;
	this.locked = false;
	var t = this;
	this.masterButton = new Button(text,image);
	this.masterButton.addEventListener("touchend",function() {
		if(!t.extended)
			t.extend();
		else
			t.collapse();
	});
	
	this.element.appendChild(this.masterButton.element);
}
/**
 * This method will add a simple button to this spinner button.
 * @param button Button Button to add.
 */
SpinnerButton.prototype.addButton = function(button) {
	var btn = button;
	this.buttons[this.buttons.length] = btn;
	btn.element.style.visibility = "hidden";
	btn.element.style.position = "absolute";
	btn.element.style.left = "0";
	btn.element.style.top = "0";
	btn.element.style.opacity = 0;
	btn.element.style.webkitTransitionProperty = "-webkit-transform, opacity";
	var t = this;
	btn.addEventListener("touchend",function() {
		t.collapse();
	},false);
	document.body.appendChild(btn.element);
}
/**
 * This method causes the spinner button to extend it's child buttons.
 */
SpinnerButton.prototype.extend = function() {
	var top = this.element.parentNode.offsetTop;
	var left = this.element.parentNode.offsetLeft;
	var h = this.element.parentNode.offsetHeight;
	for(var x=0;x<this.buttons.length;x++) {
		var btn = this.buttons[x].element;
		btn.style.visibility = "visible";
		btn.style.left = left+"px";
		btn.style.top = top+"px";
		btn.style.height = h+'px';
		
		btn.style.webkitTransitionDuration = "1s";
		btn.style.webkitTransform = "translate(0px,"+(-(h*(x+1)))+"px)";
		btn.style.opacity = 1;		
	}
	this.extended = true;
}
/**
 * This method causes the spinner button to retract it's child buttons.
 */
SpinnerButton.prototype.collapse = function() {
	var t = this;
	if(this.locked)
		return; //We're already animating.
	this.locked = true;
	setTimeout(function() {
		for(var x=0;x<t.buttons.length;x++) {
			t.buttons[x].element.style.visibility = "hidden";
		}
		t.locked = false;
	},1000);
	for(var x=0;x<this.buttons.length;x++) {
		var btn = this.buttons[x].element;		
		btn.style.webkitTransitionDuration = "1s";
		btn.style.webkitTransform = "translate(0px,0px)";
		btn.style.opacity = 0;
	}
	this.extended = false;
}
