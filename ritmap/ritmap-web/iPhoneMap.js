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
 * This class implements the dynamic map displayed in the application.
 * It needs some refinement as the gestures are still a little sloppy.
 * Essentially this creates a set of tiles defined in (tiles.xml) and originizes
 * and distrubutes them into "trays" (one per floor) that allow safari to easily
 * manipulate it with hardware accelleration. Speed was a HUGE problem with
 * the iPhone which led me to create this class instead of using something
 * standard like Google Maps. I'd strongly recommend using something else
 * if your device has the horsepower.
 */
function iPhoneMap(element) {
	this.start	= new Point(0,0);
	this.end	= new Point(0,0);
	this.cur	= new Point(0,0);
	
	this.isGesture = false;
	
	//These are for the poke jesture
	this.touchCount = 0;
	this.touching = false;
	this.labelsOut = false;
	//--endpoke
	
	this.currentScale = 1;
	this.endScale = 1;
	this.startScale = 1;
	this.currentFloor = 0;
	
	this.floors = new Array();
	this.locationNodes = new Array();
	
	this.element = element;
	this.element.style.backgroundColor = "black";
	this.element.style.position = "absolute";
	this.element.style.left = "0px";
	this.element.style.top = "0px";
	this.element.style.width = "100%";
	this.element.style.height = "100%";
	this.element.style.overflow = "hidden";
	this.element.style.webkitTransformOrigin = "75% 50%";
	
	this.inner = document.createElement("div");
	this.inner.style.webkitTransformOrigin = "0px,0px";
	this.element.appendChild(this.inner);
	
	//Event Listeners
	var t = this;
	this.element.ontouchstart = function(e) { t.touchStart(e); };
	this.element.ontouchmove = function(e) { t.touchMove(e); };
	this.element.ontouchend = function(e) { t.touchEnd(e); };
	this.element.ongesturestart = function(e) { t.gestureStart(e); };
	this.element.ongesturechange = function(e) { t.gestureChange(e); };
	this.element.ongestureend = function(e) { t.gestureEnd(e); };
	document.addEventListener("orientationchange",function() {t.adjust();},false);
	
	this.adjust();
	this.loadXml("tiles.xml");
}
/**
 * Switches floors.
 */
iPhoneMap.prototype.switchFloors = function(floor) {
	var cFloor = this.floors[this.currentFloor];
	var nFloor = this.floors[floor];
	
	if(!cFloor || !nFloor) //Not loaded yet.
		return;
	
	cFloor.style.opacity = "1";
	nFloor.style.opacity = "0";
	cFloor.style.visibility = "";
	cFloor.style.position = "absolute";
	cFloor.style.left = "0px";
	cFloor.style.top = "0px";
	cFloor.style.opacity = "0";
	nFloor.style.visibility = "";
	nFloor.style.position = "";
	nFloor.style.left = "";
	nFloor.style.top = "";
	nFloor.style.opacity = "1";
	
	this.currentFloor = floor;
	
	for(var x=0;x<this.locationNodes.length;x++) {
		this.locationNodes[x].floorChange(floor);
	}
}
/**
 * Make everything fit right, in theory.
 */
iPhoneMap.prototype.adjust = function() {
	setTimeout(function() {window.scrollTo(0,1);},500);
	this.width = this.element.clientWidth;
	this.height = (window.orientation==0)?(356+60):(208+60);
	//This is a bad solution to the problem, fix this if possible.
	this.element.style.height = this.height+"px";
}
/**
 * Reset zoom.
 */
iPhoneMap.prototype.zoomFull = function() {
	var scale = (this.inner.offsetWidth>this.inner.offsetHeight)?this.width/this.inner.offsetWidth:this.height/this.inner.offsetHeight;
	//var x = -(this.inner.offsetWidth/2)*scale;
	var x = 0;
	var y = -(this.inner.offsetHeight-(this.inner.offsetHeight*scale))/2;
	
	//Chop off the top border
	y += 20;
	this.inner.style.webkitTransitionProperty = "-webkit-transform";
	this.inner.style.webkitTransitionDuration = "1s";
	this.inner.style.webkitTransform =  "translate("+x+"px,"+y+"px) scale("+scale+")";
	this.inner.style.webkitTransitionDuration = "0s";
	
	this.start	= new Point(x,y);
	this.end	= new Point(x,y);
	this.cur	= new Point(x,y);
	
	this.currentScale = scale;
	this.endScale = scale;
	this.startScale = scale;
	
	this.notifyScaleChange();
}
/**
 * Scale the entire map using transforms.
 */
iPhoneMap.prototype.zoom = function(scale,origin) {
	var x = origin.x;
	var y = origin.y;
	this.inner.style.webkitTransform =  "translate("+x+"px,"+y+"px) scale("+scale+")";
	
	this.start	= new Point(x,y);
	this.end	= new Point(x,y);
	this.cur	= new Point(x,y);
	
	this.currentScale = scale;
	this.endScale = scale;
	this.startScale = scale;
	this.notifyScaleChange();
}
/**
 * Grabber for the XML file.
 */
