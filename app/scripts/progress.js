"use strict";
require('progress/src/ite-loader.css');
const {progressJs} = require('progress/src/progress.js');
const {pageAnimation} = require('./modules/pageanimation/pageanimation');
let endDelay = 4000;
let loc = window.location.pathname;

function startLoader() {
	progressJs().setOptions({
		overlayMode: true,
		theme: 'blueOverlay'
	})
		.onbeforestart(function () {
			console.log('start');
			document.body.classList.add('loading');

		})
		.onbeforeend(function () {
			
			console.log('end')
		})
		.start()
		.autoIncrease(5, 100)
		.onprogress(function (targetElm, percent) {
			//console.log("progress changed to:" + percent);
			if (percent > 95) {
				document.querySelector('.progressjs-inner').classList.add('l100pr');
				document.querySelector('.progressjs-container').classList.add('l100pr');
			}
		})
}

function endLoader() {
	setTimeout(function () {
		// 	progressJs()
		// 		.onbeforeend(function () {
		// 			document.body.classList.remove('loading');
		// 			console.log('end')
		// 		})

		progressJs()
			.onbeforeend(function () {
				console.log('end');
				document.body.classList.remove('loading');
				//document.querySelector('.progressjs-inner').classList.add('l100pr');
				pageAnimation();
			}).end();
	}, endDelay);
}



setTimeout(function () {
	if (loc === '/' || loc === '/index.html' || loc === '/index.php') {
		startLoader();
		endLoader();
	} else {
		pageAnimation();
	}








	/*
	 if (window.attachEvent) {
	 window.attachEvent('onload', function () {
	 endLoader()
	 });
	 } else {
	 if (window.onload) {
	 let currOnLoad = window.onload;
	 let newOnLoad = function () {
	 currOnLoad();
	 endLoader()
	 };
	 window.onload = newOnLoad;
	 } else {
	 window.onload = function () {
	 endLoader()
	 };
	 }
	 }
	 */

}, 100);



/*
 setTimeout(function () {
 progressJs().setOptions({overlayMode: true, theme: 'blueOverlay'})
 .start()
 .autoIncrease(1, 200);

 if(window.attachEvent) {
 window.attachEvent('onload', function(){ progressJs().end(); });
 } else {
 if(window.onload) {
 var curronload = window.onload;
 var newonload = function() {
 curronload();
 progressJs().end();
 };
 window.onload = newonload;
 } else {
 window.onload = function(){ progressJs().end(); };
 }
 }
 },0);*/
