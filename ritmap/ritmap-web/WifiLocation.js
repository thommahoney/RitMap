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
 * Hard coded list of RIT access points in building 70. This list may be wildly out
 * of date now. Probably a good idea to make a more dynamic list. This is the kind
 * of shinanagins that happens when you're on a severe deadline. =)
 */
var ritAP = eval('([{"mac":"0:22:90:92:fe:20","x":"798.459793166","y":"1185.50412642","floor":"1"},{"mac":"0:22:90:92:d5:80","x":"798.496052466","y":"941.110188876","floor":"2"},{"mac":"0:22:90:92:fe:30","x":"557.96994275","y":"782.464597442","floor":"2"},{"mac":"0:22:90:92:db:90","x":"841.571001285","y":"960.872338856","floor":"2"},{"mac":"0:22:90:92:fe:80","x":"647.431486588","y":"490.291291833","floor":"2"},{"mac":"0:22:90:92:dc:30","x":"715.268193478","y":"1134.23408411","floor":"2"},{"mac":"0:22:90:92:f0:50","x":"808.139695338","y":"1288.46714379","floor":"2"},{"mac":"0:22:90:92:f1:60","x":"747.673417991","y":"1259.92855062","floor":"2"},{"mac":"0:22:90:92:fe:e0","x":"662.161582119","y":"1102.40798388","floor":"2"},{"mac":"0:22:90:93:1:f0","x":"681.898865243","y":"630.299989013","floor":"2"},{"mac":"0:22:90:92:f4:f0","x":"574.096034258","y":"733.277433259","floor":"2"},{"mac":"0:22:90:92:f3:e0","x":"768.381826643","y":"399.653190577","floor":"2"},{"mac":"0:22:90:92:d2:60","x":"748.391448181","y":"691.110450064","floor":"2"},{"mac":"0:22:90:92:d3:f0","x":"760.901715276","y":"456.616327463","floor":"2"},{"mac":"0:22:90:92:f2:c0","x":"955.968126341","y":"647.394433979","floor":"2"},{"mac":"0:22:90:92:eb:90","x":"795.946379496","y":"656.650820094","floor":"3"},{"mac":"0:22:90:92:ef:0","x":"942.221579016","y":"584.642945143","floor":"2"},{"mac":"0:22:90:92:d2:50","x":"915.992167942","y":"996.224570534","floor":"2"},{"mac":"0:22:90:92:fc:60","x":"274.059743572","y":"526.09109377","floor":"2"},{"mac":"0:22:90:92:f0:40","x":"419.629861521","y":"435.183608696","floor":"2"},{"mac":"0:23:34:3c:6c:30","x":"430.577957033","y":"458.726887437","floor":"2"},{"mac":"0:22:90:92:f4:b0","x":"503.669757601","y":"344.06780943","floor":"2"},{"mac":"0:18:74:c6:fd:30","x":"388.402888968","y":"630.394073896","floor":"2"},{"mac":"0:22:90:92:f1:b0","x":"809.77972518","y":"340.616484042","floor":"2"},{"mac":"0:22:90:92:f4:d0","x":"817.720635288","y":"437.555169016","floor":"3"},{"mac":"0:22:90:93:2:d0","x":"805.9165408","y":"342.966304479","floor":"3"},{"mac":"0:22:90:92:ff:10","x":"791.949613226","y":"401.276451089","floor":"1"},{"mac":"0:22:90:92:f5:60","x":"827.839200744","y":"287.879004342","floor":"2"},{"mac":"0:22:90:93:2:b0","x":"779.660324073","y":"481.702401586","floor":"3"},{"mac":"0:22:90:93:3:40","x":"757.091162779","y":"452.071085587","floor":"1"},{"mac":"0:22:90:93:0:d0","x":"703.617417726","y":"332.713581631","floor":"2"},{"mac":"0:22:90:93:1:c0","x":"672.693485335","y":"305.431582163","floor":"2"},{"mac":"0:22:90:92:f2:d0","x":"753.835227324","y":"526.344600837","floor":"1"},{"mac":"0:22:90:92:fa:d0","x":"506.376692523","y":"221.301633668","floor":"2"},{"mac":"0:22:90:93:1:30","x":"441.87033964","y":"353.674722798","floor":"2"},{"mac":"0:22:90:93:1:50","x":"768.301760466","y":"352.722593635","floor":"3"},{"mac":"0:22:90:92:f3:50","x":"668.323041962","y":"486.320702872","floor":"1"},{"mac":"0:22:90:92:f3:20","x":"802.01088539","y":"345.327085652","floor":"1"},{"mac":"0:22:90:92:fe:0","x":"754.628902777","y":"338.155823083","floor":"3"},{"mac":"0:22:90:92:f5:40","x":"167.983179696","y":"440.358615153","floor":"2"},{"mac":"0:22:90:92:f2:0","x":"384.995444937","y":"701.104096073","floor":"1"},{"mac":"0:22:90:93:0:20","x":"482.13100852","y":"370.805780988","floor":"2"},{"mac":"0:22:90:92:f4:c0","x":"162.04795078","y":"348.540163238","floor":"2"},{"mac":"0:22:90:92:fe:a0","x":"195.090111384","y":"285.784422139","floor":"2"},{"mac":"0:22:90:92:f5:e0","x":"82.1209393861","y":"516.467747638","floor":"2"},{"mac":"0:22:90:93:1:60","x":"804.078982568","y":"976.195505907","floor":"1"},{"mac":"0:22:90:93:1:90","x":"790.800357091","y":"1126.10307377","floor":"1"},{"mac":"0:22:90:93:1:b0","x":"802.796009274","y":"1082.30494437","floor":"1"},{"mac":"0:22:90:92:f6:a0","x":"724.294258743","y":"921.34750957","floor":"1"},{"mac":"0:22:90:92:fa:30","x":"659.120286388","y":"608.557096761","floor":"1"},{"mac":"0:22:90:92:f9:80","x":"730.125230706","y":"885.0563038","floor":"1"},{"mac":"0:22:90:92:fe:10","x":"804.433482615","y":"963.557911969","floor":"1"},{"mac":"0:22:90:93:2:f0","x":"770.595652822","y":"1124.25776959","floor":"1"},{"mac":"0:22:90:93:2:10","x":"835.166275778","y":"783.826817485","floor":"1"},{"mac":"0:22:90:93:0:50","x":"664.199898638","y":"645.645364756","floor":"1"},{"mac":"0:22:90:93:0:f0","x":"741.394435548","y":"465.244243772","floor":"1"},{"mac":"0:22:90:92:fc:d0","x":"167.491254864","y":"439.56243073","floor":"1"},{"mac":"0:22:90:92:f9:e0","x":"301.078596538","y":"366.87036794","floor":"1"},{"mac":"0:22:90:93:1:e0","x":"247.888029097","y":"245.320150767","floor":"1"},{"mac":"0:22:90:93:1:10","x":"295.004257454","y":"257.878283825","floor":"1"},{"mac":"0:22:90:92:f0:90","x":"446.453129498","y":"398.902141839","floor":"1"},{"mac":"0:22:90:93:2:80","x":"438.801859326","y":"379.558348623","floor":"1"},{"mac":"0:22:90:92:fa:20","x":"112.897287941","y":"413.823682321","floor":"1"},{"mac":"0:22:90:92:fd:10","x":"139.441806446","y":"607.701172692","floor":"1"},{"mac":"0:19:a9:fe:65:50","x":"248.352263114","y":"594.391436793","floor":"1"},{"mac":"0:22:90:92:d9:e0","x":"805.399015867","y":"175.585175585","floor":"3"},{"mac":"0:22:90:92:df:50","x":"696.079777694","y":"794.107113306","floor":"3"},{"mac":"0:22:90:92:fd:20","x":"834.626760635","y":"663.081639735","floor":"3"},{"mac":"0:22:90:92:fe:70","x":"835.442401229","y":"877.957945946","floor":"3"},{"mac":"0:22:90:93:3:10","x":"791.996889806","y":"667.765954962","floor":"3"},{"mac":"0:22:90:92:fd:a0","x":"1006.89722985","y":"931.158598842","floor":"3"},{"mac":"0:22:90:92:d5:90","x":"788.602789506","y":"1025.55612263","floor":"3"},{"mac":"0:22:90:92:d3:20","x":"737.111930242","y":"1122.88994268","floor":"3"},{"mac":"0:22:90:92:f0:a0","x":"712.656501413","y":"1059.69421228","floor":"3"},{"mac":"0:22:90:92:d3:80","x":"563.458296792","y":"910.488490471","floor":"3"},{"mac":"0:22:90:92:ea:f0","x":"773.233848525","y":"1120.76059791","floor":"3"},{"mac":"0:22:90:92:da:80","x":"779.950134211","y":"1109.02239142","floor":"3"},{"mac":"0:22:90:92:f4:0","x":"779.732880047","y":"1104.24557825","floor":"3"}])');

