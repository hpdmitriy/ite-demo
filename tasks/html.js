'use strict';

const path = require('path');
const gulp = require('gulp');
const config = require('../config/config.json');
const browserSync = require('browser-sync');
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const pugInherit = require('gulp-pug-inheritance');
const filter = require('gulp-filter');
const data = require('gulp-data');


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


let paths = {
	src: path.join(config.root.src, config.tasks.html.src),
	dest: path.join(config.root.dest, config.tasks.html.dest)
};

let htmlTask = function () {
	return gulp.src([
		paths.src + '/index.pug',
		paths.src + '/mi.pug',
		paths.src + '/development.pug',
		paths.src + '/support.pug',
		paths.src + '/seo.pug',
		paths.src + '/portfolio.pug',
		paths.src + '/contacts.pug',
		paths.src + '/clients.pug',
		paths.src + '/neural_mesh.pug'
	], {/*since: gulp.lastRun('assets')*/})

		.pipe(filter(function (file) {
			return !/\/_/.test(file.path) && !/^_/.test(file.relative) && !/template/.test(file.path);
		}))

		.pipe(pugInherit({basedir: paths.src}))
		.pipe(data(function (file) {
			if (file.isNull()) {
				return cb(null, file);
			}
			return require('../package.json');
		}))
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Html',
				message: err.message
			}))
		}))
		.pipe(pug({
				pretty: true
			}
		))
		.pipe(gulpIf(!isDevelopment, revReplace({
			manifest: gulp.src('manifest/css.json', {allowEmpty: true})
		})))
		.pipe(gulpIf(!isDevelopment, revReplace({
			manifest: gulp.src('manifest/assets.json', {allowEmpty: true})
		})))
		.pipe(gulpIf(!isDevelopment, revReplace({
			manifest: gulp.src('manifest/vendor-css.json', {allowEmpty: true})
		})))
		.pipe(gulpIf(!isDevelopment, revReplace({
			manifest: gulp.src('manifest/webpack.json', {allowEmpty: true})
		})))
		.pipe(gulp.dest(paths.dest))
		.pipe(gulpIf(isDevelopment, browserSync.stream()));
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
