"use strict";
const path = require('path');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const filter = require('gulp-filter');
const plumber = require('gulp-plumber');
const config = require('../config/config.json');
const combine = require('stream-combiner2').obj;
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const revReplace = require("gulp-rev-replace");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let paths = {
	src : path.join(config.root.src, config.components.src,'**/*'+config.tasks.png.sprite.ico),
	srcTemp : path.join(config.root.temp, config.tasks.png.sprite.tempDir,'**/*'+config.tasks.png.sprite.ico),
	srcTpl : path.join(config.root.src, config.tasks.styles.src,config.tasks.styles.tpl,config.tasks.png.sprite.tpl),
	destSprite: path.join(config.root.temp, config.tasks.styles.dest),
	destStyle: path.join(config.root.dest, config.tasks.styles.dest),
	destTemp: path.join(config.root.temp, config.tasks.png.sprite.tempDir)
};
function createPngSprite () {
	let spriteData = gulp.src(paths.src)
		.pipe(gulpIf(!isDevelopment, imagemin()))
		.pipe(spritesmith({
			imgName: 'sprite-picto.png',
			cssName: 'sprite-picto.styl',
			algorithm: 'binary-tree',
			padding: 4,
			cssTemplate: paths.srcTpl
		}));
	let imgStream = spriteData.img
		.pipe(buffer())
		//.pipe(gulpIf(!isDevelopment, rev()))
		.pipe(gulp.dest(paths.destStyle))
		//.pipe(gulpIf(!isDevelopment, combine(rev.manifest('sprites.json'), gulp.dest('manifest'))));

	//let manifest = gulp.src("./manifest/sprites.json");

	let cssStream = spriteData.css
		//.pipe(gulpIf(!isDevelopment, revReplace({manifest: manifest})))
		.pipe(gulp.dest(paths.destSprite));



	return combine(imgStream, cssStream);
	//return gulp.series(imgStream, manifest, cssStream);
}

let revisions = function(){
	//let man = gulp.src('./manifest/sprites.json', {allowEmpty: true});
	//return gulp.src(paths.destSprite + "/sprite-picto.styl")
	return gulp.src('./manifest/sprites.json')

		// .pipe(gulpIf(!isDevelopment, revReplace({
		// 	manifest: man
		// })))
		.on('data', function(file) {
			console.log({
				//contents: file.contents,
				path:     file.path,
				cwd:      file.cwd,
				base:     file.base,
				// path component helpers
				relative: file.relative,
				dirname:  file.dirname,  // .../source/1
				basename: file.basename, // 1.js
				stem:     file.stem,     // 1
				extname:  file.extname   // .js
			});
		})
		// .pipe(gulp.dest(paths.destSprite+'/man'))
		// .on('end', function (file) {
		// 	console.log(man)
		//
		// })
};

gulp.task('sprite:png', gulp.series(createPngSprite));

module.exports = 'sprite:png';