/**
 * Class constructor - holds a list of known access points and locations along with
 * the current floor a couple other instance variables.
 * The dependancies for just this class are Wifi.js, Circle.js and Point.js
 */
function WifiLocation() {
	/**
	 * This array holds all of the access points currently visible to the application.
	 * This is an array of AccessPoint objects.
	 */
	this.accessPoints = new Array();
	
	/**
	 * This switch assumes the debugging bindings exist. See techdemo/index.html
	 * for an example of how to use them. Basically these allow you to expose
	 * the internals of how the algorithm works in a graphical way.
	 * You must implement (in the global scope):
	 * -drawPoint(point,color);
	 * -drawCircle(circle,color,fill);
	 * -drawBox(point,point,color);
	 * -loadFloor(index);
	 */
	this.debug = false;
	
	/**
	 * Another debugging flag, will use console.log to output the total time
	 * the algorithm took to identify your location.
	 */
	this.time = false;
	
	/**
	 * The current floor.
	 */
	this.floor = 1;
	
	/**
	 * This holds functions used for callbacks when the floor changes.
	 */
	this.floorChangeCallbacks = new Array();
	/**
	 * This holds functions used for callbacks when the location changes.
	 */
	this.locationChangeCallbacks = new Array();
	
	/*
	 * Register's this class as a listener of the wifi class, so we recieve
	 * sensor updates when the occur.
	 */
	var t = this;
	wifi.registerCallback(function(e) {t.update(e);});
}
/**
 * This function takes a sensor reading passed in from Wifi and after passing some inital
 * sanity checks it gets passed to the locator algorithm.
 * @param accessPoints AccessPoint[] An array of access point objects.
 */
