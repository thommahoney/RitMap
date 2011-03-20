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
 * This flag gets switched by the native app.
 */
isNativeApp = false;


function preload() {
	var p = new Preloader();
	
	ajaxWithCallback("manifest.php",function(r) {
		var lines = r.responseText.split("\n");
		for(var x=1;x<lines.length;x++) {
			p.load(lines[x],"image");
		}
	});
	
	
}

/**
 * This class takes the manifest and preloads all of the assets so there isn't
 * any network lag or problems if the network drops off while the app is running. 
 */
function Preloader() {
	this.preloadedItems = 0;
	this.loadedItems = 0;
	this.doneRequesting = false;
	this.isDone = false;
	this.registerMode = false;
	
	this.drawLogin();
	
}
Preloader.prototype.drawLogin = function () {
	this.element = document.createElement("div");
	this.element.className = "preloader";
	
	this.splash = document.createElement("div");
	this.splash.className = "preloader_splash";
	this.splash.innerHTML = "RIT Map";
	
	this.fail = document.createElement("div");
	this.fail.className = "preloader_loginfailure";
	this.fail.innerHTML = "";
	
	this.userLoginLabel = document.createElement("div");
	this.userLoginLabel.className = "preloader_userloginlabel";
	this.userLoginLabel.innerHTML = "User Name";
	
	this.passwordLoginLabel = document.createElement("div");
	this.passwordLoginLabel.className = "preloader_passwordloginlabel";
	this.passwordLoginLabel.innerHTML = "Password";
	
	this.repeatLabel = document.createElement("div");
	this.repeatLabel.className = "preloader_passwordloginlabel";
	this.repeatLabel.innerHTML = "Re-type Password";
	this.repeatLabel.style.visibility = "hidden";
	
	this.username = document.createElement("input");
	this.username.setAttribute("type","text");
	this.username.className = "preloader_username";
	
	this.password = document.createElement("input");
	this.password.setAttribute("type","password");
	this.password.className = "preloader_password";
	
	this.passwordRepeat = document.createElement("input");
	this.passwordRepeat.setAttribute("type","password");
	this.passwordRepeat.className = "preloader_password";
	this.passwordRepeat.style.visibility = "hidden";
	
	this.submit = document.createElement("input");
	this.submit.setAttribute("type","button");
	this.submit.className = "preloader_submit";
	this.submit.value = "Log In";
	this.register = document.createElement("input");
	this.register.setAttribute("type","button");
	this.register.className = "preloader_submit";
	this.register.value = "Register";
	
	this.loadbarlabel = document.createElement("div");
	this.loadbarlabel.className = "preloader_loadbarlabel";
	this.loadbarlabel.innerHTML = "Loading...";
	this.loadbar = document.createElement("div");
	this.loadbar.className = "preloader_loadbar";
	this.progress = document.createElement("div");
	this.progress.className = "preloader_progress";
	
	this.element.appendChild(this.splash);
	this.element.appendChild(this.fail);
	this.element.appendChild(this.userLoginLabel);
	this.element.appendChild(this.username);
	this.element.appendChild(this.passwordLoginLabel);
	this.element.appendChild(this.password);
	this.element.appendChild(this.repeatLabel);
	this.element.appendChild(this.passwordRepeat);
	this.element.appendChild(this.submit);
	this.element.appendChild(this.register);
	
	this.element.appendChild(this.loadbarlabel);
	this.element.appendChild(this.loadbar);
	this.loadbar.appendChild(this.progress);
	
	var t = this;
	this.submit.onclick = function() {
		t.submit.disabled = true;
		t.username.disabled = true;
		t.password.disabled = true;
		t.submit.value = "Checking...";
		t.fail.innerHTML = "";
		
		if(t.registerMode) {
			if(t.password.value != t.passwordRepeat.value) {
				t.submit.disabled = false;
				t.username.disabled = false;
				t.password.disabled = false;
				t.submit.value = "Log In";
				t.fail.innerHTML = "Passwords don't match.";
			} else if(t.username.value=="") {
				t.submit.disabled = false;
				t.username.disabled = false;
				t.password.disabled = false;
				t.submit.value = "Log In";
				t.fail.innerHTML = "User Name can't be blank.";
			} else {
				ajaxWithCallback("database.php?cmd=addUser&handle="+t.username.value+"&password="+t.password.value,function(result) {
					t.submit.disabled = false;
					t.username.disabled = false;
					t.password.disabled = false;
					t.submit.value = "Log In";
				
					var r = result.responseText;
					if(r=="\"error\"") {
						t.fail.innerHTML = "Sorry, this handle is taken already.";
					} else {
						userName = t.username.value;
						userSessionId = eval('('+r+')');
						t.loginComplete();
					}
				});
			}
		} else {
			ajaxWithCallback("database.php?cmd=login&handle="+t.username.value+"&password="+t.password.value,function(result) {
				var r = result.responseText;
			
				t.submit.disabled = false;
				t.username.disabled = false;
				t.password.disabled = false;
				t.submit.value = "Log In";
			
				if(r=="" || r=="\"error\"") {
					t.fail.innerHTML = "Sorry, couldn't authenticate you.";
				} else {
					userSessionId = eval('('+r+')');
					userName = t.username.value;
					t.loginComplete();
				}
			});
		}
		//t.loginComplete();
	}
	this.register.onclick = function() {
		t.repeatLabel.style.visibility = "visible";
		t.passwordRepeat.style.visibility = "visible";
		t.element.removeChild(t.register);
		t.submit.style.width = "95%";
		t.registerMode = true;
	}
	
	document.body.appendChild(this.element);
}
Preloader.prototype.load = function(url,type) {
	this.preloadedItems++;
	var t = this;
	
	var element = false;
	if(type=="image") {
		element = new Image();
		element.src=url;
		element.style.visibility = "hidden";
		element.style.position = "absolute";
		element.style.top = "0";
		element.style.left = "0";
	} else if(type=="script") {
		element = document.createElement("script");
		element.src = url;
	}
	element.onload = function() {
		t.loadedItems++;
		var p = ((t.loadedItems/(t.preloadedItems-1))*100);
		//console.log(url+" loaded");
		t.progress.style.width = p+"%";
		if(t.loadedItems >= t.preloadedItems-1) {
			t.loadbarlabel.innerHTML = "Loaded.";
		}
		if(t.doneRequesting && t.loadedItems >= t.preloadedItems-1) {
			t.cleanupAndInit();
		}
	}
	document.body.appendChild(element);
	

}
Preloader.prototype.loginComplete = function() {
	this.load("cscript.js","script");
	this.doneRequesting = true;
	this.isDone = true;
}
Preloader.prototype.cleanupAndInit = function() {
	document.body.removeChild(this.element);
	init();
}
function getAjaxReference() {
	var xml = false;
	try { xml = new XMLHttpRequest(); } catch(e) {
    try { xml = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
    try { xml = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}}}
    
    return xml;
}
function ajaxWithCallback(url,callback) {
	var xml = getAjaxReference();
	
	xml.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			callback(this);
		}
	}
	xml.open("GET",url,true);
	xml.send(null);
}
function ajaxPostWithCallback(url,params,callback) {
	var xml = getAjaxReference();
	xml.open("POST",url,true);
	//Build request string based on object
	var paramString = "";
	for(key in params) {
		var data = this.escapePostString(""+params[key]);
		paramString += key + "=" + data + "&";
	}
	paramString = paramString.substring(0,paramString.length-1);
	xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xml.setRequestHeader("Content-length",paramString.length);
	xml.setRequestHeader("Connection","close");
	
	//console.log(paramString);
	
	xml.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			callback(this);
		}
	}
	
	xml.send(paramString);
}
function escapePostString(str) {
	return str.replace(/&/g, '%26').replace(/\+/g, '%2B').replace(/ /g, '+');
	//return str.replace(/&/g, '&amp;').replace(/=/g,'&#61;');
}
