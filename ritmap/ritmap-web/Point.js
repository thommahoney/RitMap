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
 * This class represents a single point on an x-y axis.
 * @param x double Position on the horizontal axis.
 * @param y double Position on the vertical axis.
 */
function Point(x,y) {
	this.x = Number(x);
	this.y = Number(y);
}
/**
 * This method determines the linear distance between the current point and the
 * point that is passed in.
 * @param p Point Point to measure to.
 * @return double Linear distance between points.
 */
Point.prototype.distance = function(p) {
	var x = (p.x-this.x)*(p.x-this.x);
	var y = (p.y-this.y)*(p.y-this.y);
	return Math.sqrt(x+y);
}
/**
 * This method tests for equality with the passed in point and the current point.
 * @param p Point Point to test with.
 * @return boolean true if x=x and y=y, false otherwise.
 */
Point.prototype.equalsTo = function(p) {
	if(this.x == p.x && this.y == p.y) {
		return true;
	}
	return false;
}
/**
 * This method will only work on Mobile Safari. It converts a "touch" event to a
 * single point by pulling out the first touch on the page.
 * @param e TouchEvent Event to pull finger pull out of.
 * @return Point New point containing the first finger press.
 */
Point.touchToPoint = function (e) {
	return new Point(e.touches[0].pageX,e.touches[0].pageY);
}
/**
 * This is another Mobile Safari only method that allows you to determine the
 * midpoint of translation based on an array of two touch events.
 * @param touches Array containing two TouchEvent's
 * @return Point Midpoint of the two touches to use as the midpoint for any translations done.
 */
Point.scaleMidPoint = function (touches) {
	var p1 = new Point(touches[0].screenX,touches[0].screenY);
	var p2 = new Point(touches[1].screenX,touches[1].screenY);
	
	return new Point((p1.x+p2.x)/2,(p1.y+p2.y)/2);
}
/**
 * This method translates this point by an offset point.
 * @param point Point to translate by.
 * @param aOffset Point to use as an x-y reference for how much to translate.
 * @return Point Translated point.
 */
Point.prototype.translate = function(point,aOffset) {
	return new Point((point.x-this.x)+aOffset.x,(point.y-this.y)+aOffset.y);
}
/**
 * This method simply multiplies x and y based on a given scale.
 * @param scale double Number to multiply by.
 */
Point.prototype.scale = function(scale) {
	this.x = this.x*scale;
	this.y = this.y*scale;
}
