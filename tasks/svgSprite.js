"use strict";
const path = require('path');
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const gulpIf = require('gulp-if');
const filter = require('gulp-filter');
const plumber = require('gulp-plumber');
const config = require('../config/config.json');
const inlineSvg = require("gulp-inline-svg");
const del = require('del');
const through2 = require('through2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let paths = {
	src : path.join(config.root.src, config.components.src,'**/*'+config.tasks.svg.sprite.ico),
	srcTemp : path.join(config.root.temp, config.tasks.svg.sprite.tempDir,'**/*'+config.tasks.svg.sprite.ico),
	srcTpl : path.join(config.root.src, config.tasks.styles.src,config.tasks.styles.tpl,config.tasks.svg.sprite.tpl),
	srcInlTpl : path.join(config.root.src, config.tasks.styles.src,config.tasks.styles.tpl,config.tasks.svg.sprite.inlineTpl),
	destSprite: path.join(config.root.temp, config.tasks.styles.dest),
	destStyle: path.join(config.root.dest, config.tasks.styles.dest),
	destTemp: path.join(config.root.temp, config.tasks.svg.sprite.tempDir)
};
function cleanTemp () {
    return del([
        paths.destTemp,
    ]);
}


function preSvg () {
    return gulp.src(paths.src)

        .pipe(gulp.dest(function(file) {
            file.base  = file.dirname;
            return paths.destTemp;
        }));
}


function createSprite() {
    console.log(paths.srcTpl);
	return gulp.src(paths.srcTemp)
		.pipe(svgmin({
			plugins: [{
				removeDoctype: true
			}, {
				removeComments: true
			}, {
				removeStyleElement: true
			}]
		}))
		.pipe(svgSprite({
            "log": "info",
			shape: {
				spacing: {
					box: 'content'
				},
			},
			mode: {
				css: {
					dest: '.',
					bust: false,
					//bust: !isDevelopment,
					sprite: 'sprite-ico.svg',
					layout: 'vertical',
					prefix: '$',
					dimensions: true,
					render: {
						styl: {
							dest: 'sprite-ico.styl',
							template: paths.srcTpl
						}
					}
				},
				symbol: {
					//bust: !isDevelopment,
					bust: false,
					dest: '.', // where to put style && sprite, default: 'css'
					sprite: 'symbol-sprite.svg'
				}
			}
		}))
		.pipe(gulpIf('*.styl', gulp.dest(paths.destSprite),gulp.dest(paths.destStyle)));
}

function createInline   () {
    console.log(paths.srcTpl);
    return gulp.src(paths.srcTemp)
        .pipe(plumber())

        .pipe(inlineSvg({
            filename: 'inline-svg.styl',
            template: paths.srcInlTpl
        }))
        .pipe(through2(
            function(file, enc, callback) {
                console.log(file.contents.toString());
                let newData = file.contents.toString().replace(/fill%3D%22[^%]+%22/g,"fill%3D%22%23'+$fill+'%22");
                file.contents = new Buffer(newData);
                callback(null, file);
            }
        ))
        .on('error', function(error){ console.log(error); })
        .pipe(gulpIf('*.styl', gulp.dest(paths.destSprite),gulp.dest(paths.destStyle)));
}




//gulp.task('sprite:svg', createSprite);
gulp.task('sprite:svg', gulp.series(cleanTemp,preSvg,createSprite,createInline));

module.exports = 'sprite:svg';
