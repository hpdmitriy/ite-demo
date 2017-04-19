'use strict';
import $ from 'jquery';
const svgSymbols = require('svg4everybody/dist/svg4everybody.js');
import fancyBox from './modules/fancybox';
import sliders from '../blocks/common.blocks/slider/slider';
import ExpandNav from '../blocks/common.blocks/menu/_main/menu_main';
import SendForms from '../blocks/common.blocks/form/form';
import NeuralMesh from '../blocks/common.blocks/page/__decor/neural_mesh';


const expNav = new ExpandNav({
	elem: {
		contayner: document.body,
		menuclass: 'menu_touch',
		openbtn: 'button_menu-open',
		closebtn: 'button_menu-close',
		openCls: 'menu_open'
	}
});

const sendForm = new SendForms('form');
sendForm.init();
expNav.init();
fancyBox();
sliders();
svgSymbols();

window.NeuralMesh = NeuralMesh;






//import CBPFWTabs from '../blocks/common.blocks/tabs/tabs';

// [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
// 	const tabs = new CBPFWTabs(el, {start: 1});
// 	tabs.init();
// });

// require('./helpers/');
//
// if (process.env.NODE_ENV !== 'production') {
// 	console.log('fd324234')
// }


//import pixLayout from './helpers';
//pixLayout();
//import svgSymbols from './modules/svg4everybody';
// import burgerNavigation from '../blocks/touch.blocks/menu/_burger/menu_burger';
//const svgSymbols = require('!exports?svg4everybody!svg4everybody/lib/svg4everybody.js');

// burgerNavigation();













/*import typeText from '../blocks/common.blocks/sections/__title/section_title';
typeText();*/

import violaNav from '../blocks/common.blocks/menu/_category/menu_category';
violaNav();




// import highlightsPoligons from '../blocks/common.blocks/page/__decor/page__decor';
// highlightsPoligons();


import tSpanWrap from '../blocks/common.blocks/captions/captions';
function addFontSize() {
	let winWidth = document.documentElement.clientWidth;
	let winHeight = document.documentElement.clientHeight;
	document.body.style.fontSize = (winWidth + winHeight)/115+'px';
	document.getElementById('Page').style.height = winHeight+'px';
	if(document.querySelector('.page__decor')) {
		document.querySelector('.page__decor').style.height = winHeight+'px'
	}
}

window.addEventListener('load', function(){tSpanWrap(60,120,180,'spr')}, true);
window.addEventListener('load', addFontSize, true);
window.addEventListener('resize', function(){tSpanWrap(60,120,180,'spr')}, true);
window.addEventListener('resize', addFontSize, true);


// window.onscroll = function () {
// 	require.ensure([], function (require) {
// 		require('../blocks/common.blocks/header/index');
// 	}, 'stuck');
// };
//
// window.onload = function () {
// 	require.ensure([], function (require) {
// 		require('../blocks/common.blocks/shop-elements/model/slider/slider');
// 	}, 'model-gallery');
// };


//require('./modules/cart');
/* let footerNav = new ShowModels({
 elem: {
 contayner: 'js-drop-down',
 button: 'js-show-models',
 popup: 'js-drop-down-box',
 active: 'active',
 events: ['slideDown', 'slideUp']
 }
 }); */

/* window.onscroll = function() {
 require.ensure([], function(require) {
 require('./header');
 },'stuck');
 }; */




function highLightNav (){
	let pathName = window.location.pathname;
	let navItems = document.querySelectorAll('.menu_touch__links .link');
	for (let i = 0; i < navItems.length; i++) {
		let itemHref = navItems[i].getAttribute('href');
		if (~pathName.indexOf(itemHref)) {
			navItems[i].classList.add('current');
		} else if(~['/development.html', '/support.html', '/seo.html'].indexOf(pathName)) {
			document.querySelector('.menu_touch__links .link[href="/development.html"]').classList.add('current');
		}
	}
}
document.addEventListener("DOMContentLoaded", highLightNav);


$(function () {






	// $('#callbackFormPrevSubmit').on('click', function () {
	// 	$('#callbackFormSubmit').trigger('click')
	// });





	// class WinActionsEventser {
	//
	// 	constructor({featSelector, eventRezStart, featText}) {
	// 		this.featSelector = featSelector;
	// 		this.eventRezStart = eventRezStart;
	// 		this.featText = featText
	// 	}
	//
	// 	addFeatureClass() {
	// 		$(this.featSelector)
	// 			.addClass('nocurrent');
	// 		$(this)
	// 			.removeClass('nocurrent')
	// 			.addClass('curent');
	// 		$(this)
	// 			.next(this.featText)
	// 			.show(300);
	// 	}
	// }
	//
	// let newEwents = new WinActionsEventser({
	// 	featSelector: '.feature__title',
	// 	eventRezStart: 767,
	// 	featText: '.feature__info'
	// });
});

