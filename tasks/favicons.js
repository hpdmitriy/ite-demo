"use strict";

const path = require('path');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');
const config = require('../config/config.json');
const favicons = require("gulp-favicons");
const filter = require('gulp-filter');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let paths = {
	src: path.join(config.root.src,config.tasks.favicons.src, config.tasks.favicons.dest, '/', config.tasks.favicons.extensions),
	dest: path.join(config.root.dest, config.tasks.favicons.dest),
	iconPath: path.join('/',config.tasks.favicons.dest, '/'),
};







let faviconsTask = function () {


	return gulp.src(paths.src)
		.pipe(gulpIf(!isDevelopment, imagemin()))
		.pipe(favicons({
			appName: "ITExpert",
			appDescription: null,
			developerName: null,
			developerURL: null,
			background: "#322F31",
			path: paths.iconPath,
			url: 'http://itegroup.ru/',
			display: "standalone",
			orientation: "portrait",
			start_url: "/?homescreen=1",
			version: 1.0,
			logging: false,
			online: false,
			html: "icons.html",
			preferOnline: false,
			pipeHTML: true,
			replace: true,
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: {offset: 25},
				favicons: true,
				firefox: true,
				windows: true,
				yandex: true
			}
		}))
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'favicons',
				message: err.message
			}))
		}))
		.pipe(gulp.dest(paths.dest));

};

gulp.task('favicons', faviconsTask);
module.exports = faviconsTask;
