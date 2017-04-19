"use strict";
const path = require('path');
const config = require('../config/config.json');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

let paths = {
	src: path.join(config.root.src, config.tasks.resourses.src, '**/*.*'),
	srcCommonJs: path.join(config.root.src, config.tasks.js.src, config.tasks.js.common),
	srcCommonCss: path.join(config.root.src, config.tasks.styles.src, config.tasks.styles.common),
	dest: path.join(config.root.dest, ''),
	destCommonJs: path.join(config.root.dest, config.tasks.js.dest),
	destCommonCss: path.join(config.root.dest, config.tasks.styles.dest),

};

let condition = function (file) {
	if (!isDevelopment && ~file.extname.indexOf(['.jpg', '.png', '.jpeg', '.gif'])) {
		return true;
	}
};


let resoursesTask = function () {
	//console.log(paths.src);
	return gulp.src(paths.src)
		.pipe(gulpIf(condition, imagemin()))
		// .pipe(gulp.dest(function(file) {
		// 	return file.extname == '.js' ? 'js' :
		// 		file.extname == '.css' ? 'css' : 'dest';
		// }));
		.pipe(gulp.dest(paths.dest));
};

let commonJsTask = function () {
	return gulp.src(paths.srcCommonJs)
		.pipe(gulp.dest(paths.destCommonJs));
};
let commonCssTask = function () {
	return gulp.src(paths.srcCommonCss)
		.pipe(gulp.dest(paths.destCommonCss));
};

let manifestsTask = function () {
	return gulp.src('manifest')
		.pipe(gulp.dest('public'));
};


if (!isDevelopment) {
	gulp.task('resourses', gulp.parallel(resoursesTask, manifestsTask, commonJsTask, commonCssTask));
} else {
	gulp.task('resourses', gulp.parallel(resoursesTask, commonJsTask, commonCssTask));
}
module.exports = resoursesTask;
