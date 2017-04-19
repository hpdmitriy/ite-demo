'use strict';
import $ from 'jquery';

import 'pixlayout/jquery.pixlayout';

export default function pixLayout() {
	let loc = window.location.href;
	let temp = loc.split('/').slice(-1).toString().split('_')[0];
	$.pixlayout({
		clip: true,
		src: (temp !== '') ? '/images/template/' + temp + '.jpg' : '/images/template/index.jpg',
		show: true,
		center: true,
		top: '0',
		left: 0,
		pervious: true,
		opacity: 0.2
	});
}
