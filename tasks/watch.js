"use strict";

const config = require('../config/config.json');
const gulp   = require('gulp');
const path   = require('path');

let paths = {
	styles: path.join(config.root.src, config.tasks.styles.src),
	tempStyles: path.join(config.root.temp, config.tasks.styles.src),
	blocks: path.join(config.root.src, config.components.src),
	html: path.join(config.root.src, config.tasks.html.src)
};

let watchTask = function() {

	gulp.watch([
		paths.styles + '/index.styl',
		paths.tempStyles + '/**/*.styl',
		paths.blocks + '**/*.styl'
	], gulp.series('styles'));
	gulp.watch(paths.styles + '/vendor.styl', gulp.series('styles:vendor'));
	gulp.watch([
		paths.html + '/**/*.pug',
		paths.blocks + '**/*.pug'
	], gulp.series('html'));
};

gulp.task('watch', watchTask);
module.exports = watchTask;
