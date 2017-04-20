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


const eslintFormatter = (notifys) => errors => {
	if (errors[0].messages) {
		console.log(stylish(errors));
		if (notifys) {
			const error = errors[0].messages.find(msg => msg.severity === 2);
			if (error) {
				notifier.notifys({
					title: error.message,
					message: `${error.line}:${error.column} ${error.source.trim()}`,
					icon: path.join(__dirname, 'tasks/images/error-icon.png')
				});
			}
		}
	}
};


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
		stats: {
			errorDetails: true,
			colors: false,
			modules: true,
			reasons: true
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
		},

		eslint: {
			configFile: path.join(process.cwd(), '.eslintrc'),
			emitErrors: false,
			emitWarning: true,
			formatter: eslintFormatter({notify: notify}),
		},

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

		plugins: [
			new webpack.NoErrorsPlugin(),
			new webpack.ProvidePlugin({
				$: "jquery/dist/jquery.js",
				jQuery: "jquery/dist/jquery.js",
				"window.jQuery": "jquery/dist/jquery.js"
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('development')
				}
			}),

		],

	};
	if (isDevelopment) {
		options.plugins.push(
			new webpack.HotModuleReplacementPlugin()
		);
	}
	if (!isDevelopment) {
		options.plugins.push(
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
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


	webpack(options, function (err, stats) {
		if (!err) {
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
