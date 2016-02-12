'use strict';

const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'app.js'),
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.[hash].js'
	},
	module: {
		loaders: []
	},
	plugins: [
		new HtmlPlugin({
			template: path.join(__dirname, 'html', 'index.html'),
			inject: 'body'
		})
	]
};
