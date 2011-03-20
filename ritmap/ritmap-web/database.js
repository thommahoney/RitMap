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
 * This class is a dirt simple communication's API using AJAX to communicate
 * with the database. We're using this to communicate positions and handles.
 *
 * WARNING: These calls aren't exactly secure in any kind of significant way.
 * If you want to make a production ready system you'll need to implement a
 * real JSON parser and you'll need to send this stuff over ssl.
 */
function Database() {
	//We're going to use the preloader AJAX functions here.
	//Async-callbacks are going to be added to prevent the app from freezing.
	//All of these methods are static, so you don't need an instance.
}
/**
 * This function attempts to log into the database, the response will be sent to your callback.
 * @param handle String User name to try to log into the database with.
 * @param password String Password to try to log in with. TODO: Add SSL.
 * @param callback Function function to call with the response from the server.
 */
Database.login = function(handle,password,callback) {
	ajaxWithCallback("database.php?cmd=login&handle="+handle+"&password="+password,function(r) {
		callback(eval('('+r.responseText+')'));
	});
}
/**
 * This function allows you to add a friend to your profile in the database.
 * This will cause any location requests to include this friend in the future.
 * @param handle String Your user name.
 * @param friend_handle String Friend's user name.
 * @param session_id String Your session id.
 * @param callback Function Function to call when we get a response.
 */
Database.addFriend = function(handle,friend_handle,session_id,callback) {
	ajaxWithCallback("database.php?cmd=addFriend&handle=" + handle + '&friend_handle=' + friend_handle + '&session_id=' + session_id,function(r) {
		callback(eval('('+r.responseText+')'));
	});
}

/**
 * This function will retrieve all friend locations on the current map.
 * @param session_id String session id for the current user.
 * @param callback Function Function to call when the response is retrieved.
 */
Database.getFriendsLocations = function(session_id,callback) {
	ajaxWithCallback('database.php?cmd=getFriendsLocations&session_id=' + session_id,function(r) {
		callback(eval('('+r.responseText+')'));
	});
}
/**
 * This function will send a location update to the server to be broadcast to friends.
 * @param location String String containing the point in x,y format.
 * @param floor Integer floor the user is currently on.
 * @param session_id String session id for the current user.
 * @param callback Function Function to call when the response is retrieved. 
 */
Database.updateLocation = function(location,floor,session_id,callback) {
	ajaxWithCallback('database.php?cmd=updateLocation&location=' + location + '&floor=' + floor + '&session_id=' + session_id,function(r) {
		callback(eval('('+r.responseText+')'));
	});
}
/**
 * This function registers a new user with the server.
 * @param handle String User name to use.
 * @param password String Password to use. TODO: SSL.
 * @param callback Function Function to call when we recieve a response.
 */
Database.addUser = function(handle,password,callback) {
	ajaxWithCallback('database.php?cmd=addUser&handle=' + handle + '&password=' + password,function(r) {
		callback(eval('('+r.responseText+')'));
	});
}
