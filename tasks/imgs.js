"use strict";

const path = require('path');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');
const config = require('../config/config.json');
const filter = require('gulp-filter');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let paths = {
	src: path.join(config.root.src, config.components.src, '**/*.', config.tasks.svg.sprite.ico),
	destSprite: path.join(config.root.temp, config.tasks.styles.dest),
	destStyle: path.join(config.root.dest, config.tasks.styles.dest)
};


let imagesTask = function () {
	console.log(`This platform is ${process.platform}`);
	return gulp.src(config.root.src + '/**/*.+(jpg|png|gif|svg)', {since: gulp.lastRun('images')})
		.on('data', function (file) {
			console.log({
				//contents: file.contents,
				path: file.path,
				cwd: file.cwd,
				base: file.base,
				relative: file.relative,
				dirname: file.dirname,
				basename: file.basename,
				stem: file.stem,
				extname: file.extname
			});
		})


		.pipe(filter(function (file) {
			return !/fonts/.test(file.dirname) && !/-sprite\.png/.test(file.basename) && !/-icon\.png/.test(file.basename) && !/-picto\.png/.test(file.basename);
		}))

		.pipe(gulpIf(!isDevelopment, imagemin()))
		.pipe(gulp.dest(function (file) {
			if (~file.dirname.indexOf('slider')) {
				if (process.platform == 'win32') {
					file.base = file.dirname.match(/(^\w{1}\:)([a-zA-Z-_./\\]+)(?=\\\w+)/g)[0];
				} else {
					file.base = file.dirname.match(/([a-zA-Z-_./]+)(?=\/\w+)/g)[0];
				}
				return config.root.dest + '/images/';
			} else {
				file.base = file.dirname;
				return config.root.dest + '/images/template/';
			}


		}));
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
