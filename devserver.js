'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.development');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
}).listen(8080, function (err, result) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at %s:%s', this.address().address, this.address().port);
});
