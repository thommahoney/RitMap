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
 * This class represents a "pin" on a map. When the map is "poked" it has a label
 * that gets displayed on the map.
 */
function LocationNode (label,point,floor,icon) {	
	this.label = label;
	this.floor = floor;
	this.point = point;
	this.element = document.createElement("div");
	
	this.element.style.webkitTransform = "translate(" +point.x+ "px,"+point.y+"px)";
	this.baseClass = "location";
	
	if(icon) {
		//var iconImg = new Image();
		//iconImg.src = icon;
		//iconImg.style.visibility = "hidden";
		//document.body.appendChild(iconImg);
		
		this.baseClass = "location_with_icon";
		this.element.style.backgroundImage = "url("+icon+")";
		this.element.style.width = "32px";
		this.element.style.height = "32px";
		this.element.style.border = "none";
		this.element.style.backgroundColor = "inherit";
		
		//document.body.removeChild(iconImg);
	}
	
	this.element.className = this.baseClass;
	this.element.className += " floor"+this.floor;
	//this.drawLabel();
	
}
LocationNode.prototype.floorChange = function(floor) {
	if(floor==this.floor)
		this.element.className = this.baseClass+" floor"+this.floor+" sameFloor";
	else
		this.element.className = this.baseClass+" floor"+this.floor+" diffFloor";
}
LocationNode.prototype.scaleChange = function(scale) {
	this.element.style.webkitTransform = "translate(" +this.point.x+ "px,"+this.point.y+"px) scale("+Math.pow(scale,-1)+")";
}
LocationNode.prototype.drawLabel = function() {
	this.labelElement = document.createElement("div");
	this.labelElement.className = "locationnode_labelcontainer";
	this.le = document.createElement("div");
	this.le.className = "locationnode_label";
	this.le.innerHTML = this.label;
	this.dec = document.createElement("div");
	this.dec.className = "locationnode_decoration";
	this.labelElement.appendChild(this.le);
	this.labelElement.appendChild(this.dec);
	this.element.innerHTML = "";
	this.element.appendChild(this.labelElement);

	this.labelElement.style.webkitTransform = "scale(1)";
}
LocationNode.prototype.destroyLabel = function() {
	this.element.innerHTML = "";
}
LocationNode.prototype.attach = function(iMap) {
	iMap.addLocationNode(this);
}
LocationNode.prototype.moveTo = function(point,floor,scale) {
	this.point = point;
	this.floor = floor;
	this.floorChange(floor);
	this.scaleChange(scale);
}
