'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
//require('module').Module._initPaths();
requireDir('./tasks/', {recurse: true});


gulp.task('build',
	gulp.series(
		gulp.series(
			'clean',
			'sprite:svg',
			'sprite:png',
			//'styles:png',
			//'styles:assets',
			'favicons',
			gulp.parallel(
				'styles',
				'styles:vendor',
				'resourses',
				'images'
			),
			'html',
			'scripts'
		)
	)
);

gulp.task('production',
	gulp.series(
		gulp.series(
			'clean',
			'sprite:svg',
			'sprite:png',
			'favicons',
			gulp.parallel(
				'styles',
				'styles:vendor',
				'images'
			),
			'scripts'
		),
		'resourses',
		'html'
	)
);

gulp.task('dev',
	gulp.series(
		'build',
		gulp.parallel(
			'serv',
			'watch'
		)
	)
);
