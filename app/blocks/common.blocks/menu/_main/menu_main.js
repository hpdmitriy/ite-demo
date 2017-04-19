'use strict';
import ClassSwitcher from '../../../../scripts/helpers/classie';
const csw = new ClassSwitcher();


export default class ExpandNav {
	constructor({elem}) {
		this.bodyEl = elem.contayner || document.body;
		this.menuEl = elem.menuclass || 'menu_touch';
		this.openbtn = elem.openbtn || 'button_menu-open';
		this.closebtn = elem.closebtn || 'button_menu-close';
		this.openCls = elem.openCls || 'menu_open';
		this.isOpen = false;
		this.current = 0;
	}

	init() {
		this.menus = [].slice.call(this.bodyEl.querySelectorAll('.' + this.menuEl));
		this.openBtns = [].slice.call(this.bodyEl.querySelectorAll('.' + this.openbtn));
		//this.closeBtns = [].slice.call(this.bodyEl.querySelectorAll('.' + this.closebtn));
		this.showTrigger();
	}

	showTrigger() {
		const self = this;
		this.openBtns.forEach( (btn, idx) => {
			btn.addEventListener( 'click', ev => {
				ev.preventDefault();
				self.toggleMenu(idx);
			} );
		} );
	}
	toggleMenu(idx) {
		console.log(idx);
		if (!this.isOpen) {
			csw.addClass( this.menus[idx], this.openCls );
			csw.addClass( this.openBtns[idx], this.openCls );
			csw.addClass( this.bodyEl, this.openCls );
			this.isOpen = true;
		}else {
			csw.removeClass( this.menus[idx], this.openCls );
			csw.removeClass( this.openBtns[idx], this.openCls );
			csw.removeClass( this.bodyEl, this.openCls );
			this.isOpen = false;
		}
	}
}

