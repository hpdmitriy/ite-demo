"use strict";

const config = require('../config/config.json');
const gulp = require('gulp');
const del = require('del');

let cleanTask = function () {
	return del([
		config.root.dest,
		config.root.temp,
		config.root.rev
	]);
};


gulp.task('clean', cleanTask);
module.exports = cleanTask;
