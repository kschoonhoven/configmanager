'use strict';

/*
 * The ConfigerTabs service provides a list of the tabs in the configer.
 * Each Tab consists of an id, name, url and status.
 * 
 * id - identifier used to identify tab in code
 * name - used as the tab name and resource list header
 * resourceType - the data type of the resource. Used for uploads
 * url - the MVC url of the resource as in /views/<url>/. Used to retrieve
 * 		 form.html partial and show.html partial for each resource. The url
 * 		 will display in the address bar of the browser.
 * status - specifies whether or not the tab is selected. Provides the class
 */
configmanagerServices.factory('ConfigerTabs',
	function(){
		var current = null;
		var tabs = [
			{
				id : "screen1",
				name : "Screen1",
				url : "screen1"
			},
			{
				id : "screen2",
				name : "Screen2",
				url : "screen2"
			},
			{
				id : "userconf",
				name : "User Configuration",
				url : "userconfiguration"
			},
			{
				id : "screen3",
				name : "Screen3",
				url : "screen3"
			},
			{
				id : "screen4",
				name : "Screen4",
				url : "screen4"
			},
			{
				id : "screen5",
				name : "Screen5",
				url : "screen5"
			}
		];
		return {
			tabs: function() {
				return tabs;
			},
			getCurrent : function() {
				return current;
			},
			setCurrent : function(tab) {
				if (current != null) {
					current.status = null;
				}
				
				tab.status = "active";
				current = tab;
			}
		};
	});
