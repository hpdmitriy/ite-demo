'use strict';
import $ from 'jquery';
import typeText from '../../../blocks/common.blocks/sections/__title/section_title';


function showMenu() {
	$('.progressjs-container').fadeOut(300);
	$('.header-page').slideDown(300, function () {
		let catNav = document.querySelector('.nav_category');
		if(catNav) {
			setTimeout(function () {
				$(catNav).animate({
					opacity: 1
				}, {
					duration: 400,
					specialEasing: {
						opacity: 'linear'
					},
					complete: function () {
						typeText();
					}
				});
			},1500)

		}
		else {
			typeText();
		}
	})
}

export function pageAnimation() {
	console.log('showMenu');
	setTimeout(function () {
		showMenu();
	},50);

	//typeText();
}





















