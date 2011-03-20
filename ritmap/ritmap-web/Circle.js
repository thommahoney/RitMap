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
 * This class represents a circle with a fixed point as a center and a specific
 * radius.
 * @param x Position in the horizontal axis.
 * @param y Position in the vertical axis.
 * @param r Radius.
 */
function Circle(x,y,r) {
	this.point = new Point(x,y);
	this.radius = Number(r);
}
/**
 * This method will measure the distance between the two center points of the circles
 * passed in.
 * @param c Circle Circle to measure to.
 */
Circle.prototype.distance = function(c) {
	return this.point.distance(c.point);
}
/**
 * This method will determine if two circles are logically equivalent (same midpoint, same radius).
 * @param c Circle Circle to test against.
 * @return boolean True if they're logically the same, false otherwise.
 */
Circle.prototype.equalsTo = function(c) {
	if(this.point.equalsTo(c.point) && this.radius==c.radius) {
		return true;
	}
	return false;
}
/**
 * This method will attempt to find any places where the current circle and the
 * passed in circle collide. It will return an array of these points.
 *
 * The algorithm was taken from http://local.wasp.uwa.edu.au/~pbourke/geometry/2circle/.
 * The code itself was loosely adapted from http://local.wasp.uwa.edu.au/~pbourke/geometry/2circle/tvoght.c
 * 
 * @param c2 Circle Circle to find collisions with.
 * @return Array Array of points where the circle intersects.
 */
Circle.prototype.circleIntersect = function(c2) {
	var c1 = this;
	var d = c1.distance(c2);
	var dx = c2.point.x-c1.point.x;
	var dy = c2.point.y-c1.point.y;
	
	if(d>(c1.radius+c2.radius))
		return false; //No solution
	else if(d<Math.abs(c1.radius-c2.radius))
		return false; //Circles are inside each other
	else if(c1.equalsTo(c2))
		return false;
	
	var a = ((c1.radius*c1.radius)-(c2.radius*c2.radius)+(d*d))/(2*d);
	var x2 = c1.point.x + (dx*(a/d));
	var y2 = c1.point.y + (dy*(a/d));
	var h = Math.sqrt((c1.radius*c1.radius)-(a*a));
	
	var rx = -dy*(h/d);
	var ry = dx*(h/d);
	
	var retr = new Array();

	retr[0] = new Point(x2+rx,y2+ry);
	if(x2+rx!=x2-rx && y2+ry != y2-ry)
		retr[1] = new Point(x2-rx,y2-ry);
	return retr;
}