WifiLocation.prototype.update = function(accessPoints) {
	//Keeps track of when we started for timing.
	var startTime = new Date().getTime()/1000;
	
	//Sets the visible access points to what we just got from Wifi.
	this.accessPoints = accessPoints;
	if(this.lookupAPLocations()!=false) {
		this.locate(); //We have enough data points to do a real lookup.
	} else {
		if(this.accessPoints.length > 0) {
			//We really only have one usable point, just use the center of that
			//point.
			var ap = this.accessPoints[this.accessPoints.length-1];
			this.result = new Point(ap.x,ap.y);
		}
	}
	//Create an event to send to all listeners.
	var evt = new LocationUpdateEvent(this.result,this.floor);
	for(var x=0;x<this.locationChangeCallbacks.length;x++) {
		var f = this.locationChangeCallbacks[x];
		//Send the event.
		f(evt);
	}
	
	//If we're benchmarking, print the result to console.log
	if(this.time) {
		var rtime = ((new Date().getTime()/1000)-startTime);
		rtime = Math.round(rtime*1000)/1000;
		document.getElementById("timer").value = rtime
		console.log("Lookup took "+rtime+" seconds to run");
	}
}
/**
 * This method finds the minimum multiplier to make all of the radii of the
 * access points collide at least once.
 *@return double A common multiplier to make the radii of all of the signals collide.
 */
