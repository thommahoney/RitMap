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
 * This function starts the ball in motion once the map is preloaded.
 */
function init() {
	var map = new iPhoneMap(document.getElementById("map"));
	var bar = new ChoiceBar(map);
	wifi = new Wifi(); //This specifically needs to be global. kthxbye
	var wfLocation = new WifiLocation(); //This automatically gloms onto wifi's updates.
	
	spinner = new SpinnerButton("Floor 1","images/floor1.png");
	var floor1Button = new Button("Floor 1","images/floor1.png");
	var floor2Button = new Button("Floor 2","images/floor2.png");
	var floor3Button = new Button("Floor 3","images/floor3.png");

	
	floor1Button.addEventListener("touchend",function() {
		spinner.masterButton.setLabel("Floor 1");
		spinner.masterButton.setImage("images/floor1.png");
		map.switchFloors(0);
	},false);
	floor2Button.addEventListener("touchend",function() {
		spinner.masterButton.setLabel("Floor 2");
		spinner.masterButton.setImage("images/floor2.png");
		map.switchFloors(1);
	},false);
	floor3Button.addEventListener("touchend",function() {
		spinner.masterButton.setLabel("Floor 3");
		spinner.masterButton.setImage("images/floor3.png");
		map.switchFloors(2);
	},false);
	

	
	
	var friendsButton = new Button("Friends","images/face-smile.png","right");
	friendsButton.setHoverImage("images/face-raspberry.png");
	var friendMenu = new FriendMenu();
	friendsButton.addEventListener("touchend",function() {
		friendMenu.appear();
	},false);
	
	friendMenu.addEventListener("friendupdate",function(friends) {
		map.drawFriends(friends);
	});
	
	var friendUpdateLoop = function() {
		Database.getFriendsLocations(userSessionId,function(r) { friendMenu.updateFriends(r); });
		setTimeout(friendUpdateLoop,15*1000);//Every 15 seconds, fire this bad boy off.
	}
	setTimeout(friendUpdateLoop,15*1000);
	friendUpdateLoop();
	
	wfLocation.addEventListener("locationupdate",function(e) {
		var point = e.point;
		var floor = e.floor-1;
		
		if(floor != map.currentFloor) {
			map.switchFloors(floor);
		}
		var p = Math.round(point.x)+","+Math.round(point.y);
		Database.updateLocation(p,floor,userSessionId,function() {});
		
		spinner.masterButton.setLabel("Floor "+(floor+1));
		spinner.masterButton.setImage("images/floor"+(floor+1)+".png");
		
		map.createOrUpdateLocation(userName,e.point.x+","+e.point.y,floor,"images/person.png");
	});
	
	
	spinner.addButton(floor1Button);
	spinner.addButton(floor2Button);
	spinner.addButton(floor3Button);
	bar.addSpinner(spinner);
	bar.addButton(friendsButton);
	
	
	var centerButton = new Button("Center","images/centerIcon.png");
	centerButton.addEventListener("touchend",function() {
		map.zoomFull();
	});
	bar.addButton(centerButton);

	var fakeNativeApp = false;
	
	if(fakeNativeApp) {
		isNativeApp=true; //For testing only.
	}
	if(isNativeApp) {
		var trackingButton = new Button("GPS On","images/emblem-default.png","right");
		
		if(fakeNativeApp) {
			var fauxNative = new FauxNative();
			fauxNative.goTest();
		}
		trackingButton.addEventListener("touchend",function() {
			if(trackingButton.label.innerHTML == "GPS On") {
				if(fakeNativeApp)
					fauxNative.stopTest();
				trackingButton.setLabel("GPS Off");
				trackingButton.setImage("images/emblem-important.png");
				
				if(!fakeNativeApp)
					window.location.href = "wadfip-scheme://scanoff";
			} else {
				if(fakeNativeApp)
					fauxNative.goTest();
				trackingButton.setLabel("GPS On");
				trackingButton.setImage("images/emblem-default.png");
				if(!fakeNativeApp)
					window.location.href = "wadfip-scheme://scanon";
			}
		},false);
		bar.addButton(trackingButton);
		window.location.href = "wadfip-scheme://scanon";
	}

	setTimeout(function() {window.scrollTo(0,1);},5000);
	


}
