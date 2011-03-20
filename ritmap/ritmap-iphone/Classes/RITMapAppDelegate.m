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
#import "RITMapAppDelegate.h"
#import "WiFi/NetworkScanner.h"
#import "WiFi/WFNetwork.h"
#import <UIKit/UIWebView.h>

@implementation RITMapAppDelegate

@synthesize window;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    
	NSURL *url = [NSURL URLWithString:@"http://people.rit.edu/~mpp5078/iphone/map/"];
	//NSURL *url = [NSURL URLWithString:@"http://192.168.1.112/iphone/recorder/"];
	NSURLRequest *request = [NSURLRequest requestWithURL: url];
	[webview loadRequest:request];
	[webview setBackgroundColor:[UIColor blackColor]];
	webview.delegate = self;
	[UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleBlackTranslucent;
	
	isScanning = YES;
	
	nscan = [[NetworkScanner alloc] init];
    [window makeKeyAndVisible];
	//NSLog(@"Attempting to scan...");
	//timer = [NSTimer scheduledTimerWithTimeInterval:10.0f target:self selector:@selector(threadScan) userInfo:nil repeats:YES];
	//[self scan];
}
-(void)startScanning {
	NSLog(@"Starting scanning...");
	isScanning = YES;
	timer = [NSTimer scheduledTimerWithTimeInterval:5.0f target:self selector:@selector(scan) userInfo:nil repeats:NO];
}
-(void)endScanning {
	isScanning = NO;
}
-(void)webViewDidFinishLoad:(UIWebView *)webview {
	[webview stringByEvaluatingJavaScriptFromString:@"isNativeApp=true"];
}
-(void)threadScan {
	//This simple creates a background thread to run scan without blocking the application.
	//For some reason, this causes HUGE problems.
	//[self performSelectorInBackground:@selector(scan) withObject:nil];
}
-(void)scan {
	//NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
	if(webview.loading == NO && [nscan scanning] == 0 && scanning==NO) {
		NSLog(@"Scanning...");
		scanning = YES;
		//NSLog(@"Trying to send JavaScript Start...");
		[webview stringByEvaluatingJavaScriptFromString:@"wifi.startList();"];
		NSLog(@"Sent JavaScript Start...");
		[nscan scan];
		//NSLog(@"Scanned...");
		NSMutableArray *signals = [nscan networks];
		//NSLog(@"Got network...");
		for(int x=0;x<signals.count;x++) {
			NSDictionary *wf = [signals objectAtIndex:x];
			if([wf ssid_name] && [wf channel] && [wf bssid] && [wf rssi] && [[wf ssid_name] isEqualToString:@"rit"]) {
				NSString *ssid = [wf ssid_name];
				NSString *channel = [NSString stringWithFormat:@"%d",[wf channel]];
				NSString *mac = [wf bssid];
				NSString *strength = [NSString stringWithFormat:@"%d",[wf rssi]];

				NSString *command = @"wifi.addAccessPoint(\"";
				command = [command stringByAppendingString:mac];
				command = [command stringByAppendingString:@"\",\""];
				command = [command stringByAppendingString:strength];
				command = [command stringByAppendingString:@"\",\""];
				command = [command stringByAppendingString:ssid];
				command = [command stringByAppendingString:@"\",\""];
				command = [command stringByAppendingString:channel];
				command = [command stringByAppendingString:@"\");"];
				[webview stringByEvaluatingJavaScriptFromString:command];
			}
			//NSLog(@"Executed addAccessPoint...");
		}
		[webview stringByEvaluatingJavaScriptFromString:@"wifi.endList();"];
		NSLog(@"Done...");
		scanning = NO;
		

	} else {
		NSLog(@"View not loaded, or scanning not done yet.");
	}
	if(isScanning) {
		timer = [NSTimer scheduledTimerWithTimeInterval:5.0f target:self selector:@selector(scan) userInfo:nil repeats:NO];
	}
	//[pool release];
}
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
	if([[[request URL] scheme] isEqualToString: @"wadfip-scheme"])  {
		// see https://devforums.apple.com/message/2222#2222
		// see http://code.google.com/p/big5/source/browse/trunk/common/big5ViewController.m
		NSString *myURL = [[[request URL] absoluteString] substringFromIndex:16];
		NSArray *myData = [myURL componentsSeparatedByString:@":"];
		NSLog(@"The first item of NSArray myData is %@",[myData objectAtIndex:0] );
		if([[myData objectAtIndex:0] isEqualToString:@"scanon"]) {
			[self startScanning];
		} else if([[myData objectAtIndex:0] isEqualToString:@"scanoff"]) {
			[self endScanning];
		}
		return NO; // don't redirect!
	}else { 
		return YES; // it must be http, go ahead and load the page
	}
	
}
- (void)dealloc {
    [window release];
	[nscan release];
	[timer release];
    [super dealloc];
}


@end
