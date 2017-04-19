'use strict';
import ClassSwitcher from '../../../../scripts/helpers/classie';
let classie = new ClassSwitcher();
export default function violaNav () {
	[].slice.call(document.querySelectorAll('.menu_category')).forEach(function(menu) {
		let menuItems = menu.querySelectorAll('.menu_category__link'),
			setCurrent = function(ev) {
				ev.preventDefault();

				let item = ev.target.parentNode;
				let link = ev.target.getAttribute('href');

				if( classie.hasClass(item, 'menu_category__item_current') ) {
					return false;
				}
				classie.removeClass(menu.querySelector('.menu_category__item_current'), 'menu_category__item_current');
				classie.addClass(item, 'menu_category__item_current');
				setTimeout(function () {
					window.location.href = link;
				},300)
			};

		[].slice.call(menuItems).forEach(function(el) {
			el.addEventListener('click', setCurrent);
		});
	});
}


