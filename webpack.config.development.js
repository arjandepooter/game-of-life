'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');

module.exports = Object.assign({}, config, {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
	].concat(config.entry),
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'react-hot',
			include: path.join(__dirname, 'src')
		}].concat(config.module.loaders)
	},
	plugins: config.plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	])
});
