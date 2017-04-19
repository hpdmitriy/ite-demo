"use strict";
const path = require('path');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const gulpIf = require('gulp-if');
const filter = require('gulp-filter');
const plumber = require('gulp-plumber');
const config = require('../config/config.json');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let paths = {
	src : path.join(config.root.src, config.components.src,'**/*'+config.tasks.svg.sprite.ico),
	srcTemp : path.join(config.root.temp, config.tasks.svg.sprite.tempDir,'**/*'+config.tasks.svg.sprite.ico),
	srcTpl : path.join(config.root.src, config.tasks.styles.src,config.tasks.styles.tpl,config.tasks.svg.sprite.tpl),
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
};


function createSprite   () {
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
					bust: !isDevelopment,
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
					dest: '.', // where to put style && sprite, default: 'css'
					sprite: 'symbol-sprite.svg'
				}
			}
		}))
		.pipe(gulpIf('*.styl', gulp.dest(paths.destSprite),gulp.dest(paths.destStyle)));
};


//gulp.task('sprite:svg', createSprite);
gulp.task('sprite:svg', gulp.series(cleanTemp,preSvg,createSprite));

module.exports = 'sprite:svg';
