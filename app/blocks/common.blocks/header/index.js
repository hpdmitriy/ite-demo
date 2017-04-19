'use strict';
import $ from 'jquery';
require('waypoints/lib/jquery.waypoints.js');
require('waypoints/src/shortcuts/sticky.js');


let sticky = new Waypoint.Sticky({
	element: $('.nav_section-top')[0],
	offset: 0 /*- $('.nav_section-top').height() + 40*/
});
export {sticky};

