'use strict';
const path = require('path');
const config = require('../config/config.json');
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const resolver = require('stylus').resolver;

const cssnano = require('gulp-cssnano');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const lost = require('lost');
const nib = require('nib');
const assets = require('postcss-assets');
const fontAwesome = require('postcss-font-awesome');
const pxToRem = require('postcss-pxtorem');
const animate = require('animate-styl');
const filter = require('gulp-filter');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


const lostOpt = {
	gutter: '30px',
	flexbox: 'no-flex',
	cycle: 'auto'
};
// const assetsOpt = {
// 	loadPaths: ['fonts/', 'media/patterns/', 'images/']
// };
const pxremOpt = {
	rootValue: 16,
	unitPrecision: 5,
	propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing'],
	selectorBlackList: [],
	replace: false,
	mediaQuery: false,
	minPixelValue: 0
};
const animateOpt = {
	all: true, // generate all classes by default, like pulling in the entire animate.css file
	base: true, // generates base .animated class
	attentionSeekers: true,
	bling: true,
	bomb: false,
	bouncingEntrances: false,
	bouncingExits: false,
	fadingEntrances: true,
	fadingExits: true,
	flippers: false,
	lightspeed: false,
	magic: false,
	math: false,
	perspective: false,
	rotate: false,
	rotatingEntrances: false,
	rotatingExits: false,
	slidingEntrances: true,
	slidingExits: true,
	specials: false,
	zoomingEntrances: false,
	zoomingExits: false
};


let paths = {
	src: path.join(config.root.src, config.tasks.styles.src),
	dest: path.join(config.root.dest, config.tasks.styles.dest)
};

let stylesTask = function () {

	let resolve = resolver();
	let manifest;
	// if (!isDevelopment) {
	// 	manifest = require('./manifest/assets.json');
	// }

	// function url(urlLiteral) {
	// 	urlLiteral = resolve.call(this, urlLiteral);
	// 	for (let asset in manifest) {
	// 		if (urlLiteral.val === `url("${asset}")`) {
	// 			urlLiteral.string = urlLiteral.val = `url("${manifest[asset]}")`;
	// 		}
	// 	}
	// 	return urlLiteral;
	// }
	//
	// url.options = resolve.options;
	// url.raw = true;


	return gulp.src(paths.src + '/*.styl'/*,{since: gulp.lastRun('styles')}*/)
		.pipe(filter(function (file) {
			return !/vendor\.styl/.test(file.basename);
		}))


		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Styles',
				message: err
			}))
		}))
		.pipe(gulpIf(isDevelopment, sourceMaps.init({loadMaps: true})))
		.pipe(stylus({
			import: [
				process.cwd() + '/tmp/styles/sprite-ico',
				process.cwd() + '/tmp/styles/inline-svg',
				process.cwd() + '/tmp/styles/sprite-picto'
				//process.cwd() + '/node_modules/typographic/stylus/typographic'
				//process.cwd() + '/node_modules/css-reset-and-normalize/stylus/flavored-reset-and-normalize'
			],
			define: {
				//url: url
			},
			use: [
				poststylus([
					//autoprefixer,
					'rucksack-css',
					'postcss-cssnext',
					//'postcss-utilities',
					'postcss-short',
					fontAwesome({replacement: true}),
					// assets(assets_options),
					lost(lostOpt),
					//pxToRem(pxremOpt)
					// postcssConicGradient
				]),
				animate(animateOpt)

			]
			// sourcemap: {
			// 	inline: true
			// }
		}))
		.pipe(gulpIf(isDevelopment, sourceMaps.write('')))
		.pipe(gulpIf(!isDevelopment, combine(cssnano(), rev())))
		.pipe(gulp.dest(paths.dest))
		.pipe(gulpIf(!isDevelopment, combine(rev.manifest('css.json'), gulp.dest('manifest'))))
		.pipe(gulpIf(isDevelopment, browserSync.stream()));
};

gulp.task('styles', stylesTask);
module.exports = stylesTask;

