/*
 *  wirelesslocation - An API providing simple off-line location services to
 *  applications using the relative signal strengths from known surrounding 802.11 stations.
 *  Copyright (C) 2009  Michael Powers
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 */
 
 /**
  * This class is a UI widget representing a graphical button with an image and
  * label. These fit well on the ChoiceBar.
  * For these to display properly you'll need to add the following classes to your
  * CSS definition with sensible attributes:
  * *choicebar_buttonlabel - Style for the label section.
  * *choicebar_button - Style for the entire button.
  * *choicebar_buttonselected - Style for a clicked button
  *
  * Remember this class is optimized for mobile safari, it likely won't work
  * in other browsers due to the face it only reacts to touch events at the moment.
  *
  * @param label String Label to display below the button.
  * @param imageUrl String Url to the image you want to display on the button.
  * @param halign Sets the float CSS property on the button as a whole. Use it to position buttons.
  */
function Button(label,imageUrl,halign) {
	this.element = document.createElement("div");
	this.img  = new Image();
	this.label = document.createElement("div");
	this.label.className = "choicebar_buttonlabel";
	this.label.innerHTML = label;
	this.element.className = "choicebar_button";
	this.img.src = imageUrl;
	this.element.style.height = "100%";
	this.hoverImage = false;

	if(halign)
		this.element.style['float'] = halign;
	
	var t = this;
	this.addEventListener("touchstart",function(e) {
		e.preventDefault();
		t.element.className = "choicebar_button choicebar_buttonselected";

		if(t.hoverImage) {
			t.img.style.display = "none";
			t.hoverImage.style.display = "block";
			t.hoverImage.style.margin = "auto";
		}
	},false);
	this.addEventListener("touchmove",function(e) {
		e.preventDefault();
	},false);
	this.addEventListener("touchend",function(e) {
		e.preventDefault();
		t.element.className = "choicebar_button";
		if(t.hoverImage) {
			t.img.style.display = "block";
			t.hoverImage.style.display = "none";
			t.img.style.margin = "auto";
		}
	},false);
	
	this.element.appendChild(this.img);
	this.element.appendChild(this.label);
}
/**
 * This adds an event listener to the button element. It uses the W3C advanced
 * event registration model, this obviously won't (and never will) work in IE6->8.
 * @param type String type of event to capture (i.e. "click").
 * @param func Function A function to call when the event is called.
 * @param bubble boolean Should this event "bubble" up and notify any other DOM elements of this event? (usually false is good)
 */
Button.prototype.addEventListener = function(type,func,bubble) {
	this.element.addEventListener(type,func,bubble);
}
/**
 * This sets an image to display for when a user hovers over this button.
 */
Button.prototype.setHoverImage = function(imageUrl) {
	this.hoverImage = new Image();
	this.hoverImage.src = imageUrl;
	this.hoverImage.style.display = "none";
	this.element.insertBefore(this.hoverImage,this.img);
}
/**
 * THis sets an image to display on the button when nothing is happening to it.
 */
Button.prototype.setImage = function(image) {
	var newImg = new Image();
	newImg.src = image;
	this.element.insertBefore(newImg,this.img);
	this.element.removeChild(this.img);
	this.img = newImg;
}
/**
 * This sets the label on this button.
 */
Button.prototype.setLabel = function(label) {
	this.label.innerHTML = label;
}
