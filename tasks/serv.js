"use strict";

//const path = require('path');
const config = require('../config/config.json');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();


const servTask = function () {
	browserSync.init(config.tasks.server);
	browserSync.watch(config.root.dest+'/**/*.*',null).on('change', browserSync.reload);
};

gulp.task('serv', servTask);
module.exports = servTask;