WifiLocation.prototype.findMultiplier = function() {
	var lM = 0;
	for(var x=0;x<this.accessPoints.length;x++) {
		var ap1 = this.accessPoints[x];
		var p1 = new Point(ap1['x'],ap1['y']);
		for(var y=0;y<this.accessPoints.length;y++) {
			var ap2 = this.accessPoints[y];
			var p2 = new Point(ap2['x'],ap2['y']);
			var d = p1.distance(p2);
			var m = (d/(ap1['strength']+ap2['strength']));
			if(m>lM)
				lM = m;
		}
	}
	return lM;
}
/**
 * This function attempts to find a static (known) access point with the given
 * MAC address. If it finds one it returns it as an object of the following type:
 * {"mac"   : "mac address with colans",
 *  "x"     : "x coordinate offset",
 *  "y"     : "y coordinate offset",
 *  "floor" : "floor the access point resides on"}
 *@param mac String MAC address to look up.
 *@return Object Returns an object of the above format on success, on falure it returns false. 
 */
WifiLocation.prototype.findAccessPoint = function(mac) {
	for(var x=0;x<ritAP.length;x++) {
		if(ritAP[x].mac == mac)
			return ritAP[x];
	}
	return false;
}
/**
 * This function is the meat of the class that actually does the location lookups
 * based off of sensor readings retrieved by the Wifi class and stored in the instance.
 * Output of this function is stored in this.result and is pushed out through the
 * event interface.
 */
WifiLocation.prototype.locate = function () {
	//Find a common multiplier to make all the circles collide.
	var m = this.findMultiplier();
	
	//Array that will store collisions
	var intersections = new Array();
	
	//Iterate through all combinations of all circles finding collisions.
	for(var x=0;x<this.accessPoints.length;x++) {
		var p1 = this.accessPoints[x];
		var p1Circle = new Circle(p1.x,p1.y,p1.strength*m);
		
		//Debug -- Draw the circle.
		if(this.debug) {
			drawCircle(p1Circle,"red");
			drawPoint(p1Circle.point,"red");
		}
		//Iterate through again.
		for(var y=0;y<this.accessPoints.length;y++) {
			var p2 = this.accessPoints[y];
			var p2Circle = new Circle(p2.x,p2.y,p2.strength*m);
			
			//Get an array of intersects
			var isects = p1Circle.circleIntersect(p2Circle);
			
			//If there are intersections--
			if(isects!=false) {
				for(var i=0;i<isects.length;i++)
				{
					//Search for all unique intersections.
					var found = false;
					for(var j=0;j<intersections.length;j++)
						if(intersections[j].equalsTo(isects[i]))
							found = true;
					if(!found) {
						//We found a unique intersection! Yippie!
						intersections[intersections.length] = isects[i];
					}
				}
			}
		}
	}
	this.intersections = intersections;
	
	//Debug -- Draw all of the intersection points.
	//WARNING: This can return bad numbers don't forget to catch them.
	if(this.debug) {
		for(var x=0;x<intersections.length;x++) {
			drawPoint(intersections[x],"blue");
		}
	}
	
	//This will crunch all of the intersections and find the "closest" cluster
	//of points and from that bounding box will create an average point that seems
	//to be close to where we are.
	this.result = this.findSmallestCluster();
	
	//Debug -- Draw the finished result.
	if(this.debug)
		drawCircle(new Circle(this.result.x,this.result.y,5),"green",true);
}
/**
 * This function will take all of the intersections we found in locate() and will
 * attempt to find the highest concentration of intersections in the set. We'll
 * then draw a bounding box around it, and the midpoint of the box is our location.
 */
