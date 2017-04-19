
	function extend( a, b ) {
		for ( const key in b ) {
			if ( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	export default class ITabs {
		constructor(el, options) {
			this.el = el;
			this.options = extend( {}, this.options );
			extend( this.options, options );
			this.init();
		}

		init() {
			this.tabs = [].slice.call( this.el.querySelectorAll( 'nav > ul > li' ) );
			this.items = [].slice.call( this.el.querySelectorAll( '.tabs__wrap > section' ) );
			this.current = -1;
			this.show();
			this.initEvents();
		}

		initEvents() {
			const self = this;
			this.tabs.forEach( (tab, idx) => {
				tab.addEventListener( 'click', ev => {
					ev.preventDefault();
					self.show( idx );
				} );
			} );
		}

		show(idx) {
			if ( this.current >= 0 ) {
				this.tabs[this.current].className = 'tabs__item';
				this.items[this.current].className = 'tabs__content';
			}
			this.current = ( typeof idx !== 'undefined' ) ? idx :
				this.options.start >= 0 && this.options.start < this.items.length ? this.options.start :
					0;
			this.tabs[this.current].className += ' tabs__item_current';
			this.items[this.current].className += ' tabs__content_current';
		}
	}

	ITabs.prototype.options = {
		start: 0
	};

