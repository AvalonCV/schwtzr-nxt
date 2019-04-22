const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env, argv) {
	const configuration = {
		mode: 'development', // "production" | "development" | "none"
		entry: {
			app: ['./src/app/index.tsx', 'webpack-hot-middleware/client'],
			vendor: ['react', 'react-dom']
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'js/[name].bundle.js',
			publicPath: '/'
		},
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					loader: 'ts-loader'
				},
				{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
			new webpack.HotModuleReplacementPlugin()
		]
	};

	// server-specific configuration
	if (env.platform === 'server') {
		base.target = 'node';
	}

	// client-specific configurations
	if (env.platform === 'web') {
		base.entry = './src/app.tsx';
		base.output.filename = 'js/client.js';
	}

	return configuration;
};
