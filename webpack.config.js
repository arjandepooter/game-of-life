'use strict';

const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		path.join(__dirname, 'src', 'app.js')
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.[hash].js',
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: path.join(__dirname, 'src'),
			loader: 'babel',
			query: {
				cacheDirectory: true,
				presets: ['react', 'es2015']
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new HtmlPlugin({
			template: path.join(__dirname, 'html', 'index.html'),
			inject: 'body'
		})
	]
};
