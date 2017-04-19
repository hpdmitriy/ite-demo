'use strict';

export default class ClassSwitcher {
	constructor(elem) {
		this.elem = elem || null;
		this.checkCls = 'classList' in document.documentElement;
		//this.addClass();
	}

	classReg(className) {
		return new RegExp(`(^|\\s+)${className}(\\s+|$)`);
	}

	hasClass(elem, cls) {
		return (this.checkCls) ? elem.classList.contains(cls) : this.classReg(cls).test(elem.className);

	}

	addClass(elem, cls) {
		if (this.checkCls) {
			elem.classList.add(cls);
		}else if (!this.hasClass(elem, cls)) {
			elem.className = `${elem.className} ${cls}`;
		}
	}

	removeClass(elem, cls) {
		if (this.checkCls) {
			elem.classList.remove(cls);
		}else {
			elem.className = elem.className.replace(this.classReg(cls), ' ');
		}
	}

	toggleClass(elem, c) {
		const fn = this.hasClass(elem, c) ? this.removeClass : this.addClass;
		fn(elem, c);
	}
}
