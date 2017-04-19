'use strict';
import $ from 'jquery';
import 'typed.js/js/typed.js';

function getPolylineLength(polylineElement) {
	function dis(p, q) {
		return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
	}

	var ps = polylineElement.points, n = ps.numberOfItems, len = 0;
	for (var i = 1; i < n; i++) {
		len += dis(ps.getItem(i - 1), ps.getItem(i));
	}
	return len;
}


function showPromoText() {
	if (document.getElementById('spr')) {
		$('#spr > text > tspan:eq(0)')
			.css('visibility','visible')
			.animate({
				opacity: 1
			}, {
				duration: 700,
				specialEasing: {
					opacity: 'linear'
				},
				complete: function () {
					$('#spr > text > tspan:eq(1)')
						.css('visibility','visible')
						.animate({
							opacity: 1
						}, {
							duration: 700,
							specialEasing: {
								opacity: 'linear'
							},
							complete: function () {
								$('#spr > text > tspan:eq(2)')
									.css('visibility','visible')
									.animate({
										opacity: 1
									}, {
										duration: 700,
										specialEasing: {
											opacity: 'linear'
										},
										complete: function () {
											showPolyline(showTools, 3100);
										}
									})
							}
						})
				}
			})
	} else {
		showPolyline(showTools, 3100);
	}


}

function showPolyline(callback, delay) {
	$('.section__title_stroke polyline').fadeIn(100, function () {
		setTimeout(callback, delay);
	})
}

function showSliderTitle() {
	$('.slider__title')
		.animate({
			opacity: 1
		}, {
			duration: 500,
			specialEasing: {
				opacity: 'linear'
			},
			complete: function () {
				showSliderSlides();
			}
		})
}

function showSliderSlides() {

	$('.slider__slides')
		.animate({
			opacity: 1
		}, {
			duration: 500,
			specialEasing: {
				opacity: 'linear'
			},
			complete: function () {
				showFooter();
			}
		})
}

function showFooter() {
	$('.footer-page').animate({
		opacity: 1
	}, {
		duration: 500,
		specialEasing: {
			opacity: 'linear'
		},
		// complete: function () {
		// 	showFooter();
		// }
	})
}

function showContent() {
	$('.section__data').animate({
		opacity: 1
	}, {
		duration: 500,
		specialEasing: {
			opacity: 'linear'
		},
		complete: function () {
			if (document.querySelector('.slider__slides')) {
				showSliderSlides()
			} else {
				showFooter();
			}

		}
	})
}

function showPortfolio() {
	$('.section_portfolio').animate({
		opacity: 1
	}, {
		duration: 500,
		specialEasing: {
			opacity: 'linear'
		},
		complete: function () {
				showFooter();

		}
	})
}
function showMap() {
	$('#map').animate({
		opacity: 0.4
	}, {
		duration: 1100,
		specialEasing: {
			opacity: 'linear'
		},
		complete: function () {
			showMapInfo();
		}
	})
}

function showMapInfo() {
	$('.section__title_map').animate({
		opacity: 1
	}, {
		duration: 500,
		specialEasing: {
			opacity: 'linear'
		},
		complete: function () {
			showPolyline(showFooter, 3100);
		}
	})
}

function showTools() {
	if (document.querySelector('.section__tools')) {
		$('.section__tools .tools').animate({
			opacity: 1
		}, {
			duration: 700,
			specialEasing: {
				opacity: 'linear'
			},
			complete: function () {
				showSliderTitle();
			}
		});
	} else {
		showContent();
	}

}


export default function typeText(elem = '.caption_page', speed = 20) {
	//let polyLine = document.querySelector('.section__title_stroke polyline');
	//console.log(getPolylineLength(polyLine));

	let typeTextBlock = document.querySelector(elem);

	if(typeTextBlock) {
		let text = typeTextBlock.innerHTML;
		typeTextBlock.innerHTML = '';
		typeTextBlock.style.opacity = 1;
		$(function () {
			$(elem).typed({
				strings: [text],
				typeSpeed: speed,
				contentType: 'html',
				showCursor: false,
				startDelay: 1400,
				onStringTyped: function () {
					showPromoText();

				}
			});
		});
	} else if (document.getElementById('map')) {
		setTimeout(showMap,1100);
	} else {
		setTimeout(showPortfolio,1100);
	}
}
