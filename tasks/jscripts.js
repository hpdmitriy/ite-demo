"use strict";

const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const config = require('../config/config.json');
const gulp = require('gulp');
const path = require('path');
const notify = require('gulp-notify');
const gulplog = require('gulplog');
const stylish = require('eslint/lib/formatters/stylish');
const notifier = require('node-notifier');
const pathToUrl = require('../lib/pathToUrl');
const poststylus = require('poststylus')



const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
let paths = {
	src: path.join(config.root.src, config.tasks.js.src),
	dest: path.join(config.root.dest, config.tasks.js.dest),
	blocks: path.join(config.root.src, config.components.src),
};

let startWebpack = function (callback) {
	let options = {
		entry: {
			index: config.root.src + config.tasks.js.src,
			progress: config.root.src + config.tasks.js.src + 'progress',
			//neuralMesh: config.root.src + config.tasks.js.src + 'neuralMesh'
		},
		output: {
			path: paths.dest,
			publicPath: config.tasks.js.dest,
			filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js',
			library: "[name]"
		},
		watch: isDevelopment,
		devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
		resolve: {
			modulesDirectories: [
				'node_modules', 'bower_components', 'app', 'vendor', 'libs'
			],
			extensions: ['.js', '']
		}, /**/
		module: {
			loaders: [{
				test: /\.js$/,
				include: [
					`${pathToUrl(process.cwd(), '/', path.join(config.root.src,
						config.tasks.js.src))}`,
					`${pathToUrl(process.cwd(), '/', path.join(config.root.src,
						config.components.src))}`,
				],
				loader: 'babel?presets[]=es2015'
			},
				 {
					test: /\.css$/,
					loader: 'style!css-loader?importLoaders=1!csso-loader!autoprefixer?browsers=last 2 versions'
				}, {
					test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
					loader: 'file?name=vendor/[name].[ext]'
				},
				{
					test: /\.styl$/,
					loader: 'style!css!?importLoaders=1!csso-loader!autoprefixer?browsers=last 2 versions!stylus?resolve url',
					exclude: /node_modules/
				}
			],
		},
	/*	if (isDevelopment) {
	 options.plugins.push(
	 new webpack.HotModuleReplacementPlugin()
	 );
	 }*/
	if (!isDevelopment) {
		options.plugins.push(
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					// don't show unreachable variables etc
					warnings: false,
					unsafe: true
				},
				output: {
					comments: false
				}
			}),
			new AssetsPlugin({
				filename: 'webpack.json',
				path: `${process.cwd()}/manifest`,
				processOutput(assets) {
					for (let key in assets) {
						assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
						delete assets[key];
					}
					return JSON.stringify(assets);
				}
			})
		);

	}


	// https://webpack.github.io/docs/node.js-api.html
	webpack(options, function (err, stats) {
		if (!err) { // no hard error
			// try to get a soft error from stats
			err = stats.toJson().errors[0];
		}

		if (err) {
			notify.onError(err => ({
				title: 'Webpack',
				message: err.message
			}));

			gulplog.error(err);
		} else {
			gulplog.info(stats.toString({
				colors: true
			}));
		}

		// task never errs in watch mode, it waits and recompiles
		if (!options.watch && err) {
			callback(err);
		} else {
			callback();
		}

	});


};
function postcss() {
	return [
		require('precss'),
		require('autoprefixer')
	];
};

function wrapRegexp(regexp, label) {
	regexp.test = function (path) {
		console.log(label, path);
		return RegExp.prototype.test.call(this, path);
	};
	return regexp;
}

gulp.task('scripts', startWebpack);
module.exports = startWebpack;
