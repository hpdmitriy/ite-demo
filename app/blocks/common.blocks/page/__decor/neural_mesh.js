'use strict';
import $ from 'jquery';
export default class NeuralMesh {
	constructor({options}) {
		this.canvas = 'neuralMeshLoader';
		this.svgPath = '/images/template/neural_mesh.svg';
		this.polygonFill = options.polygonFill || '#ffffff';
		this.polygonTransparent = options.polygonOpacity || 0.6;
		this.polygonsList = options.polygonsList || [];
		this.polygonsLength = this.polygonsList.length;
		this.highLightDelay = options.highLight || 500;
		this.dimLightDelay = options.dimLight || 300;
		this.timeVisibility = options.timeVisibility || 500;
		this.glowingPolygon = 0;
		this.fadingPolygon = 0;
		this.startDelay = 10
	}

	loadSvg() {
		let xhr = new XMLHttpRequest();

		xhr.open('GET', this.svgPath, true);
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				try {
					let svgData = xhr.responseText;
					this.showSvg(svgData);
				} catch (e) {
					console.log("Некорректный ответ " + e.message);
				}
			}
		}
	}

	showSvg(svgData) {
		let canvas = document.getElementById(this.canvas);
		canvas.innerHTML += svgData;
		setTimeout(() => {
			this.highLight(this.glowingPolygon)
		}, this.startDelay);
	}

	showCanvasSvg(svgData) {
		let canvas = document.getElementById(this.canvas);
		let ctx = canvas.getContext('2d');
		let data = svgData;
		let DOMURL = window.URL || window.webkitURL || window;
		let img = new Image();
		let svg = new Blob([data], {type: 'image/svg+xml'});
		let url = DOMURL.createObjectURL(svg);

		img.onload = function () {
			ctx.drawImage(img, 0, 0);
			DOMURL.revokeObjectURL(url);
		};
		img.src = url;
	}

	animateElement({timing, draw, duration}) {
		let start = performance.now();

		requestAnimationFrame(function animate(time) {
			// timeFraction goes from 0 to 1
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			// calculate the current animation state
			let progress = timing(timeFraction);

			draw(progress); // draw it

			if (timeFraction < 1) {
				console.log(time);
				requestAnimationFrame(animate);
			}

		});
	}

	getPoligonData(num) {
		let polygonData = this.polygonsList[num];
		let polygonId = Object.keys(polygonData)[0];

		return {
			id: polygonId,
			glowingDelay: polygonData[polygonId][0],
			fadeingDelay: polygonData[polygonId][1],
			fillColor: polygonData[polygonId][2],
			opacityLimit: polygonData[polygonId][3],
			timeVisibility: polygonData[polygonId][4]
		}

	}
	highLight(elem = 0, stop = false) {
		let that = this;
		that.glowingPolygon = (that.glowingPolygon < 0 ) ? 0 : elem;
		try {
			let getPoligon = that.getPoligonData(that.glowingPolygon);
			let getNexPoligon = that.glowingPolygon < that.polygonsLength - 1 ? that.glowingPolygon + 1 : 0;
			let poligon = document.getElementById(getPoligon.id);
			let limit = getPoligon.opacityLimit ? getPoligon.opacityLimit : that.polygonTransparent;
			let currentPoligonDelay = getPoligon.glowingDelay ? getPoligon.glowingDelay : that.highLightDelay;
			let nextPoligonDelay = getNexPoligon.glowingDelay ? getNexPoligon.glowingDelay : that.highLightDelay;
			poligon.style.fill = getPoligon.fillColor ? getPoligon.fillColor : that.polygonFill;
			$(poligon).animate({
						opacity: limit
					},{
						duration: currentPoligonDelay,
						step: function (now, fx) {
							if(fx.pos == 1) {
								//that.highLight(getNexPoligon);
							}
						},
						complete: function () {
							that.dimLight(that.glowingPolygon);
							that.highLight(getNexPoligon);
						}
					}
			);

			/*that.animateElement({
			 duration: currentPoligonDelay,
			 timing: (timeFraction) => {
			 return timeFraction;
			 },
			 draw: (progress) => {
			 poligon.style.opacity = progress - (1 - limit);

			 if (currentPoligonDelay <= nextPoligonDelay) {
			 if(progress == 1) {
			 that.dimLight(elem,false);
			 //that.highLight(getNexPoligon,false)
			 }
			 } else {
			 // 	if(Math.round(progress * 10) / 10 >= Math.round(nextPoligonDelay/currentPoligonDelay)) {
			 // 		that.highLight(getNexPoligon,false)
			 // 	}
			 // 	if(progress == 1) {
			 // 		that.dimLight(elem,false);
			 // 	}
			 }
			 }
			 });*/
		} catch (e) {
			console.log(`Error:  ${e.message},\n Stack: ${e.stack}`);
		}
	}

	dimLight(elem = 0, stop = false) {
		let that = this;
		that.fadeingPolygon = (that.fadeingPolygon < 0 ) ? 0 : elem;
		try {
			let getPoligon = that.getPoligonData(that.fadeingPolygon);
			let getNexPoligon = that.fadeingPolygon < that.polygonsLength - 1 ? that.fadeingPolygon + 1 : 0;
			let poligon = document.getElementById(getPoligon.id);
			let currentPoligonDelay = getPoligon.glowingDelay ? getPoligon.glowingDelay : that.highLightDelay;
			let timeVisibility = getNexPoligon.timeVisibility ? getNexPoligon.timeVisibility : that.timeVisibility;

			$(poligon).delay(timeVisibility).animate({
					opacity: 0
				},{
					duration: currentPoligonDelay,
					step: function (now, fx) {
					},
					complete: function () {
					}
				}
			);
/*			this.animateElement({
				duration: currentPoligonDelay,
				timing: (timeFraction) => {
					return (timeFraction < limit) ? timeFraction : limit;
				},
				draw: (progress) => {
					poligon.style.opacity = limit - progress;
					// if (currentPoligonDelay <= nextPoligonDelay) {
					if (progress == 1) {
						//that.dimLight(elem,false);
						that.highLight(getNexPoligon, false)
					}
					// } else {
					// 	if(Math.round(progress * 10) / 10 >= Math.round(nextPoligonDelay/currentPoligonDelay)) {
					// 		that.highLight(getNexPoligon,false)
					// 	}
					// 	if(progress == 1) {
					// 		that.dimLight(elem,false);
					// 	}
					// }
				}
			});*/
		} catch (e) {
			console.log(`Error:  ${e.message},\n Stack: ${e.stack}`);
		}
	}

	restart(){
		this.glowingPolygon = -1;
		//console.log('change'+ this.glowingPolygon)
	}

	init(delay) {
		this.startDelay = delay;
		this.loadSvg();
	}
}

