WifiLocation.prototype.findSmallestCluster = function() {
	//A hashmap of points and distances.
	var distances = new Object();
	//For each of the intersections...
	for(var x=0;x<this.intersections.length;x++) {
		var p1 = this.intersections[x];
		var dist = new Object();
		//...compare the distance to all other intersections
		for(var y=0;y<this.intersections.length;y++) {
			var p2 = this.intersections[y];
			var d = p1.distance(p2);
			if(d!=0) {
				dist[y] = d;
			}
		}
		//Sort by value, maintain indexes.
		asort(dist);
		
		var count = 0;
		for(key in dist) {
			//Filter out all but the three closest points -- this is an area to "tweak"
			if(count>2)
				delete dist[key];
			count++;
		}
		//Sets the distances 
		distances[x] = dist;
	}
	
	//Now we're on to the make-a-bounding-box part.
	var smallest = 999999;
	var point = 0;
	for(i1 in distances) {
		var sum=0;
		var ps = distances[i1];
		for(i2 in ps) {
			sum += ps[i2];
		}
		
		if(sum < smallest) {
			smallest = sum;
			point = i1;
		}
	}
	
	var x1 = this.intersections[point].x;
	var y1 = this.intersections[point].y;
	var x2 = this.intersections[point].x;
	var y2 = this.intersections[point].y;
	
	for(p in distances[point]) {
		var tP = this.intersections[p];
		if(tP.x < x1)
			x1 = tP.x;
		if(tP.y < y1)
			y1 = tP.y;
		if(tP.x > x2)
			x2 = tP.x;
		if(tP.y > y2)
			y2 = tP.y;
	}
	//Debug -- Draw the bounding box.
	if(this.debug)
		drawBox(new Point(x1,y1),new Point(x2,y2),"blue");
		
	//Return our finished point.
	return new Point((x1+x2)/2,(y1+y2)/2);
}
/**
 * This function performs a match to see which access points in our gather
 * match known points. This method also chooses the floor by counting up the floor
 * counts on each point and the floor with the highest count wins. 2.5d at its best.
 */
WifiLocation.prototype.lookupAPLocations = function() {
	var floors = [0,0,0]; //TODO: Make this less bad. (more flexible for floors)
	if(this.accessPoints.length>4) {
		this.accessPoints.splice(0,this.accessPoints.length-4);
	}

	for(var x=0;x<this.accessPoints.length;x++) {
		var apData = this.findAccessPoint(this.accessPoints[x].mac);
		//See if we know about this one.
		if(apData) {
			//We know about this one, set the rest of the information in the instance variable.
			this.accessPoints[x]['x'] = apData.x;
			this.accessPoints[x]['y'] = apData.y;
			this.accessPoints[x]['floor'] = apData.floor;
			this.accessPoints[x]['strength'] = 50-this.accessPoints[x]['strength'];
			if(!floors[apData.floor-1])
				floors[apData.floor-1] = 1;
			else
				floors[apData.floor-1] += 1;
		} else {
			//We have an unknown node, kill it dead.
			this.accessPoints.splice(x,1);
		}
	}
	
	//Find the floor count.
	var floor = 0;
	var maxFloor = 0;
	for(var x=0;x<floors.length;x++) {
		if(floors[x] > maxFloor) {
			floor = x;
			maxFloor = floors[x];
		}
	}
	
	//Debug -- Load the correct floor.
	if(this.debug) {
		loadFloor(floor+1);
	}
	
	this.floor = floor+1;
	
	if(this.accessPoints.length<4) {
		return false;
	}
}
/**
 * This method registers an event listener for location change events.
 */
WifiLocation.prototype.addEventListener = function(type,f,bubble) {
	if(type=="locationupdate") {
		this.locationChangeCallbacks[this.locationChangeCallbacks.length] = f;
	}
}

/**
 * This class simply wraps a point and a floor to send to listening methods.
 */
function LocationUpdateEvent(point,floor) {
	this.point = point;
	this.floor = floor;
}

/**
 * Similar to PHP's asort, this sorts ascending based on value and preserves
 * keys.
 */
function asort(arr) {
	var values = new Array();
	var keys = new Object();
	for(key in arr) { keys[arr[key]]=key; values[values.length]=arr[key]; delete arr[key]; }
	values.sort();
	for(var x=0;x<values.length;x++) {
		arr[keys[values[x]]]=values[x];
	}
}
/**
 * Similar to PHP's ksort, this sorts ascending based on key.
 * TODO: Remove this as it's not being used.
 */
function ksort(arr) {
	var keys = new Array();
	var values = new Object();
	for(key in arr) { keys[keys.length]=key; values[key]=arr[key]; delete arr[key]; }
	keys.sort();
	for(var x=0;x<keys.length;x++)  {
		arr[keys[x]] = values[keys[x]];
	}
}
