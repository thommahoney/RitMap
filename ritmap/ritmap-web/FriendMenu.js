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
  * This class represents the friend menu in which users can add and remove
  * "friends" to track.
  * The menu will actually roll over the fixed content.
  */
function FriendMenu() {
	this.element = document.createElement("div");
	this.element.className = "friendsmenu";
	this.black = document.createElement("div");
	this.black.className = "friendsmenu_blackbar";
	this.top = document.createElement("div");
	this.top.className = "friendsmenu_topbar";
	this.top.innerHTML = "<h1>Friends</h1>";
	this.listHeader = document.createElement("div");
	this.listHeader.className = "friendsmenu_listHeader";
	this.listHeaderNameLabel = document.createElement("div");
	this.listHeaderNameLabel.className = "friendsmenu_list_name";
	this.listHeaderNameLabel.innerHTML = "Name";
	this.listHeaderFloorLabel = document.createElement("div");
	this.listHeaderFloorLabel.className = "friendsmenu_list_floor";
	this.listHeaderFloorLabel.innerHTML = "Floor";
	
	this.list = document.createElement("div");
	this.list.className = "friendsmenu_list";
	
	var t=this;
	
	this.backButton = document.createElement("div");
	this.backButton.className = "friendsmenu_backbutton";
	this.backButton.innerHTML = "Back";
	this.backButton.onclick = function() { t.disappear() };
	
	this.addButton = document.createElement("div");
	this.addButton.className = "friendsmenu_addbutton";
	this.addButton.innerHTML = "+";
    this.addButton.onclick = function() { t.addAFriend() };
	
	this.element.appendChild(this.black);
	this.element.appendChild(this.top);
	this.element.appendChild(this.listHeader);
	this.element.appendChild(this.list);
	this.top.appendChild(this.backButton);
	document.body.appendChild(this.element);
	this.top.appendChild(this.addButton);
	this.listHeader.appendChild(this.listHeaderNameLabel);
	this.listHeader.appendChild(this.listHeaderFloorLabel);
	
	this.friends = new Array();
	this.callbacks = new Array();
}
/**
 * Zoom in from off screen.
 */
FriendMenu.prototype.appear = function() {
	var t=this;
	this.element.style.webkitTransform = "translate(0,0)";
	Database.getFriendsLocations(userSessionId,function(r) { t.updateFriends(r); });
}
/**
 * Zoom off screen.
 */
FriendMenu.prototype.disappear = function() {
	window.scrollTo(0,1);
	this.element.style.webkitTransform = "translate(0,481px)";
}
/**
 * This method updates the list of friends.
 */
FriendMenu.prototype.updateFriends = function(friends) {
	this.friends = friends;
	this.list.innerHTML = "";
	for(var i=0;i<friends.length;i++) {
		var friend = friends[i];
		this.list.appendChild(this.getFriendElement(friend.handle,friend.floor));
	}
	
	//Notify anyone who cares
	for(var i=0;i<this.callbacks.length;i++) {
		this.callbacks[i](friends);
	}
}
/**
 * Add an event listener for friend updates. 
 */
FriendMenu.prototype.addEventListener = function(type,callback,bubbles) {
	if(type=="friendupdate") {
		this.callbacks[this.callbacks.length] = callback;
	}
}
/**
 * This method creates a "friend" DOM element based on a name and floor.
 */
FriendMenu.prototype.getFriendElement = function(name,floor) {
	var friendWrapper = document.createElement("div");
	var friendName = document.createElement("div");
	var friendFloor = document.createElement("div");
	
	friendWrapper.className = "friendsmenu_listItem";
	friendName.className = "friendsmenu_list_name";
	friendFloor.className = "friendsmenu_list_floor";
	
	friendName.innerHTML = name;
	friendFloor.innerHTML = (Number(floor)+1);
	
	friendWrapper.appendChild(friendName);
	friendWrapper.appendChild(friendFloor);
	
	return friendWrapper;
}
/**
 * This method will display a UI in which a user can add a new friend.
 */
FriendMenu.prototype.addAFriend = function() {
    var t = this;
    this.popup = document.createElement("div");
    var label = document.createElement("div");
    label.innerHTML="Friend's Name";
    label.className = "friendsmenu_addlabel";
    var input = document.createElement("input");
    var submit = document.createElement("input");
    var close = document.createElement("input");
    this.shade = document.createElement("div");
    this.shade.className="friendsmenu_backgroundshade";
    
    
    this.popup.className = "friendsmenu_addFriendPopup";
    
    input.setAttribute("type","text");
    input.className = "friendsmenu_inputbox";
    submit.setAttribute("type","submit");
    submit.setAttribute("value","Add Friend");
    submit.className = "friendsmenu_submitbutton";
    close.setAttribute("type","button");
    close.className = "friendsmenu_closebutton";
    close.setAttribute("value","Close Window");
    
    
    submit.addEventListener("click",function() { Database.addFriend(userName,input.value,userSessionId,function(r) { t.addFriendCallback(r); })},false);
    close.addEventListener("click",function() { t.closePopup(); },false);
    
 
    this.popup.appendChild(label);
    this.popup.appendChild(input);
    this.popup.appendChild(document.createElement("br"));
    this.popup.appendChild(submit);
    this.popup.appendChild(close);
    
    this.element.appendChild(this.shade);
    this.element.appendChild(this.popup);
}
/**
 * Kills the add-a-friend ui when we're done with it.
 */
FriendMenu.prototype.addFriendCallback = function(r) {
    if(r) {
        this.closePopup();
    } else {
        alert("An error has occured.");
    }
}
/**
 * Kills the add-a-friend ui when we're done with it.
 */
FriendMenu.prototype.closePopup = function() {
    this.element.removeChild(this.popup);
    this.element.removeChild(this.shade);
}
