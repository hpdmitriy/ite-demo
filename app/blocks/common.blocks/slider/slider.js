import 'owl.carousel/dist/assets/owl.carousel.css';
import 'imports?jQuery=jquery!owl.carousel';



export default function sliders() {

	$('.slider__slides .owl-carousel').owlCarousel({
		margin: 10,
		autoHeight: false,
		lazyLoad: true,
		autoplay:true,
		autoplayTimeout:10000,
		autoplayHoverPause:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		dots: false,
		loop:true,
		nav:true,
		navText: ['<i class="slider__left" aria-hidden="true"></i>','<i class="slider__right" aria-hidden="true"></i>'],
		responsiveClass:true,
		responsive:{
			0:{
				items:3,
				nav:true,
				//margin: 30
			},
			460:{
				items:4,
				nav:true,
				//margin: 30
			},
			768:{
				items:4,
				nav:true,
				//margin: 50
			},
			992:{
				items:5,
				nav:true,
			},
			1200:{
				items:6,
				nav:true,
			},

		}
	});


	$('.portfolio__slider .owl-carousel').owlCarousel({
		margin: 0,
		//autoHeight: true,
		// center:true,
		//autoWidth:true,
		lazyLoad: true,
		lazyContent: true,
		autoplay:true,
		autoplayTimeout:1000000,
		autoplayHoverPause:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		dots: false,
		loop:false,
		rewind:true,
		nav:true,
		navText: ['<i class="slider__left" aria-hidden="true"></i>','<i class="slider__right" aria-hidden="true"></i>'],
		items: 1,
		URLhashListener:true,
		startPosition: 'URLHash',
		onTranslate: changeBg,
		responsive: {
			0: {
				items: 1,
				nav: true,
				margin: 0
			},
			2000: {
				items: 1,
				nav: true,
				margin: 0
			}
		}
	});
}

function changeBg(event) {
	let current = document.querySelectorAll('.portfolio__slider .portfolio__slide');
	let item  = current[event.item.index];
	let bodyId = item.getAttribute('data-hash');
	document.body.setAttribute('id',bodyId);
}
