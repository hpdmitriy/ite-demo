"use strict";

export default  function tSpanWrap (y1,y2,y3,el) {
	let tSpans = document.querySelectorAll('#'+ el +' text > tspan');
	if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
		for(let i = 0; i < tSpans.length; i++) {
			tSpans[i].setAttribute('x',0);
			if (window.innerWidth < 768) {
				tSpans[i].setAttribute('dy',(i+1)+'em');
			} else {
				tSpans[i].setAttribute('dy',((i+1)*1.3)+'em');
			}
			//tSpans[i].setAttribute('y',arguments[i]);
			tSpans[i].setAttribute('y',0);
		}
	} else {
		for(let i = 0; i < tSpans.length; i++) {
			tSpans[i].removeAttribute('x');
			tSpans[i].removeAttribute('y');
			tSpans[i].removeAttribute('dy');
		}
	}
}