iPhoneMap.prototype.loadXml = function(url) {
	var xml = new XMLHttpRequest();
	var t = this;
	xml.onreadystatechange = function(e) {
		if(xml.readyState==4) {
			t.loadImages(xml.responseXML);
		}
	}
	xml.open("GET",url,true);
	xml.send(null);
}
/**
 * Image preloader-sorter
 */
iPhoneMap.prototype.loadImages = function(xml) {
	this.tileSize = xml.getElementsByTagName("map")[0].getAttribute("size");
	var floors = xml.getElementsByTagName("floor");
	var root = xml.getElementsByTagName("map")[0];
	
	this.inner.style.height = floors[0].length*this.tileSize+"px";
	//this.inner.style.width = floors[0][0].length*this.tileSize+"px";
	
		
	for(var i=0;i<floors.length;i++) {
		var floor = document.createElement("div");
		
		var rows = floors[i].getElementsByTagName("tileset");	
		this.inner.style.minWidth = (this.tileSize*rows.length)+"px";

		for(var y=0;y<rows.length;y++) {
			var cols = rows[y].getElementsByTagName("tile");
			for(var x=0;x<cols.length;x++) {
				var tmp = new Image();
				tmp.src = cols[x].getAttribute("image");
				tmp.setAttribute("width",this.tileSize);
				tmp.setAttribute("height",this.tileSize);
				tmp.setAttribute("x",x);
				tmp.setAttribute("y",y);
				tmp.ontouchstart = function(e) { e.preventDefault(); }
				floor.appendChild(tmp);
			}
			floor.appendChild(document.createElement("br"));
		}
		if(i!=0) {
			floor.style.visibility = "hidden";
			floor.style.position = "absolute";
			floor.style.left = "0px";
			floor.style.top = "0px";
		}
		this.floors[this.floors.length] = floor;
		this.inner.appendChild(floor);
	}
	this.zoomFull();
}
/**
 * Touch event handler.
 */
iPhoneMap.prototype.touchStart = function(e) {
	e.preventDefault();
	
	this.start = Point.touchToPoint(e);
	
	this.touching = true;
	this.isGesture = false;
	this.touchCount = 0;
	
	var t = this;
	
	for(var x=0;x<t.locationNodes.length;x++)  {
		t.locationNodes[x].drawLabel();			
	}
	t.labelsOut = true;

}
/**
 * Touch event handler
 */
iPhoneMap.prototype.touchMove = function(e) {
	e.preventDefault();
	if(e.touches.length == 1 && !this.isGesture) {// || this.cur == null) {
		this.cur = this.start.translate(Point.touchToPoint(e),this.end);
	} else if (e.touches.length == 2) {
		this.isGesture = true;
	}
	this.touches = e.touches.length;
	this.touchCount++;
	
	this.inner.style.webkitTransform = "translate("+this.cur.x+"px,"+this.cur.y+"px) scale("+this.currentScale+")";
}
/**
 * Touch event handler
 */
iPhoneMap.prototype.touchEnd = function(e) {
	e.preventDefault();
	this.end = this.cur;

	for(var x=0;x<this.locationNodes.length;x++)  {
		this.locationNodes[x].destroyLabel();		
	}
	this.labelsOut = false;
}
/**
 * Gesture event handler
 */
iPhoneMap.prototype.gestureStart = function (e) {
	e.preventDefault();
	this.startScale = this.currentScale;
}
/**
 * Gesture event handler
 */
iPhoneMap.prototype.gestureChange = function (e) {
	e.preventDefault();
	this.currentScale = this.startScale * e.scale;
}
/**
 * Gesture event handler
 */
iPhoneMap.prototype.gestureEnd = function(e) {
	e.preventDefault();
	this.endScale = this.currentScale;
	this.notifyScaleChange();
}
/**
 * This tells all the user nodes to scale accordingly.
 */
iPhoneMap.prototype.notifyScaleChange = function() {
	for(var x=0;x<this.locationNodes.length;x++) {
		this.locationNodes[x].scaleChange(this.currentScale);
	}
}
/**
 * Adds a location node to the drawing.
 */
iPhoneMap.prototype.addLocationNode = function(lnode) {
	this.inner.insertBefore(lnode.element,this.inner.firstChild);
	this.locationNodes[this.locationNodes.length] = lnode;
}
/**
 * This draws the friends on the mape
 */
iPhoneMap.prototype.drawFriends = function(friends) {
	for(var i=0;i<friends.length;i++) {
		var friend = friends[i];
		this.createOrUpdateLocation(friend.handle,friend.location,friend.floor);
	}
}
iPhoneMap.prototype.createOrUpdateLocation = function(handle,location,floor,icon) {
	var lNode = false;
	
	if(location=="")
		return false;
	
	var pBits = location.split(',');
	var point = new Point(pBits[0],pBits[1]);
	for(var i=0;i<this.locationNodes.length;i++) {
		if(handle==this.locationNodes[i].label)
			lNode = this.locationNodes[i];
	}
	if(lNode==false) {
		//console.log(location+" "+point.x+" "+point.y);
		lNode = new LocationNode(handle,point,floor,icon);
		this.addLocationNode(lNode);
	} else {
		//console.log("UPDATE:"+point.x+" "+point.y);
		lNode.moveTo(point,floor);
	}
	
	lNode.floorChange(floor);
	lNode.scaleChange(this.currentScale);
}


