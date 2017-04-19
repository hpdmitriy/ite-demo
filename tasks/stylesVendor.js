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

const cssnano = require('gulp-cssnano');
const stylus = require('gulp-stylus');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const pxToRem = require('postcss-pxtorem');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


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


let paths = {
	src: path.join(config.root.src, config.tasks.styles.src),
	dest: path.join(config.root.dest, config.tasks.styles.dest)
};

let stylesVendorTask = function () {



	return gulp.src(paths.src + '/vendor.styl',{since: gulp.lastRun('styles:vendor')})


		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Styles Vendor',
				message: err
			}))
		}))
		.pipe(gulpIf(isDevelopment, sourceMaps.init({loadMaps: true})))
		.pipe(stylus({
			use: [
				poststylus([
					//autoprefixer,
					'rucksack-css',
					'postcss-cssnext',
					//'postcss-utilities',
					'postcss-short',
					pxToRem(pxremOpt)
				])
			]
		}))
		.pipe(gulpIf(isDevelopment, sourceMaps.write('')))
		.pipe(gulpIf(!isDevelopment, combine(cssnano(), rev())))
		.pipe(gulp.dest(paths.dest))
		.pipe(gulpIf(!isDevelopment, combine(rev.manifest('vendor-css.json'), gulp.dest('manifest'))))
		.pipe(gulpIf(isDevelopment, browserSync.stream()));
};

gulp.task('styles:vendor', stylesVendorTask);
module.exports = stylesVendorTask;

